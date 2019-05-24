import React, {Component} from 'react'
import posed from 'react-pose'
import compose from 'recompose/compose'
import {defaultProps, setPropTypes} from 'recompose'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import {ButtonBase} from '@material-ui/core'


const Root = styled(ButtonBase)`
  && {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    height: 350px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    width: 100%;
  }
`


const Title = styled.div`
  position: absolute;
  top: 22px;
  left: 30px;
  font-size: 30px;

  line-height: 1.2;
  letter-spacing: 1px;
  text-align: left;
  color: ${props => props.fontColor};
  width: 70%;
`


const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.57;
  letter-spacing: 1.1px;
  margin-top: 10px;
`

const enhance = compose(
  setPropTypes({
  }),
  defaultProps({
    defaultColor: '#262626'
  })
)

const CategoryBanner = enhance(({
  backgroundUrl, title, description, fontColor, defaultColor
}) => {
  return (
    <Root style={{ backgroundImage: 'url(' + backgroundUrl + ')' }} >
      <Title fontColor={fontColor || defaultColor}>
        {title}
        <Description>{description}</Description>
      </Title>
    </Root>
  )
})

export default CategoryBanner