interface ResultDisplayProps {
  items: { label: string; value: string; unit: string }[];
}

export default function ResultDisplay({ items }: ResultDisplayProps) {
  return (
    <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5">
      {items.map((item) => (
        <div key={item.label} className="flex justify-between items-center text-xs xs:text-xs sm:text-sm gap-2">
          <span className="text-muted-foreground truncate">{item.label}</span>
          <span className="font-mono text-foreground whitespace-nowrap">
            {item.value} <span className="text-muted-foreground text-xs">{item.unit}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
