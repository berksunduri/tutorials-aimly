import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface VideoCardProps {
  tutorial: {
    title: string
    url: string
  }
}

export default function VideoCard({ tutorial }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-foreground">{tutorial.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {isOpen ? 'Hide Video' : 'Show Video'}
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={tutorial.url}
                title={tutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}