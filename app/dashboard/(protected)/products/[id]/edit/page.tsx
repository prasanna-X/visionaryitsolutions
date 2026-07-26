import ProductForm from '@/components/dashboard/products/ProductForm';
import { getProductById } from '@/lib/services/productService';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  return <ProductForm product={product ?? undefined} />;
}
