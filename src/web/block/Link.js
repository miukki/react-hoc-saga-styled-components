import React, { Component } from 'react'
import posed                from 'react-pose'
import compose              from 'recompose/compose'
import styled               from 'styled-components'


import withCursor           from '../../all/withCursor'
import poseMap              from '../../api/poseMap'

const Root = styled.div`
  margin: ${props => props.margin || ''};

`
const enhance = compose(
  withCursor(),
)

const Link = enhance(({
  children,
  content,
  fromCursor,
  size = `small`,
  onClick,
  ...other,
}) => {
  return (
    <Root
    {...other}
      onClick={(e) => {
        if (size === 'small') {
          fromCursor.poseSet(poseMap.SMALL)
        } else {
          fromCursor.poseSet(poseMap.MEDIUM)
        }
        onClick && onClick(e)
      }}
      onMouseEnter={() => {
        content && fromCursor.contentSet(content)
        fromCursor.poseSet(poseMap.HINT)
      }}
      onMouseLeave={() => fromCursor.poseSet(poseMap.DEFAULT)}
    >
      {children}
    </Root>
  )
})

export default Link