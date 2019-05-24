import React, {Component} from 'react';

import compose              from 'recompose/compose'
import defaultProps         from 'recompose/defaultProps'

import {Grid} from '@material-ui/core';
import styled from 'styled-components'
import {rem} from 'polished'


const enhance = compose(

  defaultProps({
    A: {
      ImgView: styled.img`
        width: auto;
        margin-right: ${rem(40)}
        height: ${rem(280)};
      `,
      Description: styled.p`
        font-size: ${rem(14)}; 
        color: #9b9b9b;
      `,
      Title: styled.p`
      font-size: ${rem(18)};
      color: #9b9b9b;
      `, 
      Container: styled.div`
      && {
       display:flex;
       flex-direction:row;
       justify-content:space-between;
      }
      
     
     `
      },

  })


)
const DescriptionProduct = enhance(({ A, mainImageUrl}) => {
  
  return (
    <React.Fragment>

      <A.Container>
        <A.ImgView src={mainImageUrl} alt="" />
        <div>
          <A.Title>简介：Nestrest</A.Title>
          <A.Description>
            Thanks to its innovative, organic structure and the cocoon-like sense of 
      protection it affords, the NESTREST lounger has established itself as icon 
      of contemporary design. Laden with cushions, its interior is supremely 
      comfort- able, breathable and private, the special  ber weave allowing 
      those inside to see out while preventing those outside from looking in.
          </A.Description>        
        </div>
      </A.Container>


    </React.Fragment>    
  )}
)

export default DescriptionProduct;
