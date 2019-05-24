import React, { Component } from 'react';
import { withStyles} from '@material-ui/core';
import withPropsOnChange    from 'recompose/withPropsOnChange'

import compose from 'recompose/compose'

import defaultProps from 'recompose/defaultProps'
import styled from 'styled-components'
import {rem} from '../../mui'

import withHandlers  from 'recompose/withHandlers'
import withStateHanlders  from 'recompose/withHandlers'


const enhance = compose(

  withStateHanlders(
    () => ({
    }),
    {
    }
  ),

  withHandlers({
  }),

  defaultProps({
    FlexContainer: styled.div`
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props => props.background ? props.background  : 'rgba(0,0,0,0.3)'};
      z-index: 1000;
    `,
    Container: styled.div`
      position: relative;
      z-index: 1;
      font-size: ${rem(15)};
      background: #ffffff;
      border-radius: 5px;
      color: #777777;
      width: 50vw;
      max-width: ${rem(530)};
      min-width: ${rem(530)};
      z-index: 1000;

    `,

   FlexItem: styled.div`
     margin: auto;
     position: relative;
     z-index: 1000;

    `,
  }),

  withPropsOnChange(['sessionKey'], ({sessionKey, togglePopup, isOpenPopup}) => {
    if (sessionKey && isOpenPopup) {
      togglePopup()
    }
  }),

)


const styles = theme => ({
  root: {
  },
});

const Dimmer = enhance(({Container, FlexItem, children, FlexContainer, togglePopup}) => {
  return (
    <FlexContainer background={'none'}>
        <FlexContainer onClick={togglePopup} />
        <FlexItem>
          <Container onClick={(e)=> e.preventDefault()}>
            {children}          
          </Container>
        </FlexItem>
    </FlexContainer>    
    )
  }
)

export default withStyles(styles)(Dimmer);
