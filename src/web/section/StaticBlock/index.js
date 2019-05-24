import React, {Component, Fragment} from 'react';
import {compose, defaultProps } from 'recompose'
import {Typography} from '@material-ui/core';
import styled from 'styled-components'
import {rem} from '../../mui'

const enhance = compose(
  defaultProps({
    A: {
      Title: styled(Typography)`
      && {
        font-size: ${rem(18)};
        font-weight: normal;
        line-height: 1.56;
        letter-spacing: 0.8;
        color: #262626;
        text-align: center;
        margin-top: ${props => props.margintop !== undefined ? rem(props.margintop) : rem(40)};
        margin-bottom: ${props => props.marginbottom !== undefined ? rem(props.marginbottom) : rem(40)};
      }
    `,
    }
 


  })

)

const StaticBlock = enhance(({ margintop, marginbottom, title, children, A }) => {

  return (
    <React.Fragment>
      <A.Title marginbottom={marginbottom} margintop={margintop}>{title}</A.Title>
      {children}
    </React.Fragment>
  )}
);
export default StaticBlock;