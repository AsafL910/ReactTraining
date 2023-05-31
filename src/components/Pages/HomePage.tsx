import ProductCard from '@/components/ProductCard';
import useProductList from '@/hooks/useProductList';
import { useAppDispatch } from '@/state/hooks';
import { addToCart } from '@/state/reducers/cartReducer';
import BaseComponentProps from '@/types/BaseComponentProps';
import Product from '@/types/Product';
import { useState } from 'react';

import { Box, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

import ProductInfoModal from '../Modals/ProductInfoModal';

const HomePage = (props: BaseComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [productList, selectedProduct, setSelectedProduct, isLoading] =
    useProductList();

  const dispatch = useAppDispatch();

  const handleAddToCart = (p: Product): void => {
    dispatch(addToCart(p));
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2} justifyContent={'center'}>
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
                handleAddToCart(p);
              }}
            />
          </Grid>
        ))
      ) : (
        <Box sx={{ width: '90%', float: 'center', marginTop: '200px' }}>
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
            handleAddToCart(selectedProduct);
          }
        }}
      />
    </Grid>
  );
};
export default HomePage;
