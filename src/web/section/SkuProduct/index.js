import React, {Component, Fragment} from 'react';
import {compose, withProps } from 'recompose'

import {Grid} from '@material-ui/core';
import ProductCard from '../ProductCard'

const enhance = compose(
  withProps(({ }) => {
    return {

    };
  })

)

const SkuProduct = enhance(({ fromSku, persistName='home' }) => {
  const {orderMap} = fromSku || {}
  return (
   
    <Grid container justify="flex-start" spacing={40}>
    
    {
      orderMap && orderMap[persistName] && orderMap[persistName].map((id, index) => {
        const sku = fromSku && fromSku.data && fromSku.data[id]
        return (
         
          <Grid key={index} item md={3} sm={3} xs={3}>
            {sku && <ProductCard isStoreList={true} key={index} id={sku.id} imageUrl={sku.mainImageUrl} name={sku.skuName} priceMin={sku.salePrice} priceMax={sku.price} />}
          </Grid>
  
          
          )
        })
    }

    </Grid>

    
  )}
);
export default SkuProduct;