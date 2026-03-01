import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Video } from "lucide-react";
import Link from "next/link";

// Simulating Prisma fetch
async function getUpcomingClasses() {
  return [
    { id: "1", title: "Advanced Mathematics", startTime: "2024-03-05T09:00:00Z", zoomId: "84512345678" },
    { id: "2", title: "Computer Science 101", startTime: "2024-03-05T11:00:00Z", zoomId: "84598765432" },
  ];
}

export default async function DashboardPage() {
  const classes = await getUpcomingClasses();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-500" />
                {cls.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {new Date(cls.startTime).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {new Date(cls.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <Link href={`/class/${cls.zoomId}`}>
                  <Button className="w-full mt-4">Join Class</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}