import React, {Component} from 'react';

import {compose, withHandlers} from 'recompose'
import {defaultProps} from 'recompose'
import withStateHanlders    from 'recompose/withStateHandlers'
import lifecycle            from 'recompose/lifecycle'

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceSkuDetail       from 'app/melody/skuDetail/space/spaceSkuDetail'

import styled from 'styled-components'

import {Grid, FormGroup, Input, Button, ButtonBase} from '@material-ui/core'
import {rem} from 'polished'

import ProductCardView from '../ProductCardView'
import DescriptionProduct from '../DescriptionProduct'
import StaticBlock from '../StaticBlock'
import ProductCard from '../ProductCard'

import {IconMinus, IconPlus, IconPrev, IconNext} from '../../icons'

import { withRouter } from "react-router-dom"

import Carousel from '../Carousel'


const Slider = styled.div`
  position: relative;
  width: 100%;
`;

const SliderBtnPrev = styled(ButtonBase)`
  && {
    position: absolute;
    top: calc(50% - ${rem(20/2)});
    left: -${rem(20)};
  }
`;

const SliderBtnNext = styled(ButtonBase)`
  && {
    position: absolute;
    top: calc(50% - ${rem(20/2)});
    right: -${rem(20)};
  }
`;


const Separator = styled.hr`
  && {
    display: block;
    width: 100%;
    height: 1px;
    background: #979797;
    margin-top: ${props =>
    props.marginTop !== undefined ? rem(props.marginTop) : rem(50)};
      margin-bottom: ${props =>
    props.marginBottom !== undefined ? rem(props.marginBottom) : rem(50)};
      border: none;
    }
`;



