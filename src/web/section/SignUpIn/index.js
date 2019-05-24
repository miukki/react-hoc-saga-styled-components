import React, { Component } from 'react';
import { withStyles, Grid, ButtonBase, Button} from '@material-ui/core';

import {IconLogoRedCircle, IconAngleBrackets} from '../../icons'
import styled from 'styled-components'
import {rem} from '../../mui'

import FormSignUp from '../FormSignUp'
import FormSignIn from '../FormSignIn'

import posed from 'react-pose'

import compose              from 'recompose/compose'
import withStateHanlders    from 'recompose/withStateHandlers'
import defaultProps from 'recompose/defaultProps'

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'

import BasePopUp from '../BasePopUp';


const enhance = compose(
  withSpace(spaceAuth),

  defaultProps({
    
    FormContainer: styled(
      posed.div({
        hidden: { opacity: 0},
        visible: { opacity: 1}
      })
    )`
          
    `,

    IconLogoRedCircle: styled(IconLogoRedCircle)`
      && {
        position: absolute;
        left: 50%;
        top: -30px;
        margin-left: -30px;
        z-index: 1000; 
      }
  `,
    ButtonLink: styled.span`
      && {
        cursor: pointer;
        display: inline-block;
        color: #AE3E38;
        font-size: inherit;
      }
    `,
    Title: styled(Grid)`
    && { 
      text-align:center;
      font-size: ${rem(24)};
      margin-bottom: ${rem(10)};
      margin-top: ${rem(15)};
    }
    `,
    Nav: styled(Grid)`
      && {
        font-size: ${rem(14)};
        text-align: right;
        padding-top: ${rem(15)};
        padding-right: ${rem(15)};
      }   
    `,

    PopUpFooter: styled.div`
      font-size: ${rem(18)};
      background-color: #eaeaea;
      border-radius: 0 0 ${rem(5)} ${rem(5)};
      color: #777777;
      letter-spacing: 1.3px;
      padding: ${rem(8)};
      font-weight: 200;
      
      a {
        color: #ae3e38;
        text-decoration: none;
      }
    `,
  }),

  withStateHanlders(
    () => ({
      isSignIn: false,
      isPasswordSignIn: true
    }),
    {
      toggleTab: ({isSignIn}) => () => ({
        isSignIn: !isSignIn
      }),
      toggleTabSingIn: ({}) => (val) => ({
        isPasswordSignIn: true
      })
    }
  ),

)

const styles = theme => ({
  root: {
  },
})

const SignUpIn = enhance(props => {
  const {
     Nav, PopUp, ButtonLink, togglePopup, Title, IconLogoRedCircle, toggleTab, FormContainer, isSignIn, toggleTabSingIn, isPasswordSignIn, PopUpFooter, fromAuth, defaultIndex, isOpenPopup, Animation
  } = props;

  return (
   
      <BasePopUp togglePopup={togglePopup} isOpenPopup={isOpenPopup} sessionKey={fromAuth.sessionKey} closeButton={false}>
        <React.Fragment>

          <IconLogoRedCircle style={{ fontSize: 60}}/>
              
                <Nav item xs={12}>
                  已有账号, <ButtonLink disableRipple={true} disableTouchRipple={true} size='small' onClick={toggleTab}>{!isSignIn ? '立即注册' : '马上登录'}</ButtonLink> | <ButtonLink disableRipple={true} disableTouchRipple={true} content='例子' size='small' onClick={togglePopup} >返回美工厂</ButtonLink> 
                </Nav>
              
              {/* SingUp */}
              <FormContainer pose={!isSignIn ? 'visible' : 'hidden'} style={{display: !isSignIn ? 'block' : 'none'}}>
                <Grid container alignItems="stretch" direction="column" justify="center" spacing={0} >
                  <Title item xs={12}>
                    欢迎来到美工场
                  </Title>
                  <Grid item xs={12}>
                    <FormSignUp/>
                  </Grid>
                </Grid>
              </FormContainer>


              {/* SingIn */}
              <FormContainer pose={isSignIn ? 'visible' : 'hidden'} style={{display: isSignIn ? 'block' : 'none'}}>
                <Grid container alignItems="stretch" direction="column" justify="center" spacing={0} >
                  <Title item xs={12}>
                    <ButtonLink disableRipple={true} disableTouchRipple={true} size='small' onClick={()=>toggleTabSingIn(false)}>验证码登录</ButtonLink> | <ButtonLink disableRipple={true} disableTouchRipple={true} size='small' onClick={()=>toggleTabSingIn(true)}>密码登录</ButtonLink>
                  </Title>
                  <Grid item xs={12}>
                    <FormSignIn isPasswordSignIn={isPasswordSignIn} />
                  </Grid>
                </Grid>
              </FormContainer>

            <PopUpFooter>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={9}>

                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={4}>
                      <a href="#">忘记密码 <IconAngleBrackets style={{width:'18px', height: '10px'}}/></a>
                    </Grid>
                    <Grid item xs={6}>
                      还没有账号？<a href="#">立即注册</a>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </PopUpFooter>

        </React.Fragment>
      </BasePopUp>

    );
  }
)

export default withStyles(styles)(SignUpIn);
