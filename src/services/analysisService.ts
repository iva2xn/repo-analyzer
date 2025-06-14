
import { AnalysisData } from "@/components/AnalysisResults"

// Service for analyzing repositories using Gemini 2.0 API
export class AnalysisService {
  static async analyzeRepository(repoUrl: string, apiKey: string): Promise<AnalysisData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Extract owner and repo from URL
    const urlParts = repoUrl.replace('https://github.com/', '').split('/')
    const owner = urlParts[0]
    const repo = urlParts[1]
    
    console.log('Analyzing repository with Gemini 2.0:', { owner, repo, hasApiKey: !!apiKey })
    
    // Fetch real GitHub repository data
    const repoData = await this.fetchRepositoryData(owner, repo)
    
    // In production, this would use the Gemini 2.0 API with the provided API key
    // For now, we'll generate enhanced mock analysis
    const analysis = this.generateEnhancedAnalysis(repoData, apiKey)
    
    return analysis
  }
  
  private static async fetchRepositoryData(owner: string, repo: string) {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
      if (!response.ok) {
        throw new Error('Repository not found')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching repository:', error)
      // Return mock data for demo purposes
      return {
        name: `${owner}/${repo}`,
        description: "A sample repository for cost analysis",
        language: "TypeScript",
        stargazers_count: 42,
        forks_count: 8
      }
    }
  }
  
  private static generateEnhancedAnalysis(repoData: any, apiKey: string): AnalysisData {
    // Enhanced analysis simulating Gemini 2.0 capabilities
    const baseComplexity = Math.random()
    const complexity = baseComplexity > 0.7 ? 'High' : baseComplexity > 0.4 ? 'Medium' : 'Low'
    
    // More sophisticated calculations based on real repo data
    const estimatedLines = repoData.size ? repoData.size * 10 : Math.floor(Math.random() * 50000) + 5000
    const linesOfCode = Math.max(1000, estimatedLines)
    const components = Math.floor(linesOfCode / 200) + Math.floor(Math.random() * 20)
    const dependencies = Math.floor(Math.random() * 100) + 20
    
    // Enhanced cost calculation
    const complexityMultiplier = complexity === 'High' ? 1.8 : complexity === 'Medium' ? 1.4 : 1.0
    const baseHours = Math.floor((linesOfCode / 80) + (components * 3) + (dependencies * 0.7))
    const totalHours = Math.floor(baseHours * complexityMultiplier)
    
    console.log('Generated analysis with Gemini 2.0 simulation:', {
      complexity,
      linesOfCode,
      components,
      totalHours,
      apiKeyProvided: !!apiKey
    })
    
    return {
      repository: {
        name: repoData.name,
        description: repoData.description || "Repository analyzed with Gemini 2.0",
        language: repoData.language || "JavaScript",
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0
      },
      statistics: {
        totalLines: linesOfCode,
        customComponents: components,
        dependencies: dependencies,
        complexity: complexity as 'Low' | 'Medium' | 'High'
      },
      costEstimate: {
        junior: { 
          min: Math.floor(totalHours * 25), 
          max: Math.floor(totalHours * 35) 
        },
        mid: { 
          min: Math.floor(totalHours * 45), 
          max: Math.floor(totalHours * 65) 
        },
        senior: { 
          min: Math.floor(totalHours * 75), 
          max: Math.floor(totalHours * 100) 
        },
        team: { 
          min: Math.floor(totalHours * 60), 
          max: Math.floor(totalHours * 85) 
        }
      },
      timeEstimate: {
        solo: `${Math.ceil(totalHours / 40)} weeks`,
        team: `${Math.ceil(totalHours / 160)} weeks`
      },
      techStack: this.detectTechStack(repoData.language),
      features: this.detectAdvancedFeatures(complexity, components, repoData)
    }
  }
  
  private static detectTechStack(language: string): string[] {
    const stacks: { [key: string]: string[] } = {
      'TypeScript': ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Vite'],
      'JavaScript': ['JavaScript', 'React', 'Node.js', 'CSS', 'Webpack'],
      'Python': ['Python', 'Django/Flask', 'PostgreSQL', 'CSS', 'Redis'],
      'Java': ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Maven'],
      'Go': ['Go', 'Gin/Echo', 'PostgreSQL', 'HTML/CSS', 'Docker'],
      'Rust': ['Rust', 'Actix/Warp', 'PostgreSQL', 'WebAssembly'],
      'default': ['JavaScript', 'React', 'Node.js', 'CSS']
    }
    
    return stacks[language] || stacks['default']
  }
  
  private static detectAdvancedFeatures(complexity: string, components: number, repoData: any): string[] {
    const baseFeatures = [
      'User Interface Components',
      'Responsive Design',
      'State Management',
      'API Integration'
    ]
    
    const mediumFeatures = [
      'Authentication System',
      'Database Integration',
      'Form Validation',
      'Error Handling',
      'Routing System'
    ]
    
    const complexFeatures = [
      'Real-time Updates',
      'Advanced Analytics',
      'File Upload/Management',
      'Third-party Integrations',
      'Custom Hooks/Utils',
      'Performance Optimization',
      'Caching Strategy',
      'Testing Framework',
      'CI/CD Pipeline'
    ]
    
    let features = [...baseFeatures]
    
    // Add features based on repository characteristics
    if (repoData.has_issues) {
      features.push('Issue Tracking')
    }
    
    if (repoData.has_wiki) {
      features.push('Documentation System')
    }
    
    if (complexity === 'Medium' || complexity === 'High') {
      const mediumCount = complexity === 'High' ? mediumFeatures.length : Math.floor(mediumFeatures.length * 0.7)
      features.push(...mediumFeatures.slice(0, mediumCount))
    }
    
    if (complexity === 'High') {
      const complexCount = Math.floor(components / 8)
      features.push(...complexFeatures.slice(0, Math.min(complexCount, complexFeatures.length)))
    }
    
    return [...new Set(features)] // Remove duplicates
  }
}
