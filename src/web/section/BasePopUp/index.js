import React, {Component} from 'react';
import {withStyles, Grid, ButtonBase, Button} from '@material-ui/core';

import styled from 'styled-components'
import {rem} from '../../mui'

import Dimmer from '../Dimmer'

import posed from 'react-pose'

import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'

import {IconClose} from '../../icons'

const enhance = compose(
  defaultProps({
    A: {
      Animation: styled(
        posed.div({
          hide: { 
            opacity: 0,
            zIndex: 0,
            staggerChildren: 100,
          },
          show: { 
            opacity: 1,
            zIndex: 1000,
            staggerChildren: 100,
          },
      
        })
      )`
        width: 100vw;
        height: 100vh;
        opacity: 0;
        z-index: 0;
        position: fixed;
        top:0;
        left:0;
        display: flex;
      `,

    PopUp: styled.div`
      font-size: ${rem(15)};
      background: #fff;
      border-radius: 5px;
      position: relative;
      color: #777;
      z-index: 1000;
    `,

    Header: styled.div`
      display: flex;
      justify-content: flex-end;
      padding: ${rem(10)};
    `,

  }

  }),
)

const BasePopUp = enhance(({
  children,
  isOpenPopup,
  togglePopup,
  sessionKey,
  A,
  closeButton,
  component
}) => {
  
    return (

      <A.Animation pose={isOpenPopup ? 'show' : 'hide'} style={{display: isOpenPopup ? 'flex' : 'none'}}>
        <Dimmer togglePopup={togglePopup} isOpenPopup={isOpenPopup} sessionKey={sessionKey} >
          <A.PopUp>
            <React.Fragment>

              {closeButton ? <A.Header>
                <IconClose onClick={togglePopup} coloricon="#818181" style={{width: rem(10), height: rem(10)}}/>
              </A.Header> : null}

              {children}

            </React.Fragment>
          </A.PopUp>
        </Dimmer>
      </A.Animation>

    );
  }
)

export default BasePopUp;
