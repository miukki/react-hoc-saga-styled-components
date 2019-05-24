import React, {Component} from 'react'
import compose from 'recompose/compose'
import {defaultProps} from 'recompose'
import withPropsOnChange    from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'

import { withRouter } from "react-router-dom"

import styled from 'styled-components'
import {rem} from '../../mui'
import {Typography} from '@material-ui/core'


const Content = styled.div`
  flex: 1;
`

const enhance = compose(
  withRouter,
  defaultProps({
    Title: styled(Typography)`
      && {
        font-size: ${rem(18)};
        font-weight: normal;
        line-height: 1.56;
        letter-spacing: 0.8;
        color: #262626;
        text-align: center;
        margin-top: ${props => props.margintop !== undefined ? rem(props.margintop) : rem(40)};
        margin-bottom: ${props => props.marginbottom !== undefined ? rem(props.marginbottom) : rem(57)};
      }
  `,
 
  }),
  withHandlers(({ intervalList }) => {
    return ({
      moveToIndexPage: ({history}) => () => {
        history.push('/')
      },
  })}),

  withPropsOnChange(['sessionKey'], ({sessionKey, moveToIndexPage}) => {
    if (!sessionKey) {
      moveToIndexPage()
    }
  }),
)

const SectionProfile = enhance(({Title, sessionKey}) => {
 
  return (sessionKey &&
    <Content>

      <Title>轮廓 </Title>
    
      轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓 轮廓

    </Content> || null
  )
})

export default SectionProfile