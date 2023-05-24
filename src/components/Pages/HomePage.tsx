import ProductCard from "@/components/ProductCard";
import useProductList from "@/hooks/useProductList";
import BaseComponentProps from "@/types/BaseComponentProps";
import Product from "@/types/Product";
import { useState } from "react";

import { Box, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import Alert from "../Alert";
import ProductInfoModal from "../Modals/ProductInfoModal";

interface HomePageProps extends BaseComponentProps {
  cart: Product[];
  addToCart: (p: Product) => void;
}
const HomePage = (props: HomePageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const [productList, selectedProduct, setSelectedProduct, isLoading] =
    useProductList();

  return (
    <Grid container rowSpacing={3} columnSpacing={2} justifyContent={"center"}>
      {!isLoading ? (
        productList.map((p: Product, index: number) => (
          <Grid item key={p.id}>
            <ProductCard
              testid={`product-card-${index}_${props.testid}`}
              product={p}
              onClickDetails={() => {
                setIsModalOpen(true);
                setSelectedProduct(p);
              }}
              onAddToCart={() => {
                props.addToCart(p);
                setIsAddedToCart(true);
              }}
            />
          </Grid>
        ))
      ) : (
        <Box sx={{ width: "90%", float: "center", marginTop: "200px" }}>
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
      <Alert
        testid={`add-cart-alert_${props.testid}`}
        isOpen={isAddedToCart}
        handleClose={() => setIsAddedToCart(false)}
        message={`המוצר נוסף לעגלה`}
        severity="success"
      />
    </Grid>
  );
};
export default HomePage;
