import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Hand, Play, StopCircle, VideoOff, Loader2, Trash2, Volume2, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { decodeASL, ASL_LEXICON } from '@/lib/aslEngine';

const SignLanguageTranslator = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePhraseHint, setActivePhraseHint] = useState<string | null>(null);
  
  const [recognizer, setRecognizer] = useState<any>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const taskVisionRef = useRef<any>(null);
  const handConnectionsRef = useRef<any>(null);
  const [recognizedGesture, setRecognizedGesture] = useState<string>("");
  const [gestureCategory, setGestureCategory] = useState<string>("Scanning...");
  const [sentence, setSentence] = useState<string>(""); 

  const reqframeRef = useRef<number>(0);
  const lastVideoTimeRef = useRef<number>(-1);
  const lastLetterRef = useRef<string>("");
  const letterCountRef = useRef<number>(0);
  const lastStableSignRef = useRef<string>("");
  const lastCommittedSignRef = useRef<string>("");
  const blankFrameRef = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;
    const initializeRecognizer = async () => {
      setIsModelLoading(true);
      if (recognizer) { recognizer.close?.(); }

      try {
        const visionTasks = await import('@mediapipe/tasks-vision');
        const { GestureRecognizer, FilesetResolver, DrawingUtils } = visionTasks;
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );

        let gestureRecognizer: any;
        try {
          gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
          });
        } catch (gpuError) {
          console.warn("GPU delegate failed, falling back to CPU.", gpuError);
          gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
          });
        }

        if (isMounted) {
          taskVisionRef.current = { DrawingUtils };
          handConnectionsRef.current = GestureRecognizer.HAND_CONNECTIONS;
          setRecognizer(gestureRecognizer);
          setIsModelLoading(false);
        }
      } catch (err) {
        console.error("AI Model failed to load:", err);
        if (isMounted) {
          setError("Failed to initialize translation AI.");
          setIsModelLoading(false);
        }
      }
    };
    initializeRecognizer();
    return () => { isMounted = false; };
  }, []);

  const speakText = () => {
      if (!sentence || sentence.length === 0) return;
      if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(sentence.toLowerCase());
          utterance.rate = 0.85;
          utterance.pitch = 1;
          window.speechSynthesis.speak(utterance);
          toast({ title: "Audio Feedback", description: "Seamless reading started." });
      } else {
          toast({ title: "Audio Error", description: "Browser not supported.", variant: "destructive" });
      }
  };

  const gestureBufferRef = useRef<string[]>([]); // Buffer for temporal smoothing
  
  const processVideo = useCallback(() => {
    if (!recognizer || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        
        // --- PERFORMANCE OPTIMIZATION: Stable 25 FPS (40ms interval) for precision ---
        const DIFF = video.currentTime - lastVideoTimeRef.current;
        if (DIFF > 0 && DIFF < 0.04) { 
          reqframeRef.current = requestAnimationFrame(processVideo);
          return;
        }
        lastVideoTimeRef.current = video.currentTime;
        
        try {
            const results = recognizer.recognizeForVideo(video, performance.now());
            const ctx = canvas.getContext("2d"); 
            
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              if (results.landmarks && results.landmarks.length > 0) {
                const DrawingUtilsConstructor = taskVisionRef.current?.DrawingUtils;
                const handConnections = handConnectionsRef.current;
                if (DrawingUtilsConstructor && handConnections) {
                  const drawingUtils = new DrawingUtilsConstructor(ctx);
                  for (const landmarks of results.landmarks) {
                    drawingUtils.drawConnectors(landmarks, handConnections, {
                      color: "#10b981", lineWidth: 3.0 
                    });
                    drawingUtils.drawLandmarks(landmarks, { color: "#ffffff", lineWidth: 1, radius: 1.5 });
                  }
                }

                const signData = decodeASL(results.landmarks);
                
                // --- ACCURACY: Temporal Smoothing Buffer ---
                const rawSign = (signData || "").trim();
                if (rawSign) {
                  blankFrameRef.current = 0;
                  gestureBufferRef.current.push(rawSign);
                  if (gestureBufferRef.current.length > 12) gestureBufferRef.current.shift();
                } else {
                  blankFrameRef.current += 1;
                  if (blankFrameRef.current > 3) {
                    lastStableSignRef.current = "";
                    lastCommittedSignRef.current = "";
                  }
                }

                const counts: Record<string, number> = {};
                gestureBufferRef.current.forEach(s => {
                  if (!s) return;
                  counts[s] = (counts[s] || 0) + 1;
                });
                const sortedSigns = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                const topSign = sortedSigns[0]?.[0] ?? "";
                const topCount = sortedSigns[0]?.[1] ?? 0;
                const minVotes = Math.max(3, Math.ceil(gestureBufferRef.current.length * 0.55));
                const smoothedSign = topCount >= minVotes ? topSign : "";

                if (smoothedSign !== "") {
                    if (smoothedSign.startsWith("ADVANCED_SIGN_")) {
                      setRecognizedGesture("Analyzing...");
                      setGestureCategory("Scanning...");
                      lastLetterRef.current = "";
                      letterCountRef.current = 0;
                    } else {
                      setRecognizedGesture(smoothedSign);
                      const lexicalEntry = ASL_LEXICON.find(e => e.word === smoothedSign);
                      if (lexicalEntry) setGestureCategory(lexicalEntry.cat);

                      if (smoothedSign === lastStableSignRef.current) {
                          letterCountRef.current = Math.min(12, letterCountRef.current + 1);
                      } else {
                          lastStableSignRef.current = smoothedSign;
                          letterCountRef.current = 1;
                      }

                      if (letterCountRef.current >= 6 && smoothedSign !== lastCommittedSignRef.current) {
                          setSentence(prev => {
                              const needsSpace = prev.length > 0 && !prev.endsWith(" ");
                              return prev + (needsSpace ? " " : "") + smoothedSign;
                          });
                          lastCommittedSignRef.current = smoothedSign;
                      }
                    }
                } else {
                    setRecognizedGesture("Analyzing..."); 
                    setGestureCategory("Scanning...");
                    lastLetterRef.current = "";
                    letterCountRef.current = 0;
                }
              } else {
                setRecognizedGesture(""); 
                gestureBufferRef.current = []; // Clear buffer if no hands
                lastLetterRef.current = "";
                letterCountRef.current = 0;
              }
            }
        } catch (e) {
            console.error("recognizeVideo err:", e);
        }
    }
    
    reqframeRef.current = requestAnimationFrame(processVideo);
  }, [recognizer]);

  useEffect(() => {
    if (isCameraActive && recognizer) {
      reqframeRef.current = requestAnimationFrame(processVideo);
    } else {
      cancelAnimationFrame(reqframeRef.current);
    }
    return () => cancelAnimationFrame(reqframeRef.current);
  }, [isCameraActive, recognizer, processVideo]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 } } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError("Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setRecognizedGesture("");
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 mt-16 w-full max-w-5xl mx-auto gap-8">
      
      {/* Seamless Translation Buffer */}
      <Card className="w-full relative glass-strong border-emerald-500/40 shadow-xl overflow-hidden min-h-[140px]">
         <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-950/20">
            <div className="flex flex-col flex-1">
               <span className="text-emerald-400 font-mono text-xs mb-1 uppercase tracking-widest flex items-center gap-2">
                 <Volume2 className="w-3 h-3" /> Seamless Sentence Builder
               </span>
               <p className="text-2xl md:text-5xl font-extrabold text-emerald-500 tracking-tight leading-tight uppercase">
                  {sentence.length > 0 ? sentence : <span className="opacity-20 italic">Translate ASL in real-time...</span>}
               </p>
            </div>
            {sentence.length > 0 && (
               <div className="flex gap-2 shrink-0">
                   <Button onClick={speakText} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 px-6 rounded-xl shadow-lg shadow-emerald-600/20">
                      <Volume2 className="w-5 h-5 mr-2" /> Play
                   </Button>
                   <Button onClick={() => setSentence("")} size="lg" variant="outline" className="h-14 w-14 rounded-xl text-red-400 border-red-900/40 bg-red-900/10 hover:bg-red-900/30">
                      <Trash2 className="w-5 h-5" />
                   </Button>
               </div>
            )}
         </CardContent>
      </Card>

      <Card className="w-full relative z-10 glass-strong border-emerald-500/20 shadow-2xl">
        <CardHeader className="text-center">
           <CardTitle className="flex justify-center items-center gap-2 text-3xl">
              <Hand className="w-8 h-8 text-emerald-400" />
              ASL Master <Badge variant="secondary" className="ml-2 bg-emerald-500/20 text-emerald-200 border-0">1,000+ Word Lexicon</Badge>
            </CardTitle>
            <CardDescription className="text-slate-400 max-w-lg mx-auto">
              Our advanced neural engine now matches over one thousand common ASL signs instantly using high-speed skeletal vectors.
            </CardDescription>
            <p className="text-xs text-amber-200/90 uppercase tracking-[0.25em] mt-3">
              Beta version — under active development and may contain some errors.
            </p>
        </CardHeader>
        
        <CardContent className="flex flex-col gap-6">
          <div className="relative w-full aspect-video bg-black/90 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/10 transition-all duration-300">
            {error ? (
              <div className="flex flex-col items-center text-red-500 z-10 p-4 text-center">
                <VideoOff className="w-12 h-12 mb-3 opacity-80" />
                <p className="font-medium">{error}</p>
              </div>
            ) : !isCameraActive ? (
              <div className="flex flex-col items-center text-slate-500 z-10">
                {isModelLoading ? (
                   <>
                     <Loader2 className="w-16 h-16 mb-4 animate-spin text-emerald-500" />
                     <p className="text-sm font-bold tracking-widest uppercase">Initializing 1K+ Vocabulary...</p>
                   </>
                ) : (
                   <>
                     <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                        <Camera className="w-12 h-12 text-emerald-500/40" />
                     </div>
                     <p className="text-sm font-black tracking-[0.2em] uppercase text-emerald-500/60">System Ready</p>
                   </>
                )}
              </div>
            ) : null}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-5"
              style={{ transform: "scaleX(-1)" }}
            />
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isCameraActive ? "opacity-100" : "opacity-0"} pointer-events-none z-10`}
              style={{ transform: "scaleX(-1)" }} 
            />
            
            {isCameraActive && (
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3 z-20">
                  <div className="flex items-center gap-3">
                     <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg transition-all duration-300 ${recognizedGesture === "SCANNING..." ? "bg-slate-700 text-slate-300 animate-pulse" : "bg-emerald-500 text-black shadow-emerald-500/40"}`}>
                        {gestureCategory}
                     </span>
                     <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${Math.min(100, (letterCountRef.current / 12) * 100)}%` }} />
                     </div>
                  </div>
                  <p className="font-extrabold text-6xl tracking-tighter text-white drop-shadow-2xl uppercase">
                     {recognizedGesture || "SCANNING..."}
                  </p>
               </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            {!isCameraActive ? (
              <Button onClick={startCamera} disabled={isModelLoading} className="bg-emerald-600 hover:bg-emerald-500 text-white gap-4 font-black px-12 py-10 text-2xl rounded-3xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all w-full">
                <Play className="w-8 h-8 fill-current" /> START ENGINE
              </Button>
            ) : (
              <Button onClick={stopCamera} variant="destructive" className="gap-4 font-black px-12 py-10 text-2xl rounded-3xl shadow-2xl shadow-red-500/20 w-full">
                <StopCircle className="w-8 h-8 fill-current" /> STOP ENGINE
              </Button>
            )}
            <p className="text-[10px] text-slate-500 flex items-center gap-2 uppercase tracking-widest font-bold">
               <Info className="w-3 h-3" /> System Calibrated for Multi-Hand Input
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-emerald-500/10">
             <div className="flex flex-col items-center mb-6">
                <h4 className="text-xs font-black text-emerald-500/60 uppercase tracking-[0.2em] mb-2">Interactive Phrase Guide</h4>
                {activePhraseHint ? (
                   <p className="text-emerald-400 font-medium text-xs animate-in fade-in slide-in-from-bottom-2">
                     <span className="opacity-50">Hint:</span> {activePhraseHint}
                   </p>
                ) : (
                   <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight">Select a phrase to see how to sign it</p>
                )}
             </div>
             <div className="flex flex-wrap justify-center gap-2">
                {[
                  { p: "HELLO", h: "A polite salute from your forehead outwards." },
                  { p: "IM OK", h: "Hand in 'F' shape (thumb & index touch) tapped on chest." },
                  { p: "HOW ARE YOU", h: "Both hands forming 'C' shape, rolling forward." },
                  { p: "WHAT ARE YOU DOING", h: "Two 'G' hands (pointing down) fluttering." },
                  { p: "THANK YOU", h: "Flat hand from your chin towards the other person." },
                  { p: "PLEASE", h: "Rub your chest with an open palm in a circular motion." },
                  { p: "SORRY", h: "Rub your chest with a closed fist ('A' hand) in a circle." },
                  { p: "GOODBYE", h: "A simple, standard wave with an open palm." }
                ].map(({ p, h }) => (
                   <Badge 
                    key={p} 
                    onClick={() => setActivePhraseHint(h)}
                    variant={activePhraseHint === h ? "default" : "outline"}
                    className={`px-3 py-1.5 cursor-pointer transition-all ${activePhraseHint === h ? "bg-emerald-500 text-black border-emerald-500 scale-110" : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10"}`}
                   >
                      {p}
                   </Badge>
                ))}
             </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] blur-[180px] rounded-full pointer-events-none -z-10 bg-emerald-500/5" />
    </div>
  );
};

export default SignLanguageTranslator;
