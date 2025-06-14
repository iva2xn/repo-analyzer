
import { AnalysisData } from "@/components/AnalysisResults"

// Mock service - In production, this would integrate with Gemini 2.0 API
export class AnalysisService {
  static async analyzeRepository(repoUrl: string): Promise<AnalysisData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Extract owner and repo from URL
    const urlParts = repoUrl.replace('https://github.com/', '').split('/')
    const owner = urlParts[0]
    const repo = urlParts[1]
    
    // Mock GitHub API call
    const repoData = await this.fetchRepositoryData(owner, repo)
    
    // Mock Gemini 2.0 analysis
    const analysis = this.generateMockAnalysis(repoData)
    
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
  
  private static generateMockAnalysis(repoData: any): AnalysisData {
    // In production, this would use Gemini 2.0 to analyze the actual codebase
    const baseComplexity = Math.random()
    const complexity = baseComplexity > 0.7 ? 'High' : baseComplexity > 0.4 ? 'Medium' : 'Low'
    
    const linesOfCode = Math.floor(Math.random() * 50000) + 5000
    const components = Math.floor(Math.random() * 50) + 10
    const dependencies = Math.floor(Math.random() * 100) + 20
    
    // Cost calculation based on complexity, LOC, and components
    const complexityMultiplier = complexity === 'High' ? 1.5 : complexity === 'Medium' ? 1.2 : 1.0
    const baseHours = Math.floor((linesOfCode / 100) + (components * 4) + (dependencies * 0.5))
    const totalHours = Math.floor(baseHours * complexityMultiplier)
    
    return {
      repository: {
        name: repoData.name,
        description: repoData.description || "Repository analysis completed",
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
      features: this.detectFeatures(complexity, components)
    }
  }
  
  private static detectTechStack(language: string): string[] {
    const stacks: { [key: string]: string[] } = {
      'TypeScript': ['TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
      'JavaScript': ['JavaScript', 'React', 'Node.js', 'CSS'],
      'Python': ['Python', 'Django/Flask', 'PostgreSQL', 'CSS'],
      'Java': ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'],
      'Go': ['Go', 'Gin/Echo', 'PostgreSQL', 'HTML/CSS'],
      'default': ['JavaScript', 'React', 'Node.js', 'CSS']
    }
    
    return stacks[language] || stacks['default']
  }
  
  private static detectFeatures(complexity: string, components: number): string[] {
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
      'Error Handling'
    ]
    
    const complexFeatures = [
      'Real-time Updates',
      'Advanced Analytics',
      'File Upload/Management',
      'Third-party Integrations',
      'Custom Hooks/Utils',
      'Performance Optimization'
    ]
    
    let features = [...baseFeatures]
    
    if (complexity === 'Medium' || complexity === 'High') {
      features.push(...mediumFeatures)
    }
    
    if (complexity === 'High') {
      features.push(...complexFeatures.slice(0, Math.floor(components / 10)))
    }
    
    return features
  }
}
