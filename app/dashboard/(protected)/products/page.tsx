import { getAllProductsAdmin } from '@/lib/services/productService';
import ProductTable from '@/components/dashboard/products/ProductTable';

export default async function DashboardProductsPage() {
  const products = await getAllProductsAdmin();
  return <ProductTable products={products} />;
}
