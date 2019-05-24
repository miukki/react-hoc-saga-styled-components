import React, {Component} from 'react';

import compose              from 'recompose/compose'
import lifecycle            from 'recompose/lifecycle'
import withStateHandlers    from 'recompose/withStateHandlers'
import withHandlers         from 'recompose/withHandlers'
import defaultProps         from 'recompose/defaultProps'
import withState            from 'recompose/withState'

import {
  IconRuler,
  IconFactSheets,
  IconPrev,
  IconNext
} from '../../icons'

import {Link} from 'react-router-dom'

import {withStyles, ButtonBase, Grid} from '@material-ui/core';
import styled from 'styled-components'
import {rem} from 'polished'

import Carousel from '../Carousel'


const styles = () => ({});

const enhance = compose(
  withStateHandlers(
    () => ({
      choosenItem: {},
      activeId: null,
    }),
    {
      handlerClick: () => (choosenItem) => ({ choosenItem }),
      setId: () => (activeId) => ({ activeId }),
    },
  ),
  withState('slideIndex', 'setSlideIndex', 0),
  defaultProps({
    A: {
      Link: styled(Link)`
        && {
          text-decoration: none;
          color: #262626;
        }
      `,
      ImgView: styled.div`
        margin: auto;
        width: ${rem(450)};
        height: ${rem(600)};
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #fff;
        background-size: 100% auto;
        position: relative;
      `,

      ImgItem: styled.div`
        && {
          margin: ${rem(10)};
          cursor: pointer;
          display: inline-block;
          background-position: center center;
          background-repeat: no-repeat;
          background-color: #fff;
          background-size: 100% auto;
          width: ${rem(104)};
          height: ${rem(104)};
          &.active {
            box-shadow: 2px 2px 8px 1px rgba(0,0,0,0.2);
          }
          &:hover {
            box-shadow: 2px 2px 8px 1px rgba(0,0,0,0.2);
          }
        }
    `,

      Wrap: styled.div`
        position: relative
      `,
      Icon: styled.div`
        position: absolute;
        top: 10%;   
        svg {
          margin: ${rem(10)} 0;
        } 
      `,
      Slider: styled(Carousel)`
        && {
           margin: 0 auto;
           overflow: hidden;
           width: 100%;
           height: auto;
        }
      `,
      SliderControl: styled(ButtonBase)`
        && {
           padding: ${rem(10)};
        }
      `,
    },

  }),

  withHandlers(({}) => {
    return {

      setChoosenItem: ({
        spuImageList, handlerClick
      }) => () => {
        handlerClick(spuImageList[0])
      },
      setSpuImage:({handlerClick, setId}) => (spuImage) => {
        handlerClick(spuImage)
        setId(spuImage.id)
      }
    }
  }),
  withHandlers({
    prevSlide: ({ spuImageList, slideIndex, setSlideIndex, setSpuImage }) => () => {
      const newIndex = spuImageList[slideIndex - 1] ? slideIndex - 1 : spuImageList.length - 1
      if(spuImageList[newIndex] === undefined) return
      setSlideIndex(newIndex)
      setSpuImage(spuImageList[newIndex])
    },
    nextSlide: ({ spuImageList, slideIndex, setSlideIndex, setSpuImage }) => () => {
      const newIndex = spuImageList[slideIndex + 1] ? slideIndex + 1 : 0
      if(spuImageList[newIndex] === undefined) return
      setSlideIndex(newIndex)
      setSpuImage(spuImageList[newIndex])
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.setChoosenItem()
    },
  }),

)
const ProductCardView = enhance(({ A, skuName, spuImageList, choosenItem, setSpuImage, activeId, mainImageUrl, slideIndex, setSlideIndex, nextSlide, prevSlide}) => {

  console.log(spuImageList)
  return (
    <React.Fragment>
      <A.Wrap>

        <A.Icon row>
          <div><IconRuler/></div>
          <div><IconFactSheets/></div>
        </A.Icon>

        <A.ImgView alt={skuName} style={{ backgroundImage: `url(${choosenItem && choosenItem.picUrl || mainImageUrl})` }} ></A.ImgView>
      </A.Wrap>
      {console.log(slideIndex)}

      <Grid container alignItems="center">
        <Grid item>
          <A.SliderControl onClick={prevSlide}><IconPrev coloricon="#ae3e38"/></A.SliderControl>
        </Grid>
        <Grid item xs={10}>
          <A.Slider slideIndex={slideIndex} onSlideChange={setSlideIndex}>
            {spuImageList.map((spuImage, idx) =>
              <A.ImgItem
                onClick={() => {
                  setSpuImage(spuImage)
                  setSlideIndex(idx)
                }}
                className={!activeId && idx === 0 || spuImage.id === activeId ? 'active' : ''}
                key={idx} alt={spuImage.spuCode}
                style={{ backgroundImage: `url(${spuImage.picUrl})` }}/>
            )}
          </A.Slider>
        </Grid>
        <Grid item>
          <A.SliderControl onClick={nextSlide}><IconNext coloricon="#ae3e38"/></A.SliderControl>
        </Grid>
      </Grid>

    </React.Fragment>
  )}
)

export default withStyles(styles)(ProductCardView);
