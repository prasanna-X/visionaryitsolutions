'use client';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/products').then((r) => r.json()).then(setProducts);
  }, []);
  return products;
}
