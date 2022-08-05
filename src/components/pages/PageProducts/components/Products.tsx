import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Product } from "models/Product";
import { formatAsPrice } from "utils/utils";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";
import axios from 'axios';
import API_PATHS from "constants/apiPaths";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    display: "block",
    objectFit: "contain",
    width: "50%",
    height: "50%",
    alignSelf: "center",
    cursor: "pointer"
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const history = useHistory();
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`${API_PATHS.product}/products`)
      .then(res => setProducts(res.data.map((product: Product) => ({ ...product, photo: "https://m.media-amazon.com/images/I/61PK1r9jWLL._AC_UL480_FMwebp_QL65_.jpg" }))));
  }, [])

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card} >
            <CardMedia
              onClick={() => { history.push(`/products/${product.id}`) }}
              className={classes.cardMedia}
              image={`${product.photo}`}
              title={product.title}
              component="img"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>
                {formatAsPrice(product.price)}
              </Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
