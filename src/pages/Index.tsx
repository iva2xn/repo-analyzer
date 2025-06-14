
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { GitHubRepoInput } from "@/components/GitHubRepoInput"
import { AnalysisResults, AnalysisData } from "@/components/AnalysisResults"
import { ApiKeyInput } from "@/components/ApiKeyInput"
import { AnalysisService } from "@/services/analysisService"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const Index = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handleApiKeySubmit = (submittedApiKey: string) => {
    setApiKey(submittedApiKey)
    toast({
      title: "API Key Accepted",
      description: "You can now proceed with repository analysis.",
    })
  }

  const handleAnalyze = async (repoUrl: string) => {
    if (!apiKey) {
      setRepoUrl(repoUrl)
      return
    }

    setIsLoading(true)
    try {
      console.log('Starting analysis for:', repoUrl, 'with API key provided')
      const data = await AnalysisService.analyzeRepository(repoUrl, apiKey)
      setAnalysisData(data)
      toast({
        title: "Analysis Complete",
        description: "Repository has been successfully analyzed with Gemini 2.0!",
      })
    } catch (error) {
      console.error('Analysis failed:', error)
      toast({
        title: "Analysis Failed", 
        description: "There was an error analyzing the repository. Please check your API key and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setAnalysisData(null)
    setApiKey(null)
    setRepoUrl(null)
  }

  // If we have a repo URL but no API key, show API key input
  if (repoUrl && !apiKey) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-muted/40">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <div className="flex-1">
                  <form className="relative max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search repositories..."
                      className="pl-8"
                    />
                  </form>
                </div>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => setRepoUrl(null)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Repository Input
                  </Button>
                </div>
                
                <ApiKeyInput 
                  onApiKeySubmit={(key) => {
                    handleApiKeySubmit(key)
                    handleAnalyze(repoUrl)
                  }} 
                  isLoading={isLoading} 
                />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/40">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="-ml-1" />
              <div className="flex-1">
                <form className="relative max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search repositories..."
                    className="pl-8"
                  />
                </form>
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {!analysisData ? (
                <>
                  {/* Page Header */}
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                      GitHub Repository Cost Analyzer
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Get accurate development cost estimates powered by Gemini 2.0 AI analysis
                    </p>
                  </div>

                  {/* Input Form */}
                  <div className="flex justify-center">
                    <GitHubRepoInput onAnalyze={handleAnalyze} isLoading={isLoading} />
                  </div>

                  {/* Features Section */}
                  <div className="grid gap-6 md:grid-cols-3 mt-12">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                        <Search className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Gemini 2.0 Powered</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced code analysis using Google's latest Gemini 2.0 model for accurate insights
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                        <Bell className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Accurate Estimates</h3>
                      <p className="text-sm text-muted-foreground">
                        Get realistic cost estimates based on complexity, LOC, and market rates
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                        <ArrowLeft className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Detailed Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive breakdown of components, dependencies, and features
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Back Button */}
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleReset}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Analyze Another Repository
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold">Analysis Results</h1>
                      <p className="text-muted-foreground">
                        Development cost estimates and repository insights powered by Gemini 2.0
                      </p>
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <AnalysisResults data={analysisData} />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
