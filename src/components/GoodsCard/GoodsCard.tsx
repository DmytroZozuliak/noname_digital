import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { GoodsResponseData } from '../../interfaces/apiInterfaces';
import { RoutePath } from '../../utils/constants/routes';
import { getDynamicPath } from '../../utils/functions';
import { useMemo } from 'react';
import { goodsActions } from '../../store/reducers/goodsSlice';
import { modalActions } from '../../store/reducers/modalSlice';

interface GoodsCardProps {
  goods: GoodsResponseData;
}

const GoodsCard = ({ goods }: GoodsCardProps) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const shoppingCart = useTypedSelector((state) => state.goods.shoppingCart);
  const isLogged = useTypedSelector((state) => state.user.isLogged);

  const shoppingItemCount = shoppingCart[goods.id];

  const addToCart = () => {
    // console.log('shoppingItem ', shoppingItem);
    if (!isLogged) {
      dispatch(modalActions.openModal());
      return;
    }
    dispatch(
      goodsActions.addProductToCart({
        id: goods.id,
      })
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea
          onClick={() =>
            navigate(getDynamicPath(RoutePath.Product, goods.id), { state: { product: goods } })
          }
        >
          <CardMedia component="img" height="140" image={goods.thumbnail} alt={goods.title} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {goods.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {goods.description}
          </Typography>
        </CardContent>
        <Stack
          mt="auto"
          pb={2}
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {goods.price} $
          </Typography>
          <Rating name="read-only" value={goods.rating} readOnly />

          <IconButton onClick={addToCart} aria-label="cart">
            <StyledBadge badgeContent={shoppingItemCount} color="secondary">
              <ShoppingCartIcon color="success" />
            </StyledBadge>
          </IconButton>
        </Stack>
      </Card>
    </Grid>
  );
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default GoodsCard;
