import ProductCard from "@/components/ProductCard";
import useProductList from "@/hooks/useProductList";
import Product from "@/types/Product";
import { useState } from "react";

import { Box, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import ProductInfoModal from "./ProductInfoModal";

const HomePage = () => {
  const [cart, setCart] = useState<Array<Product>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [productList, selectedProduct, setSelectedProduct, isLoading] =
    useProductList();

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        justifyContent={"center"}
        height={"100vh"}
      >
        {!isLoading ? (
          productList.map((p: Product) => (
            <Grid item key={p.id}>
              <ProductCard
                product={p}
                onClickDetails={() => {
                  setIsModalOpen(true);
                  setSelectedProduct(p);
                }}
                onAddToCart={() => {
                  setCart([...cart, p]);
                }}
              />
            </Grid>
          ))
        ) : (
          <Box sx={{ width: "90%", float: "center", marginTop: "20px" }}>
            <LinearProgress />
          </Box>
        )}
      </Grid>
      <ProductInfoModal
        testid="product-info"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        product={selectedProduct}
      />
    </>
  );
};
export default HomePage;
