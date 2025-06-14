
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Search } from "lucide-react"

interface GitHubRepoInputProps {
  onAnalyze: (repoUrl: string) => void
  isLoading: boolean
}

export function GitHubRepoInput({ onAnalyze, isLoading }: GitHubRepoInputProps) {
  const [repoUrl, setRepoUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (repoUrl.trim()) {
      onAnalyze(repoUrl.trim())
    }
  }

  const isValidGitHubUrl = (url: string) => {
    const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/
    return githubPattern.test(url)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Github className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Repository Cost Analyzer</CardTitle>
        </div>
        <p className="text-muted-foreground">
          Enter a public GitHub repository URL to get development cost estimates and detailed analysis
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="repo-url" className="text-sm font-medium">
              GitHub Repository URL
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="repo-url"
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            {repoUrl && !isValidGitHubUrl(repoUrl) && (
              <p className="text-sm text-destructive">
                Please enter a valid GitHub repository URL
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!repoUrl || !isValidGitHubUrl(repoUrl) || isLoading}
          >
            {isLoading ? (
              <>
                <Search className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Repository...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Repository
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
