import React, {Component, Fragment} from 'react';
import {compose, withProps } from 'recompose'
import {Grid} from '@material-ui/core';
import CategoryBanner from '../CategoryBanner';

const enhance = compose(
  withProps(({ }) => {
    return {

    };
  })

)

const ThemeProduct = enhance(({ fromTheme }) => {
  const {orderMap} = fromTheme || {}

  return (
    <Grid container alignItems="center" justify="center" spacing={24}> 

    {
      orderMap && orderMap.recommend && orderMap.recommend.map((id, index) => {
        const theme = fromTheme && fromTheme.data[id];
        return (
          <Grid item xs={index === 0 || index === 1 ? 6: index === 2 ? 8 : 4} key={index}> 
            <CategoryBanner fontColor={(index === 1 || index === 2) ? '#ffffff': '#262626'}
              backgroundUrl={theme.themeCover}
              title={theme.themeTitle}
              description={theme.themeDesc}
              />
            
          </Grid>
          )
        })
    }

    </Grid>
  )}
);
export default ThemeProduct;