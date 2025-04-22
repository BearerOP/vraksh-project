import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function LinkBorderSizeSlider({ activePage, updatePage, pageId }) {
  const max = 8
  const skipInterval = 1
  const ticks = [...Array(max + 1)].map((_, i) => i)
  const value = parseInt(activePage?.linkBorderSize) || 0

  return (
    <div className="*:not-first:mt-4">
      <Label>Link Border Size</Label>
      <div>
        <Slider
          value={[value]}
          max={max}
          step={1}
          onValueChange={([val]) => updatePage(pageId, { linkBorderSize: val })}
          aria-label="Link Border Size"
          className="mt-2"
        />
        <span
          className="text-muted-foreground mt-1 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
          aria-hidden="true"
        >
          {ticks.map((_, i) => (
            <span
              key={i}
              className="flex w-0 flex-col items-center justify-center gap-2"
            >
              <span
                className={cn(
                  "bg-muted-foreground/70 h-1 w-px",
                  i % skipInterval !== 0 && "h-0.5"
                )}
              />
              <span className={cn(i % skipInterval !== 0 && "opacity-0")}>
                {i}
              </span>
            </span>
          ))}
        </span>
        <div className="mt-2 text-right text-sm font-medium">{value}px</div>
      </div>
    </div>
  )
}
