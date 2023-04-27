import BaseComponentProps from "@/types/BaseComponentProps";
import Product from "@/types/Product";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ProductInfoModalProps extends BaseComponentProps {
  product?: Product;
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  addToCart: (product: Product) => void;
}

const ProductInfoModal = (props: ProductInfoModalProps) => {
  const handleClose = () => {
    props.setIsOpen(false);
  };
  return (
    <Dialog open={props.isOpen} onClose={handleClose}>
      <DialogTitle>{props.product?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.product?.description}</DialogContentText>
        <DialogContentText>מחיר: {props.product?.price}₪</DialogContentText>
        <img src={props.product?.image} style={{maxWidth: 300, maxHeight: 400}}/>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            if (props.product) {
              props.addToCart(props.product);
            }
            handleClose();
          }}
        >
          הוסף לעגלה
        </Button>
        <Button onClick={handleClose} autoFocus>
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductInfoModal;
