import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/components/ui/Cart';

const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <Card className="bg-slate-800 border-slate-700 text-white overflow-hidden hover:border-purple-500/50 transition-all duration-300 group">
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            Featured
          </Badge>
        )}
        {product.inStock <= 5 && product.inStock > 0 && (
          <Badge className="absolute top-2 right-2 bg-orange-600 text-white">
            Only {product.inStock} left
          </Badge>
        )}
        {product.inStock === 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Badge className="bg-red-600 text-white text-lg px-3 py-1">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span>4.5</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">{formatCurrency(product.price)}</span>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={product.inStock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
