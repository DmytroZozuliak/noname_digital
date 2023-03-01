import {
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
import { useMemo, useState } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import GoodsCard from '../../components/GoodsCard';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import {
  categoryGoodsStorage,
  searchGoodsStorage,
  sortGoodsStorage,
} from '../../utils/localStorageModels';
import Loader from '../../components/Loader';
import { categories } from '../../utils/constants/categories';
import { SelectSort } from '../../utils/constants/enums';

const GoodsPage = () => {
  const { goods, status } = useTypedSelector((state) => state.goods);
  const [focused, setFocused] = useState(false);

  const [search, setSearch] = useState(() => searchGoodsStorage.getItem() || '');
  const [category, setCategory] = useState(() => categoryGoodsStorage.getItem() || '');
  const [sortGoods, setSortGoods] = useState(() => sortGoodsStorage.getItem() || '');

  const debouncedSearch = useDebounceValue(search);

  const filteredDate = useMemo(() => {
    return goods
      .filter((product) => {
        const searchFiltered = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
        const searchCategory = product.category.includes(category);
        return searchFiltered && searchCategory;
      })
      .sort((a, b) => {
        if (sortGoods === SelectSort.decPrice) {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
        }

        if (sortGoods === SelectSort.incPrice) {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
        }

        if (sortGoods === SelectSort.decRating) {
          if (a.rating > b.rating) return 1;
          if (a.rating < b.rating) return -1;
        }

        if (sortGoods === SelectSort.incRating) {
          if (a.rating < b.rating) return 1;
          if (a.rating > b.rating) return -1;
        }
        return 0;
      });
  }, [category, debouncedSearch, goods, sortGoods]);

  const handleChangeCategory = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setCategory(value);
    categoryGoodsStorage.setItem(value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchGoodsStorage.setItem(value);
  };

  const handleSortGoods = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setSortGoods(value);
    sortGoodsStorage.setItem(value);
  };

  const renderList = () => {
    if (status === 'error') {
      return <Typography variant="h4">Something went wrong</Typography>;
    }
    if (status === 'loading') {
      return <Loader />;
    }

    return (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filteredDate.length > 0 ? (
          filteredDate.map((item) => <GoodsCard key={item.id} goods={item} />)
        ) : (
          <Typography m={4}>No matches</Typography>
        )}
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
        flexWrap="wrap"
        gap={3}
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
          <InputLabel id="select-rating">Sort by</InputLabel>
          <Select
            labelId="select-rating"
            value={sortGoods}
            onChange={handleSortGoods}
            label="Rating"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={SelectSort.decPrice}>Price dec</MenuItem>
            <MenuItem value={SelectSort.incPrice}>Price inc</MenuItem>
            <MenuItem value={SelectSort.decRating}>Rating dec</MenuItem>
            <MenuItem value={SelectSort.incRating}>Rating inc</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={{ xs: 2, md: 3 }} my={4}>
        {renderList()}
      </Stack>
    </ErrorBoundary>
  );
};

export default GoodsPage;
