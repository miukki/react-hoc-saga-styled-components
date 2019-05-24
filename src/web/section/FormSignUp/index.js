import React, { Component } from 'react';
import { Grid, Button, FormControl, InputLabel, Input, InputBase, FormHelperText} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

import compose from 'recompose/compose'
import withHandlers         from 'recompose/withHandlers'
import lifecycle            from 'recompose/lifecycle'
import defaultProps from 'recompose/defaultProps'
import withStateHandlers from 'recompose/withStateHandlers'

import {
  IconEyeShow,
  IconEyeHide,
  IconPhone,
  IconLock,
  IconCode,
  IconError
} from '../../icons'
import styled from 'styled-components'
import {rem} from '../../mui'

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'
import {Link} from 'react-router-dom'

const Code = styled.div` {
  && {
    margin-top: -5px; 
    margin-left: 10px;
    img{
      width: ${rem(80)};
      height: auto;
    }
  }
}
`



const TickButton =  styled(Button)`
  && {
    background: #ae3e38;
    color: #fff;
    border-radius: ${rem(5)};
    font-size: ${rem(18)};
    top: -4px;
    position: relative;
    margin-left: 10px;
    min-height: auto;
    line-height: 1;
    padding: 0 ${rem(5)};
    height: ${rem(32)};
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
          border-radius: ${rem(5)};
          font-size: ${rem(22)};
          margin-bottom: ${rem(15)};
        }
        `
        ,
      FormControlLabel: styled(FormControlLabel)`
        && {
          font-size: ${rem(18)};
          span {
            font-size: inherit;

          }
        }
      `,

      Link: styled(Link)`
      && {
        display: inline-block;
        color: #ae3e38;
        font-size: inherit;
      }
      `,
      LabelInline: styled.div`
      && {
        display: inline-block;
        color: #9b9b9b;
        font-size: inherit;
      }
      `,
    },

  }),
  withSpace(spaceAuth),
  withStateHandlers(
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
      intervalIdList: []
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
      onSubmit: ({mobileCode, mobileNo, password, readAndAgree, fromAuth}) => () => {
        fromAuth.registerPassword({mobileCode, mobileNo, password, readAndAgree: readAndAgree ? 1 : 0});
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
    border-bottom: 1px solid ${props => props.error ? '#ae3e38;' : '#dedede'};
    padding: ${rem(3)} 0;

    input{
      &:-webkit-autofill {
        -webkit-box-shadow: inset 0 0 0 50px #fff !important;
        -webkit-text-fill-color: #9b9b9b !important;
      }
    }

  }
`;

const FieldHelper = styled(FormHelperText)`
  && {
    color: #ae3e38;
    padding-left: ${rem(26)};
    font-size: ${rem(16)};
    display: inline-flex;
    align-items: center;
  }
`;

const FieldHelperAdornment = styled(FormHelperText)`
  && {
    color: #ae3e38;
    font-size: ${rem(14)};
    display: inline-flex;
    align-items: center;
    min-width: ${rem(130)};
    justify-content: flex-end;
  }
`;

const FormSignUp = enhance(props => {
  const {
    fromAuth,
    mobileNo, pictureCodeRepeat, mobileCode,
    isShowPassword, isShowRepeatPassword,
    password, repeatPassword,
    readAndAgree,
    timeLeft,
    handleClickShowPassword, handleClickShowRepeatPassword,
    onChangeMobileNo, onChangeMobileCode, onChangePassword, onChangePictureCode, onChangeReadAndAgree,
    onSubmit, onChangeRepeatPassword,
    isLoading,
    registerGetMessage,
    A
  } = props;

  
  return (

    <Grid container alignItems="center" direction="row" justify="center" spacing={0}>
      <Grid item xs={10} >

        <form  noValidate autoComplete="off">

        <FormControl fullWidth style={{marginBottom: 15}} >
                <Field placeholder={'请输入手机号'}  
                  autoComplete="off"
                  type={'number'}
                  margin="none"
                  fullWidth
                  value={mobileNo}
                  onChange={onChangeMobileNo}
                  startAdornment={<IconPhone/>}
                  // endAdornment={<FieldHelperAdornment>欢迎来到 &nbsp;<IconError style={{width: '0.7em'}}/></FieldHelperAdornment>}
                  
                  /> 
                  {/* <FieldHelper>欢迎来到 &nbsp;<IconError style={{width: '0.85em'}}/></FieldHelper>               */}
                  </FormControl>
    
                  <FormGroup  row >
                    <FormControl  style={{marginBottom: 15, width: '70%'}} >
                      <Field placeholder={'请输入右边图片验证码'} 
                        autoComplete="off"
                        type={'number'}
                        margin="none"
                        fullWidth
                        value={pictureCodeRepeat}
                        onChange={onChangePictureCode}
                        startAdornment={<IconCode/>}
                      />
                    </FormControl>
                    {fromAuth.pictureCode && <Code><img src={'//api.melodycity.cn/v1/'+fromAuth.pictureCode} alt={' '} /></Code>}
    
                  </FormGroup>
    
    
                  <FormGroup  row >
                    <FormControl fullWidth style={{marginBottom: 15, width: '70%'}} >
                      <Field placeholder={'请输入手机验证码'}
                        autoComplete="off"
                        type={'number'}
                        margin="none"
                        fullWidth
                        value={mobileCode}
                        onChange={onChangeMobileCode}
                        startAdornment={<IconCode/>}
                      />
                    </FormControl>      
                <TickButton
                  className={!(mobileNo && pictureCodeRepeat) || fromAuth.messageCodeTimestamp ? 'disabled': ''}
                  disabled={!(mobileNo && pictureCodeRepeat) || !!fromAuth.messageCodeTimestamp}
                  color='primary'
                  onClick={registerGetMessage}
                >
                  {timeLeft || '获取验证码'}
                </TickButton>

              </FormGroup>


              <FormControl fullWidth style={{marginBottom: 15}} >
                <Field placeholder={'请输入6-12位数字或字母字符组合'}
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
            
              <FormControl fullWidth style={{marginBottom: 15}} >
                <Field placeholder={'确认新密码'} autoComplete="off" type={isShowRepeatPassword ? 'text' : 'password'}
                  margin="none" fullWidth value={repeatPassword} onChange={onChangeRepeatPassword}
                  startAdornment={<IconLock/>}
                  endAdornment={isShowRepeatPassword ? (<IconEyeShow onClick={handleClickShowRepeatPassword} />) :  (<IconEyeHide onClick={handleClickShowRepeatPassword} />)}
                />           
              </FormControl>

              <FormGroup row>
                <A.FormControlLabel style={{marginBottom: 15}} control={
                    <Checkbox
                      className={'checkbox'}
                      checked={readAndAgree}
                      onChange={onChangeReadAndAgree}
                      value={''}
                      color={'primary'}
                      disabled={false}
                    />

                  }
                  
                  label={<React.Fragment><A.LabelInline onClick={onChangeReadAndAgree}>我已阅读并接受用</A.LabelInline> <A.Link to="/agreement" size='small'>户协议</A.Link></React.Fragment>}
                  />
              </FormGroup>

              <A.Submit onClick={onSubmit} fullWidth variant="contained" color="primary" disabled={!(mobileNo && pictureCodeRepeat) || !(password === repeatPassword) || !mobileCode || !readAndAgree || isLoading }  color="primary" >确认</A.Submit>


        </form>



      </Grid>
    </Grid>
    )
  }
)

export default FormSignUp