const enhance = compose(
  withRouter,
  withSpace(spaceSkuDetail),
  defaultProps({

    A: {
      SubmitButton: styled(Button)`
        && { 
          background: #ae3e38;
          color: #fff;
          border-radius: 5px;
          font-size: ${rem(22)};
          margin: ${rem(30)} 0;
          padding-left: ${rem(30)};
          padding-right: ${rem(30)};

        }
      `
      ,
      IconMinus: styled(IconMinus)`
        && {
          margin: auto;
        }
      `,
      IconPlus: styled(IconPlus)`
        && {
          margin: auto;
        }
      `,
      GridInputWrap: styled.div`
        width: 40%;
        .helperText {
         font-size: ${rem(12)}; 
         color: #262626;
         white-space: nowrap;
         padding-top: ${rem(5)};
        }
      `,
      GridInput:  styled(Grid)`
      && {
        border: 1px solid #979797;
        padding: 0;
        margin: 0;
        .left {
          text-align: center;
          border-right: 1px solid #979797;
        }
        .right {
          text-align: center;
          border-left: 1px solid #979797;
        }
      }
      `,
      Input: styled(Input)`
        && {
          text-align: center;
          font-size: ${rem(14)};
          input {
            font-size: inherit;
            text-align: inherit;
          }
          &::placeholder {
            color: #4a4a4a;
          }
        }
      `,


      spuImage: styled.div`
        padding: ${rem(5)};
        overflow: hidden;
        border: 1px solid transparent;
        background-color: #fff;
        cursor: pointer;
        &.borderRadius {
          border-radius: 100%;
        }
        &.active {
          border: 1px solid #979797;
        }
        &: hover {
          border: 1px solid #979797;

        }

        .bg {

          background-color: #fff;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% auto;

          &.default {
            width: ${rem(100)};
            height: ${rem(100)};
    
          }
  
          &.circle {
            width: ${rem(46)};
            height: ${rem(46)};
          }
          
          &.square {
            width: ${rem(40)};
            height: ${rem(30)};
          }
  
        }

      `,
      BreadCrumps: styled.div`
      font-size: ${rem(16)};
      color: #777;
      margin: ${rem(10)} auto;
      .active {
        color: #4a4a4a;
      }
    `,

    FormGroup: styled(FormGroup)`
      && {
        font-size: ${rem(14)};
        color: #777;
        margin: ${rem(10)} auto;
        .bar {
          margin-top: ${rem(15)};
          padding-bottom: ${rem(10)};
        }
        &.border {
          padding-bottom: ${rem(10)};
          border-bottom: 1px solid #979797;
          margin-bottom: ${rem(20)};
        }
      }
    `,
    Separator: styled.span`
      &:after {
        padding: 0 ${rem(10)};
        content: '/'
      } 
    `, 
    Title: styled.div`
      && {
        font-size: ${rem(20)};
        color: #777;
      `,
    SubTitle: styled.span`
      && {
        font-size: ${rem(30)};
        color: #262626;
      `,
    Category: styled.span`
      && {
        font-size: ${rem(24)};
        color: #4a4a4a;
        &:before {
          content: '|';
          padding: 0 ${rem(10)};
        }
      `,
    SubCategory: styled.span`
      && {
        font-size: ${rem(18)};
        color: #9b9b9b;
      `,
    Price: styled.div`
      && {
        font-size: ${rem(22)};
        color: #4a4a4a;
      `,
    All: styled.div`
      && {
        font-size: ${rem(14)};
        color: #4a4a4a;
      `,
    Swiper: styled.div`
      position: relative;
      margin-top: ${rem(75)};
      overflow: hidden;
      height: 761px;
    `,
    SwiperCarousel: styled(Carousel)`
    && {
       box-sizing: content-box;
       margin: 0 auto;
       position: relative;
       overflow: hidden;
       width: 100%;
       height: auto;
    }
    `,
    SwiperSlide: styled.div`
      min-width: 100%;
      //margin: 0 ${rem(20)};
      cursor: pointer;
      text-align: center;
    `,
    SwiperControls: styled.div`
      position: absolute;
      width: 100%;
      left: 0;
      bottom: ${rem(30)};
      text-align: center;
      
      div {
        display: inline-block;
       
        > button {
          display: inline-block;
          width: ${rem(10)};
          height: ${rem(10)};
          border-radius: 100%;
          background-color: #e8e8e8;
          margin: ${rem(11.5)};
          border: none;
          padding: 0;
          &:hover {
            cursor: pointer;
          }
          &.active {
            background-color: #5f6775;
          }
        }
      }
    `,
    }

  }),

  withStateHanlders(
    () => ({
      slideIndex: 0,
      slides: ['http://placekitten.com/1440/890', 'http://placekitten.com/1440/891', 'http://placekitten.com/1400/893']
    }),
    {
      handleChange: ({}) => () => {},
      setSlideIndex: () => (slideIndex) => ({slideIndex}),
  }),

  
  withHandlers(() => {
    return {
      moveToOrderPage: ({history}) => () => {
        history.push('/orders')
      },
  
      mount: ({
        skuNo,
        fromSkuDetail,
      }) => () => {
        fromSkuDetail.queryBySkuNo({ skuNo: `SKU`+skuNo })
     },
      
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.mount()
      
    },
  }),
 );

