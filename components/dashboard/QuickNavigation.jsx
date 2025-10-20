import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Wallet, User, Gamepad2 } from "lucide-react";

export default function QuickNavigation() {
  return (
    <Card className="bg-slate-800 border-slate-700 text-white mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full justify-start gap-2 border-slate-600 text-gray-300 hover:bg-slate-700">
              <Gamepad2 className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/tournaments">
            <Button variant="outline" className="w-full justify-start gap-2 border-slate-600 text-gray-300 hover:bg-slate-700">
              <Trophy className="h-4 w-4" />
              Tournaments
            </Button>
          </Link>
          <Link href="/dashboard/wallet">
            <Button variant="outline" className="w-full justify-start gap-2 border-slate-600 text-gray-300 hover:bg-slate-700">
              <Wallet className="h-4 w-4" />
              Wallet
            </Button>
          </Link>
          <Link href="/dashboard/my-account">
            <Button variant="outline" className="w-full justify-start gap-2 border-slate-600 text-gray-300 hover:bg-slate-700">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
