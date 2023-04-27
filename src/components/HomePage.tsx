import { useState } from 'react'
import Product from '@/types/Product'
import ProductCard from '@/components/ProductCard';
import Grid from '@mui/material/Grid';
import ProductInfoModal from './ProductInfoModal';
import useProductList from '@/hooks/useProductList';
import { CircularProgress } from '@mui/material';

const HomePage = () => {
    const [cart, setCart] = useState<Array<Product>>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [productList, selectedProduct, setSelectedProduct] = useProductList();

  return(
    <>
    <Grid container rowSpacing={3} columnSpacing={2}>
    {productList ? productList.map((p:Product) => 
          <Grid item>
            <ProductCard key={p.id} product={p} 
            onClickDetails={()=>{ 
            setIsModalOpen(true)
            setSelectedProduct(p)
        }} 
            onAddToCart={()=>{setCart([...cart, p])}}/>
          </Grid>
    ) : <CircularProgress />}
  </Grid>
    <ProductInfoModal testid="product-info" isOpen={isModalOpen} setIsOpen={setIsModalOpen} product={selectedProduct}/>
    </>
  )
}
export default HomePage