
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "John Smith",
    action: "completed a purchase",
    amount: "$299.00",
    time: "2 minutes ago",
    initials: "JS"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "signed up for premium",
    amount: "$99.00",
    time: "5 minutes ago",
    initials: "SJ"
  },
  {
    id: 3,
    user: "Mike Chen",
    action: "updated their profile",
    amount: "",
    time: "10 minutes ago",
    initials: "MC"
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "left a review",
    amount: "",
    time: "15 minutes ago",
    initials: "ED"
  },
  {
    id: 5,
    user: "Alex Wilson",
    action: "made a refund request",
    amount: "$150.00",
    time: "20 minutes ago",
    initials: "AW"
  },
]

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="text-right">
                {activity.amount && (
                  <p className="text-sm font-medium">{activity.amount}</p>
                )}
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
