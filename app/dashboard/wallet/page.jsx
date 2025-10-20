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
import { Wallet, TrendingUp, Download, ArrowUpRight, ArrowDownRight, Calendar, Filter } from "lucide-react";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

export default function WalletPage() {
  const [balance, setBalance] = useState(275.5);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  
  // Simulate fetching transaction data from an API
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call
      setTransactions(transactionData);
      setLoading(false);
    };
    
    fetchTransactions();
  }, []);
  
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
  
  // Handle withdrawal
  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawMethod) return;
    
    setIsWithdrawing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update balance and add transaction
    const amount = parseFloat(withdrawAmount);
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      {
        id: transactions.length + 1,
        date: new Date().toLocaleDateString(),
        type: "Withdrawal",
        amount: -amount,
        status: "pending"
      },
      ...prev
    ]);
    
    setIsWithdrawing(false);
    setWithdrawAmount("");
    setWithdrawMethod("");
  };
  
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
            <p className="text-sm text-gray-400 mb-1">Total Income</p>
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
            <p className="text-sm text-gray-400 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Withdraw Card */}
      <Card className="bg-slate-800 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Withdraw Funds</CardTitle>
          <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/50">Min: $10</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Label htmlFor="method" className="text-sm text-gray-400">Withdrawal Method</Label>
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600 text-white">
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                    disabled={!withdrawAmount || !withdrawMethod || parseFloat(withdrawAmount) < 10}
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
            
            <div className="space-y-4 p-6 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <h3 className="text-lg font-semibold mb-2">Withdrawal Information</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                  <span>Minimum withdrawal amount is $10</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                  <span>Processing time: 3-5 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                  <span>A processing fee of $2.5 applies to all withdrawals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                  <span>Withdrawals are processed Monday to Friday, 9am-5pm EST</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
              <TabsTrigger value="income" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Income</TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Expenses</TabsTrigger>
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
