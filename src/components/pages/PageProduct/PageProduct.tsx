import { Product } from 'models/Product';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import API_PATHS from 'constants/apiPaths';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { formatAsPrice } from 'utils/utils';
import AddProductToCart from 'components/AddProductToCart/AddProductToCart';

type ProductParams = {
    id: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    image: {
        paddingTop: "24px",
    },
    title: {
        marginTop: "24px"
    },
    info: {
        marginLeft: "60px"
    },
    addToCart: {
        display: "flex",
        alignItems: "center",
        // justifyContent: "center"
    }

}));

export const PageProduct = () => {
    const { id } = useParams<ProductParams>();
    const [product, setProduct] = useState<Product>();
    const classes = useStyles()

    useEffect(() => {
        axios.get(`${API_PATHS.product}/products/${id}`)
            .then(res => setProduct(res.data));
        return () => {
            setProduct(undefined)
        }
    }, [id])

    return product ? (
        <Grid container>
            <div className={classes.root}>
                <img className={classes.image} src={product.photo} alt={product.title} />
                <div className={classes.info}>
                    <Typography gutterBottom className={classes.title} variant='h3' component={"h3"}>{product.title}</Typography>
                    <Typography gutterBottom variant='h4' component={"h4"}>{product.description}</Typography>
                    <Typography gutterBottom variant='h6' component={"h6"}>Price: {formatAsPrice(product.price)}</Typography>
                    <div className={classes.addToCart}>
                        <AddProductToCart product={product} />
                    </div>
                </div>
            </div>
        </Grid>
    ) : null
}
