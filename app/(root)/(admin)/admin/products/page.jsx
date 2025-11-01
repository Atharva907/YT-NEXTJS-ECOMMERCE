'use client';

import { Suspense } from 'react';
import ProductsList from './ProductsList';

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
