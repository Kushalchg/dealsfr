//#TODO: Integrate API for layout preview with name and array of number
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Monitor, Smartphone } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import StorePreviewModal from "@/app/_components/previewModel/store_preview_modal"

// Predefined grid patterns
const gridPatterns = [
  { id: "1-1-1", name: "Single (1-1-1)", pattern: [1, 1, 1] },
  { id: "1-2-3", name: "Classic (1-2-3)", pattern: [1, 2, 3] },
  { id: "2-2-2", name: "Double (2-2-2)", pattern: [2, 2, 2] },
  { id: "3-3-3", name: "Triple (3-3-3)", pattern: [3, 3, 3] },
  { id: "1-3-2", name: "Mixed A (1-3-2)", pattern: [1, 3, 2] },
  { id: "2-1-3", name: "Mixed B (2-1-3)", pattern: [2, 1, 3] },
  { id: "3-2-1", name: "Reverse (3-2-1)", pattern: [3, 2, 1] },
  { id: "2-3-2", name: "Symmetric A (2-3-2)", pattern: [2, 3, 2] },
  { id: "3-1-3", name: "Symmetric B (3-1-3)", pattern: [3, 1, 3] },
  { id: "custom", name: "Custom Pattern", pattern: [1, 1, 1] },
]

export default function StoreLayoutPreview() {
  const [selectedPatternId, setSelectedPatternId] = useState<string>("1-2-3")
  const [customPattern, setCustomPattern] = useState<number[]>([1, 1, 1])
  const [position1, setPosition1] = useState<string>("1")
  const [position2, setPosition2] = useState<string>("1")
  const [position3, setPosition3] = useState<string>("1")
  const [selectedView, setSelectedView] = useState<"web" | "mobile">("web")
  const [showPreview, setShowPreview] = useState<boolean>(false)

  // Get the current pattern
  const currentPattern =
    selectedPatternId === "custom"
      ? { id: "custom", name: "Custom Pattern", pattern: customPattern }
      : gridPatterns.find((p) => p.id === selectedPatternId) || gridPatterns[0]

  // Update custom pattern when position values change
  useEffect(() => {
    if (selectedPatternId === "custom") {
      setCustomPattern([Number.parseInt(position1), Number.parseInt(position2), Number.parseInt(position3)])
    }
  }, [position1, position2, position3, selectedPatternId])

  const handlePreviewSubmit = () => {
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Modal */}
      <StorePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        selectedView={selectedView}
        pattern={currentPattern.pattern}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Store Layout Preview</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Configure how your products will be displayed to customers</p>
          </div>
        </header>

        <div className="space-y-8">
          {/* Grid Pattern Configuration */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Product Display Layout</h2>
            <div className="space-y-4 sm:space-y-6">
              {/* Pattern Selector */}
              <div>
                <Label htmlFor="pattern-select" className="text-sm font-medium mb-2 sm:mb-3 block">
                  Select Layout Pattern:
                </Label>
                <Select value={selectedPatternId} onValueChange={setSelectedPatternId}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gridPatterns.map((pattern) => (
                      <SelectItem key={pattern.id} value={pattern.id}>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs sm:text-sm lg:text-base">{pattern.name}</span>
                          {pattern.id !== "custom" && (
                            <code className="ml-2 bg-muted px-1.5 py-0.5 text-xs rounded">
                              [{pattern.pattern.join(",")}]
                            </code>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Pattern Builder */}
              {selectedPatternId === "custom" && (
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <h3 className="text-sm font-medium mb-4">Build Custom Pattern:</h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <div className="text-center">
                      <Label className="block text-sm mb-3 text-muted-foreground">Position 1</Label>
                      <RadioGroup value={position1} onValueChange={setPosition1} className="flex gap-2">
                        {[1, 2, 3].map((num) => (
                          <div key={num} className="flex flex-col items-center">
                            <RadioGroupItem value={num.toString()} id={`pos1-${num}`} className="mb-2" />
                            <Label htmlFor={`pos1-${num}`} className="text-sm">
                              {num}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="text-center">
                      <Label className="block text-sm mb-3 text-muted-foreground">Position 2</Label>
                      <RadioGroup value={position2} onValueChange={setPosition2} className="flex gap-2">
                        {[1, 2, 3].map((num) => (
                          <div key={num} className="flex flex-col items-center">
                            <RadioGroupItem value={num.toString()} id={`pos2-${num}`} className="mb-2" />
                            <Label htmlFor={`pos2-${num}`} className="text-sm">
                              {num}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="text-center">
                      <Label className="block text-sm mb-3 text-muted-foreground">Position 3</Label>
                      <RadioGroup value={position3} onValueChange={setPosition3} className="flex gap-2">
                        {[1, 2, 3].map((num) => (
                          <div key={num} className="flex flex-col items-center">
                            <RadioGroupItem value={num.toString()} id={`pos3-${num}`} className="mb-2" />
                            <Label htmlFor={`pos3-${num}`} className="text-sm">
                              {num}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Pattern Display */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-muted rounded-lg gap-4 sm:gap-0">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Current Pattern:</Label>
                  <code className="ml-2 text-sm font-mono bg-background px-2 py-1 rounded">
                    [{currentPattern.pattern.join(", ")}]
                  </code>
                </div>
                <div className="flex gap-1">
                  {currentPattern.pattern.map((count, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0.5">
                      {Array.from({ length: count }).map((_, colIndex) => (
                        <div key={colIndex} className="w-4 h-4 bg-primary/30 border border-primary/50 rounded-sm" />
                      ))}
                      {rowIndex < currentPattern.pattern.length - 1 && (
                        <div className="w-px h-4 bg-border mx-2 self-center" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* View Selection */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Preview Options</h2>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Select View Type:</Label>
              <RadioGroup
                value={selectedView}
                onValueChange={(value: string) => setSelectedView(value as "web" | "mobile")}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="web" id="web" />
                  <Label htmlFor="web" className="flex items-center gap-2 cursor-pointer">
                    <Monitor className="h-4 w-4" />
                    <span className="text-xs sm:text-sm lg:text-base">Web Version</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-xs sm:text-sm lg:text-base">Mobile Version</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mt-6 pt-6 border-t">
              <Button onClick={handlePreviewSubmit} className="w-full" size="lg">
                Preview Customer Store Layout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
