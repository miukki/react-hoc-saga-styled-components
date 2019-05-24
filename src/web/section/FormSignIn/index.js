import React from 'react';
import {Grid, Button, FormControl, InputBase, Input} from '@material-ui/core';

import compose from 'recompose/compose'
import withHandlers         from 'recompose/withHandlers'
import lifecycle            from 'recompose/lifecycle'
import defaultProps from 'recompose/defaultProps'
import withStateHanlders from 'recompose/withStateHandlers'

import {IconEyeShow, IconEyeHide, IconPhone, IconLock} from '../../icons'
import styled from 'styled-components'
import {rem} from '../../mui'

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'

import Link from '../../block/Link'

import posed from 'react-pose'





const FormButton = styled(Button)`
  && {
    background: #ae3e38;
    color: #fff;
    border-radius: 5px;
    font-size: ${rem(18)};
    width: ${rem(100)};
    padding: 0 ${rem(40)};
    span {
      white-space: nowrap;
    }
    &.disabled {
      background: rgba(0, 0, 0, 0.12);
    }
  }
`

const enhance = compose(
  defaultProps({
    
    
    A: {
      Submit: styled(Button)`
        && { 
          background: #ae3e38;
          color: #fff;
          border-radius: 5px;
          font-size: ${rem(22)};
          margin: ${rem(15)} 0;
        }
        `,
      Container: styled(
        posed.div({
          hidden: { opacity: 0},
          visible: { opacity: 1}
        })
      )``
    },

    LinkInline: styled(Link)`
      && {
        display: inline-block;
        color: #ae3e38;
      }
      `,
    LabelInline: styled.div`
      && {
        display: inline-block;
        color: #9b9b9b;
      }
      `,
  }),
  withSpace(spaceAuth),
  withStateHanlders(
    () => ({
      isShowPassword: false,
      isShowRepeatPassword: false,
      mobileNo: '',
      pictureCode: '',
      mobileCode: '',
      password: '',
      repeatPassword: '',
      pictureCodeRepeat: '',
      readAndAgree: false,
      timeLeft: 0,
    }),
    {
      handleClickShowPassword: ({isShowPassword}) => () => ({
        isShowPassword: !isShowPassword
      }),
      handleClickShowRepeatPassword: ({isShowRepeatPassword}) => () => ({
        isShowRepeatPassword: !isShowRepeatPassword
      }),

      timeLeftSet: () => (timeLeft) => ({ timeLeft }),

      onChangePictureCode: () => event => ({
        pictureCodeRepeat: event.target.value
      }),
      onChangeMobileNo: () => event => ({
        mobileNo: event.target.value
      }),
      onChangeMobileCode: () => event => ({
        mobileCode: event.target.value
      }),
      onChangePassword: () => event => ({
        password: event.target.value
      }),
      onChangeRepeatPassword: () => event => ({
        repeatPassword: event.target.value
      }),
      onChangeReadAndAgree: ({readAndAgree}) => even => ({
        readAndAgree: !readAndAgree
      })
    }
  ),
  withHandlers(() => {
    const intervalIdList = []

    return ({
      timeLeftRefresh: ({
        timeLeft, timeLeftSet,
        fromAuth,
      }) => () => {
        if (fromAuth.messageCodeTimestamp) {
          const timeLeftNext = Math.round(60 - (Date.now() - fromAuth.messageCodeTimestamp) / 1000)
          if (timeLeftNext > 0) {
            timeLeftSet(timeLeftNext)
          } else {
            if (timeLeft > 0) {
              timeLeftSet(0)
            }
          }
        }
      },
      registerGetMessage: ({mobileNo, pictureCodeRepeat, fromAuth}) =>  () => {
        fromAuth.registerGetMessage({mobileNo, pictureCode: pictureCodeRepeat})
      },
      mount: ({
        fromAuth,
        timeLeftRefresh,
      }) => () => {
        fromAuth.registerGetCaptcha()

        intervalIdList.push(setInterval(timeLeftRefresh, 1000))
      },
      unmount: () => {
        for (let intervalId of intervalIdList) {
          clearInterval(intervalId)
        }
      },
      onSubmitPasswordSignIn: ({mobileNo, password, fromAuth}) => () => {
        fromAuth.login({mobileNo, password});
      }
    })
  }),

  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
    componentWillUnmount() {
      // if (this.props) {
      //   this.props.unmount()
      // }
    },
  }),
)

