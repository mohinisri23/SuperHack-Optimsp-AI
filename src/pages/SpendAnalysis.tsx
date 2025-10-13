import {
  CheckCircle2,
  AlertCircle,
  Search,
  Lightbulb,
  TrendingDown,
  Download,
} from "lucide-react";
import { generateReport } from "@/utils/exportUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Department spend data with utilization tracking
const departments = [
  {
    name: "Engineering",
    icon: "🔧",
    budget: "$450K",
    utilization: 85,
    status: "on-track",
  },
  {
    name: "Marketing",
    icon: "📊",
    budget: "$180K",
    utilization: 92,
    status: "on-track",
  },
  {
    name: "Operations",
    icon: "⚙️",
    budget: "$320K",
    utilization: 67,
    status: "optimize",
  },
  {
    name: "IT Infra",
    icon: "🔍",
    budget: "$240K",
    utilization: 45,
    status: "review",
  },
];

// AI-generated suggestions for cost optimization
const aiSuggestions = [
  {
    title: "Consolidate operations tools",
    impact: "$48K/year",
    confidence: 92,
  },
  {
    title: "Rightsize IT infrastructure",
    impact: "$72K/year",
    confidence: 88,
  },
  {
    title: "Optimize license allocation",
    impact: "$31K/year",
    confidence: 85,
  },
];

// Spend analysis page - helps identify cost savings opportunities
export default function SpendAnalysis() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Department Spend Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track budget utilization and identify optimization opportunities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search departments..." className="pl-10 w-64" />
          </div>
          <Button onClick={generateReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Budget</div>
            <div className="text-3xl font-bold">$1.19M</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Across 4 departments
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Avg Utilization</div>
            <div className="text-3xl font-bold">72%</div>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-success to-success/80 text-white">
          <CardContent className="pt-6">
            <div className="text-sm opacity-90 mb-1">Potential Savings</div>
            <div className="text-3xl font-bold">$151K</div>
            <div className="mt-2 text-sm opacity-90">
              Identified by AI
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{dept.icon}</span>
                      <span className="font-medium">{dept.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{dept.budget}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={dept.utilization} className="w-24" />
                      <span className="text-sm font-medium">{dept.utilization}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dept.status === "on-track" && (
                      <Badge className="bg-success/20 text-success hover:bg-success/30">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        On Track
                      </Badge>
                    )}
                    {dept.status === "optimize" && (
                      <Badge className="bg-warning/20 text-warning hover:bg-warning/30">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Optimize
                      </Badge>
                    )}
                    {dept.status === "review" && (
                      <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Review
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI-powered cost optimization recommendations */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* List of actionable suggestions with confidence scores */}
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                    <TrendingDown className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        Save <span className="font-semibold text-success">{suggestion.impact}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        {suggestion.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <Button>Apply</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
