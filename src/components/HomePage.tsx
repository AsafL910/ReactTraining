import ProductCard from "@/components/ProductCard";
import useProductList from "@/hooks/useProductList";
import Product from "@/types/Product";
import { useState } from "react";

import { Box, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import ProductInfoModal from "./ProductInfoModal";

interface HomePageProps {
  cart: Array<Product>;
  addToCart: (p: Product) => void;
}
const HomePage = (props: HomePageProps) => {
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
                onAddToCart={() => props.addToCart(p)}
              />
            </Grid>
          ))
        ) : (
          <Box sx={{ width: "90%", float: "center", marginTop: "20px" }}>
            <LinearProgress />
          </Box>
        )}
        <ProductInfoModal
          testid="product-info"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          product={selectedProduct}
          addToCart={() => {
            if (selectedProduct) {
              props.addToCart(selectedProduct);
            }
          }}
        />
      </Grid>
    </>
  );
};
export default HomePage;
