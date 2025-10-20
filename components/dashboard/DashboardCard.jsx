import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardCard({ title, value }) {
  return (
    <Card className="shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
