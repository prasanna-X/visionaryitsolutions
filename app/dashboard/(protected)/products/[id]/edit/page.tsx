import ProductForm from '@/components/dashboard/products/ProductForm';
import { getProductById } from '@/lib/services/productService';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const product = await getProductById((await params).id);
  return <ProductForm product={product} />;
}
