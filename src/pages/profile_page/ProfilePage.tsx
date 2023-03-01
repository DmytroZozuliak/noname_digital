import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import ShoppingCartItem from '../../components/ShoppingCartItem/ShoppingCartItem';
import { useTypedSelector } from '../../hooks/redux';
import { RoutePath } from '../../utils/constants/routes';

const Profile = () => {
  const email = useTypedSelector((state) => state.user.email);
  const goods = useTypedSelector((state) => state.goods.goods);
  const cart = useTypedSelector((state) => state.goods.shoppingCart);

  const cartArray = Object.entries(cart);
  const cartIDArray = Object.keys(cart);
  const productsInCart = goods.filter((el) => cartIDArray.includes(el.id.toString()));

  const amountTotal = productsInCart.reduce((accum, current) => {
    accum += current.price * cart[current.id];
    return accum;
  }, 0);

  console.log('amountTotal', amountTotal);

  return (
    <ErrorBoundary text="Something went wrong. Try to reload the page">
      <Stack my="20px">
        <Typography variant="h2" align="center" fontSize={{ xs: 26, md: 34 }}>
          You entered as {email}
        </Typography>
        <Stack>
          <Typography variant="h4" my={5}>
            Shopping cart:
          </Typography>
          {amountTotal !== 0 ? (
            <>
              <Typography>Your shopping cart:</Typography>
              {cartArray.map(([id, amount]) => (
                <ShoppingCartItem key={id} id={+id} amount={amount} />
              ))}
              {amountTotal !== 0 && (
                <Stack my={3} ml="auto">
                  <Typography color="coral">Total price: {amountTotal} $</Typography>
                </Stack>
              )}
            </>
          ) : (
            <Stack direction="row">
              <Typography mr={2}>Shopping cart is empty. Get some orders!</Typography>
              <Link to={RoutePath.Goods}>
                <Typography color="primary" mr={3}>
                  to goods
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};

export default Profile;
