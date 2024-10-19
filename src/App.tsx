import { useState } from 'react'
import tutorials from './data/tutorials.json'
import VideoCard from './components/VideoCard'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ExternalLink } from "lucide-react"
import logo from './assets/logo.jpg'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <img src={logo} alt="Aimly Logo" className="w-48 h-32 object-contain mb-6" />
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Aimly Video Tutorials
          </h1>
          <div className="w-full max-w-md flex">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </Button>
          </div>
        </div>
        
        {filteredTutorials.length === 0 ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">No tutorials found. Try a different search term.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              tutorial.sourceType === 'youtube' ? (
                <VideoCard key={index} tutorial={tutorial} />
              ) : (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
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