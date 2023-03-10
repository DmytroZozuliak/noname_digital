import {
  Button,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { GoodsResponseData } from '../../interfaces/apiInterfaces';
import { RoutePath } from '../../utils/constants/routes';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { goodsActions } from '../../store/reducers/goodsSlice';
import { modalActions } from '../../store/reducers/modalSlice';

interface LocationState {
  product: GoodsResponseData;
}

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useTypedDispatch();
  const shoppingCart = useTypedSelector((state) => state.goods.shoppingCart);
  const isLogged = useTypedSelector((state) => state.user.isLogged);

  if (!location.state) return <Navigate to={RoutePath.Goods} />;

  const { product } = location.state as LocationState;
  const amount = shoppingCart[product.id] ?? 0;

  const addToCartHandler = () => {
    if (!isLogged) {
      dispatch(modalActions.openModal());
      return;
    }
    dispatch(goodsActions.addProductToCart({ id: product.id }));
  };
  const removeFromCartHandler = () => {
    if (!isLogged) {
      dispatch(modalActions.openModal());
      return;
    }
    dispatch(goodsActions.removeProductFromCart({ id: product.id }));
  };

  return (
    <ErrorBoundary text="Something went wrong. Try to reload the page">
      <Stack
        position="relative"
        my="20px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Button startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Stack>
      <Stack mb={10} flexDirection="row">
        <ImageList sx={{ width: '50%' }} cols={2}>
          {product.images.map((item, ind) => (
            <ImageListItem key={item}>
              <img src={item} alt={product.title + ind} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <Stack sx={{ width: '50%' }}>
          <Typography variant="h2" textAlign="center">
            {product.title}
          </Typography>
          <Stack mx={5} my={3}>
            <Rating name="read-only" value={product.rating} readOnly />
            <Stack my={2}>
              <Typography variant="h5">Description:</Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack my={2}>
              <Typography variant="h5">Category:</Typography>
              <Typography variant="body1">{product.category}</Typography>
            </Stack>
            <Divider variant="middle" />

            <Stack my={2}>
              <Typography variant="h5">Brand:</Typography>
              <Typography variant="body1">{product.brand}</Typography>
            </Stack>
            <Divider variant="middle" />

            <Stack my={2} flexDirection="row" alignItems="center" gap={2}>
              <IconButton onClick={removeFromCartHandler} aria-label="remove">
                <RemoveIcon fontSize="large" />
              </IconButton>
              <Typography fontSize={25}>{amount}</Typography>
              <IconButton onClick={addToCartHandler} aria-label="add">
                <AddIcon fontSize="large" />
              </IconButton>
            </Stack>

            <Stack my={2}>
              <Typography variant="h5">Price:</Typography>
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  only this week discount - {product.discountPercentage}%
                </Typography>
                <Typography variant="body1" fontSize={25}>
                  Price: {product.price}$
                </Typography>
              </Stack>
              {amount !== 0 && (
                <Stack my={2}>
                  <Typography variant="body1" color="coral" textAlign="right" fontSize={25}>
                    Total price: {product.price * amount}$
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};

export default ProductPage;
