import { useState, useEffect } from 'react';
import productsData from "@/data/Products.json";
import Product from '@/types/Product';

const useProductList = ()  : [Product[], Product | undefined, (product: Product) => void] => {
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();  

  useEffect(() => {
      const data = [...productsData.map((productData) => ({
        id: productData.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        category: productData.category,
      }))];

      setProductList(data);
      setSelectedProduct(data[0]);
  }, []);

  return [productList, selectedProduct, setSelectedProduct];
};

export default useProductList;