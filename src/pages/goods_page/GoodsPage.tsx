import {
  Avatar,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import ErrorBoundary from '../../components/ErrorBoundary';
import GoodsCard from '../../components/GoodsCard';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { fetchGoods, goodsActions } from '../../store/reducers/goodsSlice';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import { searchGoodsStorage } from '../../utils/localStorageModels';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../utils/constants/categories';
import { SelectSort } from '../../utils/constants/enums';

const GoodsPage = () => {
  const userPhoto = useTypedSelector((state) => state.user.userPhoto);

  const { goods, status, isFetched } = useTypedSelector((state) => state.goods);
  const dispatch = useTypedDispatch();
  const [search, setSearch] = useState(() => searchGoodsStorage.getItem() || '');
  const [focused, setFocused] = useState(false);
  const debouncedSearch = useDebounceValue(search);

  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const filteredDate = useMemo(() => {
    return goods
      .filter((product) => {
        const searchFiltered = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
        const searchCategory = product.category.includes(category);
        return searchFiltered && searchCategory;
        //
      })
      .sort((a, b) => {
        if (price === SelectSort.dec) {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
        }
        if (price === SelectSort.inc) {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
        }
        return 0;
      })
      .sort((a, b) => {
        if (rating === SelectSort.dec) {
          if (a.rating > b.rating) return 1;
          if (a.rating < b.rating) return -1;
        }
        if (rating === SelectSort.inc) {
          if (a.rating < b.rating) return 1;
          if (a.rating > b.rating) return -1;
        }
        return 0;
      });
  }, [category, debouncedSearch, goods, price, rating]);

  const handleChangeCategory = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchGoodsStorage.setItem(value);
  };
  const handleChangePrice = (e: SelectChangeEvent) => {
    setPrice(e.target.value);
  };
  const handleChangeRating = (e: SelectChangeEvent) => {
    setRating(e.target.value);
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchGoods());
      dispatch(goodsActions.isFetched(true));
    }
  }, [dispatch, isFetched]);

  const renderList = () => {
    if (status === 'error') {
      return <Typography variant="h4">Something went wrong</Typography>;
    }
    if (status === 'loading') {
      return <Loader />;
    }

    return (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filteredDate.map((item) => (
          <GoodsCard key={item.id} goods={item} />
        ))}
      </Grid>
    );
  };

  return (
    <ErrorBoundary text="Something went wrong. Try to reload the page">
      <Stack
        position="relative"
        my="20px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
          sx={{ fontSize: 24 }}
          placeholder="find goods"
          value={search}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          startAdornment={<SearchIcon fontSize="medium" color={focused ? 'primary' : 'inherit'} />}
        />

        <FormControl variant="standard" sx={{ minWidth: 170 }}>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            value={category}
            onChange={handleChangeCategory}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel id="select-price">Price</InputLabel>
          <Select labelId="select-price" value={price} onChange={handleChangePrice} label="Price">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={SelectSort.inc}>From high to low</MenuItem>
            <MenuItem value={SelectSort.dec}>From low to high</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel id="select-rating">Rating</InputLabel>
          <Select
            labelId="select-rating"
            value={rating}
            onChange={handleChangeRating}
            label="Rating"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={SelectSort.inc}>From high to low</MenuItem>
            <MenuItem value={SelectSort.dec}>From low to high</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={{ xs: 2, md: 3 }} my={4}>
        {userPhoto && (
          <Avatar imgProps={{ referrerPolicy: 'no-referrer' }} alt="logo" src={userPhoto} />
        )}
        {renderList()}
      </Stack>
    </ErrorBoundary>
  );
};

export default GoodsPage;
