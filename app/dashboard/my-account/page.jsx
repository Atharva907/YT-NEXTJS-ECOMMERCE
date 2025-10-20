"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyAccount() {
  return (
    <Card className="max-w-lg mx-auto shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Email: player@example.com</p>
        <p>Username: Player123</p>
        <Button className="w-full">Edit Account</Button>
      </CardContent>
    </Card>
  );
}