const SectionProductView = enhance(({ A, currency = '¥', fromSkuDetail, skuNo, moveToOrderPage, slides, slideIndex, setSlideIndex }) => {
  const skuDetail = fromSkuDetail && fromSkuDetail.data && fromSkuDetail.data['skuDetail' + skuNo];
  const { skuName, sellableNum, salePrice, listPrice, spuAttrList, skuRecommendList } = skuDetail || {}

  return (
    skuDetail ?
      <React.Fragment>
        <Grid container justify="flex-start" alignItems="flex-start" spacing={40}>
          <Grid item xs={6}>

            <A.BreadCrumps>
              所有产品<A.Separator/>私宅<A.Separator/>私宅<A.Separator/><span
              className={'active'}>{skuName}({sellableNum})</span>
            </A.BreadCrumps>

            <ProductCardView {...skuDetail}  />


          </Grid>

          <Grid item xs={6}>

            <A.Title>{skuName}({sellableNum})</A.Title>
            <A.SubTitle>Nestrest</A.SubTitle><A.Category>Hanging Lounger</A.Category>

            <A.FormGroup className={'border'} row>
              <A.Price>{currency} {salePrice}-{listPrice}</A.Price>
            </A.FormGroup>


            {spuAttrList.map((item, index) => (

              <A.FormGroup row key={index}>

                <Grid container justify="space-between" alignItems="center" className={'bar'}>
                  <Grid item>{item.attrName}: {item.spuCode}</Grid>
                  <Grid item><A.All>全部</A.All></Grid>
                </Grid>

                {Array.isArray(item.attrValList) && item.attrValList.map((spuImage, idx) =>
                  <A.spuImage key={idx} alt={spuImage.attrValCode + ': ' + spuImage.attrValName}>
                    {spuImage.imageUrl ? 
                      <div className={'bg square '} style={{ backgroundImage: `url(${spuImage.imageUrl})` }}/> : 
                      spuImage.attrValName || 'attrValName empty'
                    }
                  </A.spuImage>)}
              </A.FormGroup>

            ))}

            <A.FormGroup style={{ marginTop: '30px' }}>
              <A.GridInputWrap>
                <A.GridInput container justify="space-between" alignItems="center" spacing={0}>
                  <Grid item className={'left'} xs>
                    <A.IconMinus style={{ fontSize: 10, color: '#c0c0c0' }}/>
                  </Grid>
                  <Grid item xs>
                    <A.Input
                      disableUnderline={true}
                      type="text"
                      placeholder="1"
                      label="Helper text"
                      defaultValue="1"
                      margin="none"
                    />
                  </Grid>
                  <Grid item className={'right'} xs>
                    <A.IconPlus style={{ fontSize: 10, color: '#c0c0c0' }}/>
                  </Grid>
                </A.GridInput>
                <div className={'helperText'}>预计10周（6月18日）左右到达，详情请咨询客服。</div>
              </A.GridInputWrap>
            </A.FormGroup>

            <A.SubmitButton onClick={moveToOrderPage} variant="contained" color="primary">加入购物车</A.SubmitButton>
            <A.SubmitButton onClick={moveToOrderPage} variant="contained" color="primary"
                            style={{ marginLeft: '1rem' }}>直接购买</A.SubmitButton>

          </Grid>

        </Grid>


        <StaticBlock title="更多介绍">
          <Grid container justify="flex-start" alignItems="flex-start" spacing={0}>

            <DescriptionProduct {...skuDetail}  />

          </Grid>
        </StaticBlock>

        <A.Swiper>

          <A.SwiperCarousel slideIndex={slideIndex} onSlideChange={setSlideIndex}>
            {slides
              .map((img, key) => (
                <A.SwiperSlide key={key}>
                  <img src={img}/>
                </A.SwiperSlide>
              ))}
          </A.SwiperCarousel>

          <A.SwiperControls>
            <div>
              {slides.map((img, key) =>
                <button key={key} onClick={e => setSlideIndex(key)} className={slideIndex===key ? 'active' : ''}/>
              )}
            </div>
          </A.SwiperControls>

        </A.Swiper>


        <StaticBlock title="搭配产品推荐">
            <Grid container justify="flex-start" alignItems="flex-start" spacing={0}>

              {Array.isArray(skuRecommendList) && skuRecommendList.length ?  <Slider>
                <Grid container spacing={0}>
                  {skuRecommendList.map((sku, key) => {
                    return (
                      <Grid item key={key}>
                        <ProductCard id={sku.id} imageUrl={sku.imageUrl} name={sku.skuName} priceMin={sku.salePrice} priceMax={sku.listPrice}/>
                      </Grid>
                    )
                  }) }
                </Grid>

                <SliderBtnPrev><IconPrev coloricon={'#262626'} style={{ fontSize: 15 }}/></SliderBtnPrev>
                <SliderBtnNext><IconNext coloricon={'#262626'} style={{ fontSize: 15 }}/></SliderBtnNext>
              </Slider> : <span>Recommended List is empty..</span> }


            </Grid>
          </StaticBlock>

        <br/><br/>

      </React.Fragment> : null

  )
});

export default SectionProductView;