const Field = styled(InputBase)`
  && {
    color: #9b9b9b;
    font-size: ${rem(18)};
    height: auto;
    border-bottom: 1px solid #dedede;
    
    input{
      &:-webkit-autofill {
        -webkit-box-shadow: inset 0 0 0 50px #fff !important;
        -webkit-text-fill-color: #9b9b9b !important;
      }
    }
  }
`;


const FormSignIn = enhance(props => {
  const {
    fromAuth,
    mobileNo, pictureCodeRepeat, mobileCode,
    isShowPassword,
    password, repeatPassword,
    readAndAgree,
    timeLeft,
    handleClickShowPassword,
    onChangeMobileNo, onChangeMobileCode, onChangePassword, 
    onSubmit,
    A,
    isPasswordSignIn,
    onSubmitPasswordSignIn,
    isLoading,
    registerGetMessage
  } = props;

  
  return (

    <Grid container alignItems="center" direction="row" justify="center" spacing={0}>
      <Grid item xs={10} >

        <form  noValidate autoComplete="off">
          
          <A.Container pose={!isPasswordSignIn ? 'visible' : 'hidden'} style={{display: !isPasswordSignIn ? 'flex' : 'none'}}>

                <FormControl fullWidth style={{marginBottom: 15}} >
                  <Field 
                    placeholder={'请输入手机号'}
                    autoComplete="off"
                    type={'number'}
                    margin="none"
                    fullWidth
                    value={mobileNo}
                    onChange={onChangeMobileNo}
                    startAdornment={<IconPhone/>}
                  />
                </FormControl>

                <FormControl fullWidth style={{marginBottom: 15}} 
                >
                  <Field 
                    placeholder={'请输入手机验证码'}
                    autoComplete="off"
                    type={'number'}
                    margin="none"
                    fullWidth
                    value={mobileCode}
                    onChange={onChangeMobileCode}
                    startAdornment={<IconLock/>}
                    endAdornment= {<FormButton
                      className={!(mobileNo && pictureCodeRepeat) || fromAuth.messageCodeTimestamp ? 'disabled': ''}
                      disabled={!(mobileNo && pictureCodeRepeat) || !!fromAuth.messageCodeTimestamp}
                      color='primary'
                      onClick={registerGetMessage}
                    >
                      {timeLeft || '获取验证码'}
                    </FormButton>}/>
                </FormControl>

                <A.Submit onClick={onSubmit} fullWidth variant="contained" color="primary" disabled={!(mobileNo && pictureCodeRepeat) || !(password === repeatPassword) || !mobileCode || !readAndAgree }  color="primary" >确认</A.Submit>

            
          </A.Container>


          <A.Container pose={isPasswordSignIn ? 'visible' : 'hidden'} style={{display: isPasswordSignIn ? 'flex' : 'none'}} >
            <Grid container alignItems="stretch" direction="row" justify="space-between">

              <FormControl fullWidth style={{marginBottom: 15}} >
                <Field 
                  autoComplete="off"
                  type={'number'}
                  margin="none"
                  fullWidth
                  value={mobileNo}
                  onChange={onChangeMobileNo}
                  placeholder={'请输入手机号'}
                  startAdornment={<IconPhone/>}
                  />
              </FormControl>


              <FormControl fullWidth style={{marginBottom: 15}} >
                <Field 
                  placeholder={'密码'}
                  autoComplete="off"
                  type={isShowPassword ? 'text' : 'password'}
                  margin="none"
                  fullWidth
                  value={password}
                  onChange={onChangePassword}
                  startAdornment={<IconLock/>}
                  endAdornment={isShowPassword ? (<IconEyeShow onClick={handleClickShowPassword}/>) :  (<IconEyeHide onClick={handleClickShowPassword}  />)}
                />
              </FormControl>
                
              <A.Submit onClick={isPasswordSignIn ? onSubmitPasswordSignIn : () => {}} fullWidth variant="contained" color="primary" disabled={!(mobileNo && password) || isLoading}  color="primary" >登录</A.Submit>

            </Grid>
                        
          </A.Container>

        </form>



      </Grid>
    </Grid>
    )
  }
)

export default FormSignIn
