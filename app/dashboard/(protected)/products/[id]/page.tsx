import { getProductById } from '@/lib/services/productService';

export default async function DashboardProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  return <div>{product?.name}</div>;
}
