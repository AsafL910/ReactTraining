import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Product from '@/types/Product';
import BaseComponentProps from '@/types/BaseComponentProps';

interface ProductInfoModalProps extends BaseComponentProps {
    product?: Product
    isOpen: boolean
    setIsOpen: (b: boolean) => void
}

const ProductInfoModal = (props : ProductInfoModalProps) => {
    const handleClose = () => {
        props.setIsOpen(false);
      };
  return (
    <Dialog
    open={props.isOpen}
    onClose={handleClose}
  >
    <DialogTitle>
        {props.product?.name}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {props.product?.description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose}>
        הוסף לעגלה
      </Button>
      <Button onClick={handleClose} autoFocus>
        סגור
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default ProductInfoModal