import React, {Component} from 'react';
import {Grid} from '@material-ui/core'
import {IconLogoRedCircleFooter} from '../../icons'
import {rem} from 'polished'
import styled from 'styled-components'
import {compose, withProps, } from 'recompose'
import defaultProps         from 'recompose/defaultProps'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {},
});


const enhance = compose(
  defaultProps({
    Link: styled(Link)`
     && {
      display: block;
      margin: ${rem(5)} auto; 
     }
    `
  }),
  withProps(({  }) => {
    return {
    };
  })
)

const Block = styled(({ ...other }) => (
  <Grid {...other} />
))`
&& {
  padding: ${rem(60)} ${rem(115)};
  font-size: ${rem(14)};
  background: #262626;
  a {
    color: #fff;
    text-decoration: none;
  }
}`;

const Root = styled.div`
`


const BaseFooter = enhance(({Link}) => {
  return (
   <Root>

      <Block container alignItems="center" direction="row" justify="space-between">
        <Grid item xs={6}>
        {['联系我们', '我们的展厅', '子品牌', '订阅和关注', '电商平台'].map((title,i) => 
            (<Link key={i} to="/">{title}</Link>)
          )}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}} >
          <IconLogoRedCircleFooter style={{ fontSize: 65, marginBottom: '2rem' }} />
          <div>@2018 POWERED BY&nbsp;Melody</div>

        </Grid>
      </Block>

   </Root>


  
  )}
);


export default BaseFooter;
