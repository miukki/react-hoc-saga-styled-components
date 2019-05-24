import React, {Component, Fragment} from 'react';
import {withStyles, Grid, Input, Typography, FormGroup} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {IconWechat, IconWeibo} from '../../icons';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {rem} from '../../mui'
import compose from 'recompose/compose'
import { defaultProps} from 'recompose'

const styles = () => ({});


const enhance = compose(
  defaultProps({
    Copy: styled.div`
      && {
        font-size: ${rem(36)};
        line-height: 1.22;
        letter-spacing: 2.8;
        text-align: center;
        color: #262626;
        margin: ${rem(20)} auto; 
      }
      `,
    Container: styled.div`
      text-align: center;
        && {
      }
      `,
    FormGroup: styled(FormGroup)`
      && {
        display: flex;
        width: 65%;
        margin: 0 auto;
        text-align: center; 
      }
      `,
    Link: styled(Link)`
      && {
        padding: 0 ${rem(5)} ;
        display: inline;
        vertical-align: middle;
        position: relative;
        top: -${rem(3)};

      }
      `,

    Input: styled(Input)`
      && {
        vertical-align: middle;
        display: inline-block;
        border: 1px solid #777;
        border-right: none;
        border-radius: ${rem(10)} 0 0 ${rem(10)};
        padding: ${rem(10)} ${rem(30)};
        font-size: ${rem(18)};
        width: 70%;

        &::placeholder {
          color: #afafaf;
        }
      
        &:focus {
          outline: none;
        }
      }
  `,
  Button: styled(Button)`
    && {
      vertical-align: middle;
      display: inline-block;
      border-radius: 0 ${rem(10)} ${rem(10)} 0;
      background-color: #777;
      color: #fff;
      font-size: ${rem(18)};
      padding: ${rem(14)} ${rem(20)};

    }
    `,
    Inline: styled.div`
      width: 100%;
      display: inline-block;
      margin: auto;
    `,

  }),

  )




const Subscribe = enhance(({Input, Button, Link, Copy, Container, FormGroup, Inline}) => {
  return (
    <Container>
        <Copy >
          订阅我们，了解更多新产品和设计想法<br/> 认识更多志同道合的人。
        </Copy>
        <FormGroup row>
          <Inline><Input disableUnderline={true} type="text" placeholder="你的邮箱…" /><Button>订阅</Button></Inline>
        </FormGroup>
        <Copy >
          你也可以关注我们，在
          <Link to="/" ><IconWechat style={{fontSize: 30}} /></Link>
          <Link to="/" ><IconWeibo style={{fontSize: 30}} /></Link>
        </Copy>
      </Container>
    );
  })



export default withStyles(styles)(Subscribe);
