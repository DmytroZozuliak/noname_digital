import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTypedDispatch } from '../../hooks/redux';
import { NewsResponse } from '../../interfaces/apiInterfaces';
import { deleteNews } from '../../store/reducers/newsSlice';

interface NewsCardProps {
  news: NewsResponse;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const dispatch = useTypedDispatch();

  const deleteHandler = () => {
    dispatch(deleteNews(news.id));
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {news.id}. {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="warning" onClick={deleteHandler}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
