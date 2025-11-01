
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { transactionData } from "@/lib/data";
import { formatCurrency, formatDate, getTransactionColor } from "@/lib/esportUtils";
import TransactionRow from "@/components/dashboard/TransactionRow";
import { Wallet, TrendingUp, Download, ArrowUpRight, ArrowDownRight, Calendar, Filter, Plus } from "lucide-react";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import { useSelector } from "react-redux";

export default function WalletPage() {
  const auth = useSelector(state => state.authStore.auth);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  // Fetch wallet data from API
  useEffect(() => {
    const fetchWalletData = async () => {
      if (!auth || !auth.email) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/wallet?email=${encodeURIComponent(auth.email)}`);

        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
          setTransactions(data.transactions);
        } else {
          console.error("Failed to fetch wallet data");
          // Fallback to mock data
          setTransactions(transactionData);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        // Fallback to mock data
        setTransactions(transactionData);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [auth]);

  // Handle deposit
  const handleDeposit = async () => {
    if (!depositAmount || !depositMethod) return;

    setIsDepositing(true);

    try {
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: auth.email,
          amount: depositAmount,
          type: 'deposit',
          method: depositMethod,
          description: `Deposit via ${depositMethod}`
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update balance immediately for better UX
        const amount = parseFloat(depositAmount);
        setBalance(prev => prev + amount);
        setTransactions(prev => [data.transaction, ...prev]);
        setDepositAmount("");
        setDepositMethod("");
        setIsDepositDialogOpen(false);
      } else {
        console.error("Deposit failed");
      }
    } catch (error) {
      console.error("Error during deposit:", error);
    } finally {
      setIsDepositing(false);
    }
  };

  // Handle withdrawal
  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawMethod) return;

    setIsWithdrawing(true);

    try {
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: auth.email,
          amount: withdrawAmount,
          type: 'withdraw',
          method: withdrawMethod,
          description: `Withdrawal via ${withdrawMethod}`
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
        setTransactions(prev => [data.transaction, ...prev]);
        setWithdrawAmount("");
        setWithdrawMethod("");
        setIsWithdrawDialogOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Withdrawal failed:", errorData.error);
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === "all") return true;
    if (activeTab === "income") return transaction.amount > 0;
    if (activeTab === "expenses") return transaction.amount < 0;
    return true;
  });

  // Calculate total income and expenses
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
        <p className="text-gray-400">Manage your earnings and transactions</p>
      </div>

      {/* Balance and Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-none text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Wallet className="h-6 w-6" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30">Available</Badge>
            </div>
            <p className="text-sm text-white/80 mb-1">Current Balance</p>
            <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Deposits</p>
            <p className="text-3xl font-bold text-green-400">{formatCurrency(totalIncome)}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <ArrowDownRight className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Withdrawals</p>
            <p className="text-3xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Deposit and Withdraw Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deposit Card */}
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount" className="text-sm text-gray-400">Amount</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-3 block">Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDepositMethod("paypal")}
                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                      depositMethod === "paypal"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">P</div>
                    <span className="text-xs">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositMethod("card")}
                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                      depositMethod === "card"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md flex items-center justify-center text-white text-xs font-bold">Card</div>
                    <span className="text-xs">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositMethod("crypto")}
                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                      depositMethod === "crypto"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-sm">₿</div>
                    <span className="text-xs">Crypto</span>
                  </button>
                </div>
              </div>

              <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={!depositAmount || !depositMethod || parseFloat(depositAmount) <= 0}
                  >
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Confirm Deposit</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-400">Amount</span>
                      <span className="font-bold text-xl">{formatCurrency(parseFloat(depositAmount) || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-400">Method</span>
                      <span className="font-bold">{depositMethod}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border-t border-slate-600">
                      <span className="text-gray-400">You will receive</span>
                      <span className="font-bold text-xl text-green-400">{formatCurrency(parseFloat(depositAmount) || 0)}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      onClick={() => {
                        handleDeposit();
                      }}
                      disabled={isDepositing}
                    >
                      {isDepositing ? "Processing..." : "Confirm Deposit"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Withdraw Card */}
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl">Withdraw Funds</CardTitle>
            <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/50">Min: $10</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm text-gray-400">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-3 block">Withdrawal Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod("paypal")}
                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                      withdrawMethod === "paypal"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">P</div>
                    <span className="text-xs">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod("bank")}
                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                      withdrawMethod === "bank"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center text-white font-bold text-sm">B</div>
                    <span className="text-xs">Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod("crypto")}
                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                      withdrawMethod === "crypto"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-sm">₿</div>
                    <span className="text-xs">Crypto</span>
                  </button>
                </div>
              </div>

              <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!withdrawAmount || !withdrawMethod || parseFloat(withdrawAmount) < 10 || parseFloat(withdrawAmount) > balance}
                  >
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Confirm Withdrawal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-400">Amount</span>
                      <span className="font-bold text-xl">{formatCurrency(parseFloat(withdrawAmount))}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-400">Method</span>
                      <span className="font-bold">{withdrawMethod}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-400">Processing Fee</span>
                      <span className="font-bold">{formatCurrency(2.5)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border-t border-slate-600">
                      <span className="text-gray-400">You will receive</span>
                      <span className="font-bold text-xl text-green-400">{formatCurrency(parseFloat(withdrawAmount) - 2.5)}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={handleWithdraw}
                      disabled={isWithdrawing}
                    >
                      {isWithdrawing ? "Processing..." : "Confirm Withdrawal"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-slate-800 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Transaction History</CardTitle>
          <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-700 border-slate-600 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Deposits</TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Withdrawals</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <LoadingSkeleton />
                    </div>
                  ))}
                </div>
              ) : filteredTransactions.length > 0 ? (
                <div className="space-y-2">
                  {filteredTransactions.map((t) => (
                    <TransactionRow key={t.id} {...t} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
