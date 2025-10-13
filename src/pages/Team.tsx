import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone } from "lucide-react";


// Team data - TODO: move this to a backend API eventually
const teamMembers = [
  {
    name: "Sneha Tiwari",
    role: "Senior MSP Engineer",
    department: "Engineering",
    email: "snehatiwari@optimsp.ai",
    phone: "+1 (555) 123-4567",
    status: "active",
    initials: "ST",
  },
  {
    name: "Rahul Kumar",
    role: "Technical Support Lead",
    department: "Operations",
    email: "rahulkumar@optimsp.ai",
    phone: "+1 (555) 234-5678",
    status: "active",
    initials: "RK",
  },
  {
    name: "Neha Sharma",
    role: "Client Success Manager",
    department: "Marketing",
    email: "nehasharma@optimsp.ai",
    phone: "+1 (555) 345-6789",
    status: "active",
    initials: "NS",
  },
  {
    name: "Ravi Gupta",
    role: "IT Infrastructure Specialist",
    department: "IT Infra",
    email: "ravigupta@optimsp.ai",
    phone: "+1 (555) 456-7890",
    status: "active",
    initials: "RG",
  },
  {
    name: "Palak Mishra",
    role: "Security Analyst",
    department: "Engineering",
    email: "palakmishra@optimsp.ai",
    phone: "+1 (555) 567-8901",
    status: "active",
    initials: "PM",
  },
  {
    name: "Tushar Bhatia",
    role: "Operations Coordinator",
    department: "Operations",
    email: "tusharbhatia@optimsp.ai",
    phone: "+1 (555) 678-9012",
    status: "active",
    initials: "TB",
  },
];

export default function Team() {
  return (
    <div className="space-y-6">
      {/* Page header with title and action button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your MSP team members and their roles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Search bar and department filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search team members..." className="pl-10" />
        </div>
        {/* Simple dropdown for now - could use a better select component later */}
        <select className="rounded-lg border border-border bg-card px-4 py-2">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Operations</option>
          <option>Marketing</option>
          <option>IT Infra</option>
        </select>
      </div>

      {/* Team Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Team Members</div>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Active Projects</div>
            <div className="text-3xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Avg Utilization</div>
            <div className="text-3xl font-bold">78%</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Satisfaction Score</div>
            <div className="text-3xl font-bold">4.8</div>
          </CardContent>
        </Card>
      </div>

      {/* Team member cards - responsive grid layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.email} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold flex items-center justify-center">
                  {member.initials}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <Badge variant="outline" className="mt-2">
                    {member.department}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Breakdown */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Engineering</span>
                <span className="text-sm text-muted-foreground">8 members</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "33%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Operations</span>
                <span className="text-sm text-muted-foreground">7 members</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: "29%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Marketing</span>
                <span className="text-sm text-muted-foreground">5 members</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: "21%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">IT Infrastructure</span>
                <span className="text-sm text-muted-foreground">4 members</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning" style={{ width: "17%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
