import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import Product from '@/types/Product';
import {ShoppingCart, Info} from "@mui/icons-material"

interface ProductCardProps {
    product: Product
    onAddToCart: any
    onClickDetails: any
}

const ProductCard = (props: ProductCardProps) => {
  return (
     <Card sx={{ height: 345, width: 300, display: "flex", flexDirection: "column"}}>
     <CardMedia
     component={"img"}
       sx={{ maxHeight: 140, width: '100%' }}
       image={props.product.image}
       title={props.product.name}
     />
     <CardContent sx={{flexGrow: 1}}>
       <Typography gutterBottom variant="h5" component="div">
         {props.product.name}
       </Typography>
       <Typography variant="h6" color="text.secondary">
       {`${props.product.price}₪`}
       </Typography>
     </CardContent>
     <CardActions sx={{justifyContent:'space-between'}}>
        <Button  sx={{ margin: '10px', }} variant='contained' onClick={props.onAddToCart}>הוסף לעגלה<ShoppingCart/></Button>
        <Button sx={{ margin: '10px', }} variant='contained' color='secondary' onClick={props.onClickDetails}>פרטים<Info/></Button>

     </CardActions>
   </Card>
  )
}

export default ProductCard
export type {ProductCardProps}
