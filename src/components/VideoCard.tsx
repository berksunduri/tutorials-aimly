import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Play, ChevronDown, ChevronUp } from "lucide-react";
import { FaEye } from "react-icons/fa";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IoEarth } from "react-icons/io5";

type Tutorial = {
  title: string;
  topic: string;
  sourceType: string;
  url: string;
};

export default function VideoCard({ tutorial }: { tutorial: Tutorial }) {
  const [isOpen, setIsOpen] = useState(false);
  const isVisualExplanation = tutorial.title
    .toLowerCase()
    .includes("visual explanation");
  const isRealLifeApplication = tutorial.title
    .toLowerCase()
    .includes("real-life applications");
  const isVideo = tutorial.sourceType === "youtube";

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-auto relative overflow-hidden">
      {(isVisualExplanation || isRealLifeApplication) &&
        !tutorial.sourceType.includes("other") && (
          <div className="absolute top-2 right-2 text-yellow-400">
            {isVisualExplanation ? (
              <FaEye size={24} color="#7cae32"/>
            ) : (
              <IoEarth size={24} color="#7cae32"/>
            )}
          </div>
        )}
      <CardHeader>
        <CardTitle className="text-lg pr-8">{tutorial.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {isVideo ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="default"
                className="w-full bg-primary hover:bg-primary/80"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {isVisualExplanation ? (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        View Visual Explanation
                      </>
                    ) : isRealLifeApplication ? (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Explore Real-Life Applications
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video
                      </>
                    )}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <iframe
                width="100%"
                height="200"
                src={tutorial.url}
                title={tutorial.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Button
            variant="outline"
            className="w-full bg-navy border-navy text-white hover:bg-navy/80"
            asChild
          >
            <a
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Article
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
