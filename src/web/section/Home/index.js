import React, {Component, Fragment} from 'react'
import {compose, withProps, withHandlers} from 'recompose'
import lifecycle            from 'recompose/lifecycle'
import withSpace            from 'evoke-me/space/all/withSpace'
import spaceSku             from 'app/melody/sku/space/spaceSku'
import {defaultProps} from 'recompose'

import styled from 'styled-components'

import SkuProduct from '../SkuProduct'
import PictureMenu from '../PictureMenu'
import Subscribe from '../Subscribe'
import StaticBlock from '../StaticBlock'
import ExpandedMain from '../ExpandedMain'

import {rem} from 'polished'

import {Grid, ButtonBase} from '@material-ui/core'
import {IconLogoRedCircle} from '../../icons' 

import posed from 'react-pose'

const enhance = compose(
  withSpace(spaceSku),
  defaultProps({
    IconLogoRedCircle: styled(IconLogoRedCircle)`
    && {
      top: ${rem(66+40)};
      right: -${rem(27+40)};
      z-index: 2;
    }
  `,
    ButtonLogo: styled(ButtonBase)`
      && {
        position: absolute;
        width: ${rem(40)};
        height: ${rem(40)};
        top: ${rem(57)};
        left: ${rem(66)};
    
        svg {
          width: 40px;
          height: 40px;
        }
      }
      `,
  }),
  withHandlers(({ }) => {
    return {
      mount: ({
        fromSku
      }) => () => {

        fromSku.queryHome()

      },
      
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
  }),
)

const Root = styled.div`
  background-color: #fff;
  overflow: hidden;
  position: relative;
  opacity: 1;
  height: 'auto';
  display: block
`



const Home = enhance(({isExpanded, fromSku, height}) => {
  
  return (
      <Root >

        <ExpandedMain height={height}>
          <Grid item xs={10} md={10}>

            <StaticBlock title="让计落实的产品">
              <Grid container justify="center" alignItems={'center'}>
                <Grid item xs={12}>
                  <SkuProduct fromSku={fromSku} />
                </Grid>
              </Grid>
            </StaticBlock>

            <StaticBlock title="我们的设计灵感">
              <Grid container justify="center">
                <Grid item xs={12}>

                    <PictureMenu />

                </Grid>
              </Grid>
            </StaticBlock>

            <Subscribe/>

          </Grid>

        </ExpandedMain>
      </Root>
    )}
)


export default Home