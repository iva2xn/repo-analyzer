
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 4000, sales: 240 },
  { month: 'Feb', revenue: 3000, sales: 180 },
  { month: 'Mar', revenue: 5000, sales: 300 },
  { month: 'Apr', revenue: 4500, sales: 270 },
  { month: 'May', revenue: 6000, sales: 350 },
  { month: 'Jun', revenue: 5500, sales: 320 },
  { month: 'Jul', revenue: 7000, sales: 400 },
  { month: 'Aug', revenue: 6500, sales: 380 },
  { month: 'Sep', revenue: 8000, sales: 450 },
  { month: 'Oct', revenue: 7500, sales: 420 },
  { month: 'Nov', revenue: 9000, sales: 500 },
  { month: 'Dec', revenue: 8500, sales: 480 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              labelStyle={{ color: '#888888' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              strokeWidth={2}
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function SalesChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Sales by Month</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, 'Sales']}
              labelStyle={{ color: '#888888' }}
            />
            <Bar 
              dataKey="sales" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
