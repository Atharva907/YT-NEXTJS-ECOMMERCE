'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, Minus, History } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function WalletCard() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    fetchWalletData();
  }, [auth]);

  const fetchWalletData = async () => {
    try {
      if (!auth?.email) return;

      setLoading(true);
      const response = await fetch(`/api/players/wallet?email=${auth.email}`);
      const data = await response.json();

      if (response.ok) {
        setWalletBalance(data.walletBalance);
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    const amount = prompt('Enter amount to add:');
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      try {
        const response = await fetch('/api/players/wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: auth.email,
            amount: Number(amount),
            description: 'Wallet top-up'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setWalletBalance(data.walletBalance);
          alert('Funds added successfully!');
        } else {
          alert('Failed to add funds');
        }
      } catch (error) {
        console.error('Error adding funds:', error);
        alert('Failed to add funds');
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          <div className="p-1.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
            <Wallet className="h-4 w-4 text-white" />
          </div>
          Wallet Balance
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-300"
          onClick={() => setShowTransactions(!showTransactions)}
        >
          <History className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">
          {loading ? 'Loading...' : formatCurrency(walletBalance)}
        </div>

        <Button 
          onClick={handleAddFunds}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Funds
        </Button>

        {showTransactions && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-400">Recent Transactions</h4>
            {transactions.length === 0 ? (
              <p className="text-sm text-gray-500">No transactions yet</p>
            ) : (
              transactions.slice(-5).reverse().map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant={transaction.type === 'deposit' ? 'default' : 'secondary'}>
                      {transaction.type}
                    </Badge>
                    <span className="text-sm text-gray-400">{transaction.description}</span>
                  </div>
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
