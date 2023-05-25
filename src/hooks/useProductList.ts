import productsData from "@/data/Products.json";
import Product from "@/types/Product";
import { useEffect, useState } from "react";

const useProductList = (): [
  Product[],
  Product | undefined,
  (product: Product) => void,
  boolean
] => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const data = productsData.map((productData) => ({
          id: productData.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image: productData.image,
          category: productData.category,
        }));

        setProductList(data);
        setSelectedProduct(data[0]);
        setIsLoading(false);
      }, 300);
    };
    fetchData();
  }, []);

  return [productList, selectedProduct, setSelectedProduct, isLoading];
};

export default useProductList;
