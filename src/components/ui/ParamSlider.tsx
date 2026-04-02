interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
}

export default function ParamSlider({ label, value, min, max, step = 0.1, unit, onChange }: ParamSliderProps) {
  return (
    <div className="space-y-0.5 xs:space-y-1">
      <div className="flex items-center justify-between text-xs xs:text-xs sm:text-sm">
        <span className="text-muted-foreground truncate">{label}</span>
        <span className="font-mono text-foreground pl-1 flex-shrink-0">
          {value.toFixed(step < 1 ? 1 : 0)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 xs:h-2 rounded-full appearance-none bg-muted cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 xs:[&::-webkit-slider-thumb]:w-4 xs:[&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:glow-primary"
      />
    </div>
  );
}
