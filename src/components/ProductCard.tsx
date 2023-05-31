import BaseComponentProps from '@/types/BaseComponentProps';
import Product from '@/types/Product';

import { Info, ShoppingCart } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

interface ProductCardProps extends BaseComponentProps {
  product: Product;
  onAddToCart: () => void;
  onClickDetails: () => void;
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <Card
      sx={{ height: 345, width: 300, display: 'flex', flexDirection: 'column' }}
      data-testid={`card_${props.testid}`}>
      <CardMedia
        data-testid={`product-image_${props.testid}`}
        component={'img'}
        sx={{ maxHeight: 140, width: '100%' }}
        image={props.product.image}
        title={props.product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          data-testid={`product-name_${props.testid}`}
          gutterBottom
          variant="h5"
          component="div">
          {props.product.name}
        </Typography>
        <Typography
          data-testid={`product-price_${props.testid}`}
          variant="h6"
          color="text.secondary">
          {`${props.product.price}₪`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          data-testid={`add-cart-button_${props.testid}`}
          sx={{ margin: '10px' }}
          variant="contained"
          onClick={props.onAddToCart}>
          הוסף לעגלה
          <ShoppingCart />
        </Button>
        <Button
          data-testid={`description-button_${props.testid}`}
          sx={{ margin: '10px' }}
          variant="contained"
          color="secondary"
          onClick={props.onClickDetails}>
          פרטים
          <Info />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
export type { ProductCardProps };
