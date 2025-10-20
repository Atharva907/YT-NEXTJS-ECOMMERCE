"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const tournaments = [
  { name: "Valorant Cup", date: "Oct 15, 2025", result: "Semi-Finalist" },
  { name: "CS2 Battle", date: "Sep 30, 2025", result: "Winner" },
];

export default function MyTournaments() {
  return (
    <div className="grid gap-4">
      {tournaments.map((t) => (
        <Card key={t.name}>
          <CardHeader>
            <CardTitle>{t.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {t.date}</p>
            <p>Result: {t.result}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
