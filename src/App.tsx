import { useState, useEffect } from 'react'
import tutorials from './data/firstWeek.json'
import VideoCard from './components/VideoCard'
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Search, ExternalLink, Moon, Sun } from "lucide-react"
import logo from './assets/logo.png'
import { useTheme } from "./components/theme-provider"

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {mounted && (theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            ))}
          </Button>
        </div>
        <div className="flex flex-col items-center mb-12">
          <img src={logo} alt="Aimly Logo" className="w-48 h-32 object-contain mb-6" />
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Aimly Video Tutorials
          </h1>
          <div className="w-full max-w-md flex">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-card text-card-foreground"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
            <Button
              variant="outline"
              className="ml-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </Button>
          </div>
        </div>
        
        {filteredTutorials.length === 0 ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No tutorials found. Try a different search term.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              tutorial.sourceType === 'youtube' ? (
                <VideoCard key={index} tutorial={tutorial} />
              ) : (
                <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col h-[230px]">
                  <CardHeader>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <Button variant="outline" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <a href={tutorial.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Tutorial
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App