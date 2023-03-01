import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Divider, Stack, Typography } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { goodsActions } from '../../store/reducers/goodsSlice';
import { getSubstring } from '../../utils/functions';

interface ShoppingCartItemProps {
  id: number;
  amount: number;
}

const ShoppingCartItem = ({ id, amount }: ShoppingCartItemProps) => {
  const goods = useTypedSelector((state) => state.goods.goods);
  const dispatch = useTypedDispatch();
  const product = goods.find((el) => el.id === id);

  if (!product) return null;

  const addToCartHandler = () => {
    dispatch(goodsActions.addProductToCart({ id }));
  };
  const removeFromCartHandler = () => {
    dispatch(goodsActions.removeProductFromCart({ id }));
  };

  if (amount === 0) return null;

  return (
    <>
      <Stack
        my={3}
        direction={{ sm: 'row', xs: 'column' }}
        alignItems="center"
        display="flex"
        columnGap={4}
      >
        <Stack direction="row" gap={3} alignItems="center">
          <img src={product.thumbnail} width={70} height={70} alt={product.title} loading="lazy" />
          <Stack width={200}>
            <Typography>{product.title}</Typography>
            <Typography>{product.brand}</Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          sx={{ flex: 1 }}
        >
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <RemoveIcon onClick={removeFromCartHandler} fontSize="large" />
            <Typography fontSize={25}>{amount}</Typography>
            <AddIcon onClick={addToCartHandler} fontSize="large" />
          </Stack>
          <Stack width={220} display={{ md: 'block', xs: 'none' }}>
            <Typography>{getSubstring(product.description)}</Typography>
          </Stack>
          <Stack ml="auto" justifySelf="end">
            {amount * product.price} $
          </Stack>
        </Stack>
      </Stack>
      <Divider variant="middle" />
    </>
  );
};

export default ShoppingCartItem;
