"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, Truck, CheckCircle, Clock, XCircle, X } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const statusMap = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-600' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-600' },
  processing: { label: 'Processing', icon: Package, color: 'bg-purple-600' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-indigo-600' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-green-600' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-600' }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('success');
    if (orderId) {
      setSuccessMessage(`Order #${orderId.substring(0, 8)} placed successfully!`);
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      if (!auth || !auth.email) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const response = await fetch(`/api/orders?playerEmail=${auth.email}`);
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No orders yet</h3>
        <p className="text-gray-400 mb-4">You haven't placed any orders yet</p>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <a href="/shop">Start Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="bg-green-900/30 border border-green-700/50 text-green-300 px-4 py-3 rounded-md flex items-center justify-between">
          <span>{successMessage}</span>
          <button 
            onClick={() => setSuccessMessage(null)}
            className="text-green-400 hover:text-green-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <a href="/shop">Continue Shopping</a>
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map(order => {
          const StatusIcon = statusMap[order.status]?.icon || Package;
          const statusColor = statusMap[order.status]?.color || 'bg-gray-600';
          const statusLabel = statusMap[order.status]?.label || order.status;

          return (
            <Card key={order._id} className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order._id.substring(0, 8)}</CardTitle>
                    <p className="text-sm text-gray-400">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <Badge className={`${statusColor} text-white`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-700 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                          <p className="text-sm text-gray-400">{formatCurrency(item.price)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-bold">{formatCurrency(order.totalAmount)}</span>
                  </div>

                  {order.shippingAddress && (
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-400">
                        {order.shippingAddress.street}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
