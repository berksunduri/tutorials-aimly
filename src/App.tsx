import { useState, useEffect } from "react";
import firstWeek from "./data/firstWeek.json";
import secondWeek from "./data/secondWeek.json";
import thirdWeek from "./data/thirdWeek.json";
import fourthWeek from "./data/fourthWeek.json";
import fifthWeek from "./data/fifthWeek.json";
import VideoCard from "./components/VideoCard";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Search, Moon, Sun, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import logo from "./assets/logo.png";
import { useTheme } from "./components/theme-provider";

type Tutorial = {
  title: string;
  topic: string;
  sourceType: string;
  url: string;
};

type Unit = {
  title: string;
  data: Tutorial[];
};

const units: Unit[] = [
  { title: "Unit 1", data: firstWeek as Tutorial[] },
  { title: "Unit 2", data: secondWeek as Tutorial[] },
  { title: "Unit 3", data: thirdWeek as Tutorial[] },
  { title: "Unit 4", data: fourthWeek as Tutorial[] },
  { title: "Unit 5", data: fifthWeek as Tutorial[] },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTutorials: Tutorial[] = selectedUnit !== null ? units[selectedUnit]?.data ?? [] : [];

  const filteredTutorials = currentTutorials.filter((tutorial: Tutorial) =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTutorials = filteredTutorials.reduce<{ [key: string]: Tutorial[] }>(
    (acc, tutorial: Tutorial) => {
      if (!acc[tutorial.topic]) {
        acc[tutorial.topic] = [];
      }
      acc[tutorial.topic].push(tutorial);
      return acc;
    },
    {}
  );

  const toggleTopic = (topic: string) => {
    setOpenTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              ))}
          </Button>
        </div>
        <div className="flex flex-col items-center mb-12">
          <img
            src={logo}
            alt="Aimly Logo"
            className="w-48 h-32 object-contain mb-6"
          />
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Aimly Video Tutorials
          </h1>
          {selectedUnit !== null && (
            <Button
              variant="outline"
              className="mb-4"
              onClick={() => setSelectedUnit(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Units
            </Button>
          )}
          {selectedUnit !== null && (
            <div className="w-full max-w-md flex mb-4">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-card text-card-foreground"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
              </div>
              <Button
                variant="outline"
                className="ml-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {selectedUnit === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedUnit(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{unit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to view tutorials
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : Object.keys(groupedTutorials).length === 0 ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No tutorials found. Try a different search term.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTutorials).map(([topic, tutorials]) => (
              <Collapsible
                key={topic}
                open={openTopics[topic]}
                onOpenChange={() => toggleTopic(topic)}
              >
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{topic}</CardTitle>
                        {openTopics[topic] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tutorials.map((tutorial: Tutorial, index: number) => (
                          <VideoCard key={index} tutorial={tutorial} />
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}