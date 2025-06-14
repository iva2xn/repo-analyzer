
import { 
  Calendar, 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  MessageSquare,
  CreditCard,
  Github,
  Code,
  DollarSign
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

const mainItems = [
  {
    title: "Analyzer",
    url: "/",
    icon: Home,
  },
  {
    title: "Cost Calculator",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Repository Stats",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Code Analysis",
    url: "#",
    icon: Code,
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
  },
]

const secondaryItems = [
  {
    title: "GitHub Integration",
    url: "#",
    icon: Github,
  },
  {
    title: "History",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Pricing",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Github className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">RepoAnalyzer</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Developer</p>
            <p className="text-xs text-muted-foreground">Cost Analyst</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
