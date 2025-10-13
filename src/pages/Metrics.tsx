import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Target } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data for the charts - in millions
const revenueData = [
  { month: "Jan", revenue: 1.8, profit: 0.4 },
  { month: "Feb", revenue: 1.9, profit: 0.42 },
  { month: "Mar", revenue: 2.0, profit: 0.45 },
  { month: "Apr", revenue: 2.1, profit: 0.47 },
  { month: "May", revenue: 2.2, profit: 0.49 },
  { month: "Jun", revenue: 2.3, profit: 0.53 },
];

// Client growth over time
const clientGrowthData = [
  { month: "Jan", clients: 145 },
  { month: "Feb", clients: 148 },
  { month: "Mar", clients: 151 },
  { month: "Apr", clients: 153 },
  { month: "May", clients: 155 },
  { month: "Jun", clients: 157 },
];

// Performance metrics page component
export default function Metrics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Performance Metrics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track key performance indicators and business trends
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Monthly Recurring Revenue</span>
              <DollarSign className="h-4 w-4 text-success" />
            </div>
            <div className="text-2xl font-bold">$2.3M</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% MoM</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Client Retention Rate</span>
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">94.5%</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+2.1% MoM</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Avg Resolution Time</span>
              <Clock className="h-4 w-4 text-secondary" />
            </div>
            <div className="text-2xl font-bold">2.4h</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-success">
              <TrendingDown className="h-3 w-3" />
              <span>-18% MoM</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
              <Users className="h-4 w-4 text-warning" />
            </div>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+0.3 MoM</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main revenue visualization */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Revenue & Profit Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Using recharts library for nice looking charts */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(262 83% 58%)"
                strokeWidth={2}
                name="Revenue (M)"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="hsl(142 76% 36%)"
                strokeWidth={2}
                name="Profit (M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Client Growth Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Client Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clients" fill="hsl(220 100% 64%)" name="Active Clients" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Service Level Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Ticket Response Time</span>
                <span className="text-sm font-semibold">98%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: "98%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">First Call Resolution</span>
                <span className="text-sm font-semibold">87%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "87%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">System Uptime</span>
                <span className="text-sm font-semibold">99.9%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: "99.9%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Team Productivity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Tickets Resolved/Day</span>
                <span className="text-sm font-semibold">342</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: "85%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Team Utilization</span>
                <span className="text-sm font-semibold">78%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "78%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Customer Feedback Score</span>
                <span className="text-sm font-semibold">4.8/5</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning" style={{ width: "96%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
