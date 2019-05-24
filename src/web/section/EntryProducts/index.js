import React, {Component} from 'react'
import posed from 'react-pose'

import compose from 'recompose/compose'
import lifecycle            from 'recompose/lifecycle'
import withProps            from 'recompose/withState'
import withHandlers         from 'recompose/withHandlers'
import withSpace            from 'evoke-me/space/all/withSpace'
import spaceBrand           from 'app/melody/brand/space/spaceBrand'
import spaceSku             from 'app/melody/sku/space/spaceSku'
import spaceTheme           from 'app/melody/theme/space/spaceTheme'

import {defaultProps} from 'recompose'

import styled from 'styled-components'

import {rem} from '../../mui'

import {Grid} from '@material-ui/core'

import {IconLogoRedCircle} from '../../icons'

import  {Link} from 'react-router-dom';

import ThemeProduct from '../ThemeProduct';
import SkuProduct from '../SkuProduct';
import Brands from '../Brands'
import Subscribe from '../Subscribe'
import StaticBlock from '../StaticBlock'

const enhance = compose(
  defaultProps({
  Container: styled.div`
     && {
      position: relative   
    }
  `,
  IconLogoRedCircle: styled(IconLogoRedCircle)`
    && {
      top: ${rem(66+40)};
      right: -${rem(27+40)};
      z-index: 2;
    }
  `,

  ButtonLogo: styled(Link)`
  && {
    position: absolute;
    width: ${rem(40)};
    height: ${rem(40)};
    top: ${rem(66+40)};
    left: -${rem(27+40)};
    z-index: 2;

    svg {
      width: 40px;
      height: 40px;
    }
  }
  `
  }),
  withSpace(spaceTheme),
  withSpace(spaceBrand),
  withSpace(spaceSku),
  withHandlers(({ }) => {
    return {
      mount: ({
        fromBrand, fromSku, fromTheme
      }) => () => {

        fromBrand.queryHome()
        fromSku.queryHome()
        fromTheme.queryRecommend()

      },
      
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
  }),

  withProps(({ }) => {
    return {
    }
  })
)

const EntryProducts = enhance(({Title, fromTheme, Container, fromSku, ButtonLogo, fromBrand}) => {
 
  return (
    <React.Fragment>

      <StaticBlock title="热门分类推荐（get some inspirations）">
        <ThemeProduct fromTheme={fromTheme}/>
      </StaticBlock>
    
      <StaticBlock  margintop={60} title="标题2：热门产品推荐">
        <Container>

          <ButtonLogo to="/">
            <IconLogoRedCircle/>
          </ButtonLogo>
          
          <SkuProduct fromSku={fromSku} />
          
        </Container>
      </StaticBlock>

      <StaticBlock marginbottom={80} title="标题3：我们的品牌推荐">
        <Brands fromBrand={fromBrand} />
      </StaticBlock>
    
      {/* <Title>热门分类（根据区域的</Title>

      <Grid container spacing={24}>
        {categories.map((item, key) => (
          <Grid key={key} item>
            <CategoryBanner
              backgroundUrl={item.backgroundUrl}
              title={item.title}
              description={item.description}
              fontColor={item.fontColor}
            />
          </Grid>
        ))}
      </Grid> */}

      <Grid container justify="center">
        <Grid item xs={12}>
            <Subscribe/>
        </Grid>
      </Grid>


    </React.Fragment>

  )
})

export default EntryProducts