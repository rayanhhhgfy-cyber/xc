# Sign Language Translator Black Screen Fix TODO

## Status: 🚀 In Progress

### 1. ✅ Create TODO.md 
### 2. ⏳ Fix SignLanguageTranslator.tsx 
   - Remove duplicate gestureBufferRef logic in processVideo
   - Make video element always visible when stream attached (remove opacity conditional)
   - Add playsInline muted loop to video
   - Canvas z-5 instead of z-10, always show when active
   - startCamera fallback to {video: true}
   - Model loading timeout 15s -> 'DEMO_READY' state
### 3. ⏳ Minor debug console.log in aslEngine.ts classifyHandshape
### 4. ⏳ Test: npm run dev, https://localhost:5173/tools/sign-language
### 5. ⏳ Verify detection with hand gestures
### 6. ✅ Update TODO on completions
### 7. ✅ Final attempt_completion

**Next:** Edit SignLanguageTranslator.tsx
