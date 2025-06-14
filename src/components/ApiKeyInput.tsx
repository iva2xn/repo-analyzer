
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Key, ExternalLink } from "lucide-react"

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void
  isLoading: boolean
}

export function ApiKeyInput({ onApiKeySubmit, isLoading }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim())
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Key className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Google AI API Key Required</CardTitle>
        </div>
        <p className="text-muted-foreground">
          To analyze repositories with Gemini 2.0, please provide your Google AI API key
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Google AI API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Google AI API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Your API key is used securely and not stored permanently
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!apiKey.trim() || isLoading}
            >
              <Key className="mr-2 h-4 w-4" />
              Continue with Analysis
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Get API Key from Google AI Studio
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
