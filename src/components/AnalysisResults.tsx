
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Code, FileText, Users, Clock, Zap } from "lucide-react"

export interface AnalysisData {
  repository: {
    name: string
    description: string
    language: string
    stars: number
    forks: number
  }
  statistics: {
    totalLines: number
    customComponents: number
    dependencies: number
    complexity: 'Low' | 'Medium' | 'High'
  }
  costEstimate: {
    junior: { min: number; max: number }
    mid: { min: number; max: number }
    senior: { min: number; max: number }
    team: { min: number; max: number }
  }
  timeEstimate: {
    solo: string
    team: string
  }
  techStack: string[]
  features: string[]
}

interface AnalysisResultsProps {
  data: AnalysisData
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Repository Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {data.repository.name}
          </CardTitle>
          <p className="text-muted-foreground">{data.repository.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{data.repository.language}</Badge>
            <Badge variant="outline">⭐ {data.repository.stars}</Badge>
            <Badge variant="outline">🍴 {data.repository.forks}</Badge>
            <Badge className={getComplexityColor(data.statistics.complexity)}>
              {data.statistics.complexity} Complexity
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lines of Code</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.statistics.totalLines.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Components</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.statistics.customComponents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dependencies</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.statistics.dependencies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Dev Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.timeEstimate.solo}</div>
            <p className="text-xs text-muted-foreground">Solo developer</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Estimates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Development Cost Estimates
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on repository complexity, lines of code, and market rates
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Individual Developers</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Junior Developer</span>
                  <span className="font-medium">
                    {formatCurrency(data.costEstimate.junior.min)} - {formatCurrency(data.costEstimate.junior.max)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Mid-Level Developer</span>
                  <span className="font-medium">
                    {formatCurrency(data.costEstimate.mid.min)} - {formatCurrency(data.costEstimate.mid.max)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Senior Developer</span>
                  <span className="font-medium">
                    {formatCurrency(data.costEstimate.senior.min)} - {formatCurrency(data.costEstimate.senior.max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Development Team</h4>
              <div className="p-4 border rounded-lg bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Full Team</span>
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(data.costEstimate.team.min)} - {formatCurrency(data.costEstimate.team.max)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Estimated timeline: {data.timeEstimate.team}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.techStack.map((tech, index) => (
              <Badge key={index} variant="outline">{tech}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Detected Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
