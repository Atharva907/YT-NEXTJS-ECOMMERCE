import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';

async function getProduct(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/products/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function EditProductPage({ params }) {
  const productData = await getProduct(params.id);

  if (!productData) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={productData} />
    </div>
  );
}
