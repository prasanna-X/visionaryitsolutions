import { getAllProducts } from '@/lib/services/productService';
import ProductTable from '@/components/dashboard/products/ProductTable';

export default async function DashboardProductsPage() {
  const products = await getAllProducts().catch(() => []);
  return <ProductTable products={products} />;
}
