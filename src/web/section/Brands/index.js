import React, {Component, Fragment} from 'react';
import {compose, withProps } from 'recompose'
import {Grid, ButtonBase} from '@material-ui/core';
import styled from 'styled-components'
import {rem} from '../../mui'

const enhance = compose(
  withProps(({ }) => {
    return {

    };
  })

)

const BrandItem = styled(Grid)`
  && {
    text-align: center;
    margin-bottom: ${rem(40)};
    height: ${rem(110)};
    overflow: hidden;
    display: flex;
    
    > button {
      max-width: 100%;
      width: 100%;

      > img {
        max-width: 100%;
        width: 100%;
        height: auto;
      }
    }
  }
`


const Brands = enhance(({ fromBrand }) => {
  const {orderMap} = fromBrand || {}

  return (
    <Grid container justify="center" alignItems="center" spacing={16}>
      {orderMap && orderMap.home && orderMap.home.map((id, index) => {
        const brand = fromBrand && fromBrand.data[id];

        return (
          <BrandItem key={index} xs={6} md={2} item>
            <ButtonBase><img src={brand.brandLogo} alt={brand.brandName} /></ButtonBase>
          </BrandItem>
          )
        }
        )}
    </Grid>
  )}
);
export default Brands;