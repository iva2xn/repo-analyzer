
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardCard } from "@/components/DashboardCard"
import { RevenueChart, SalesChart } from "@/components/DashboardChart"
import { RecentActivity } from "@/components/RecentActivity"
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  Activity,
  Bell,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Index = () => {
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
                    placeholder="Search..."
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
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your business.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                  title="Total Revenue"
                  value="$45,231.89"
                  description="from last month"
                  icon={DollarSign}
                  trend={{ value: "20.1%", isPositive: true }}
                />
                <DashboardCard
                  title="Subscriptions"
                  value="+2,350"
                  description="from last month"
                  icon={Users}
                  trend={{ value: "180.1%", isPositive: true }}
                />
                <DashboardCard
                  title="Sales"
                  value="+12,234"
                  description="from last month"
                  icon={CreditCard}
                  trend={{ value: "19%", isPositive: true }}
                />
                <DashboardCard
                  title="Active Now"
                  value="+573"
                  description="from last hour"
                  icon={Activity}
                  trend={{ value: "2%", isPositive: false }}
                />
              </div>

              {/* Charts and Activity */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RevenueChart />
                <RecentActivity />
              </div>

              {/* Additional Chart */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <SalesChart />
                <div className="col-span-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <DashboardCard
                      title="Conversion Rate"
                      value="3.2%"
                      description="from last week"
                      icon={Activity}
                      trend={{ value: "0.3%", isPositive: true }}
                    />
                    <DashboardCard
                      title="Average Order"
                      value="$127.50"
                      description="from last week"
                      icon={DollarSign}
                      trend={{ value: "5.2%", isPositive: true }}
                    />
                  </div>
                  <DashboardCard
                    title="Customer Satisfaction"
                    value="4.8/5.0"
                    description="based on 2,341 reviews"
                    icon={Users}
                    trend={{ value: "0.2", isPositive: true }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
