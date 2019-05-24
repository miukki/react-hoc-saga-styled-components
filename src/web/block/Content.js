import { Grid }             from '@material-ui/core'

import React, { Component } from 'react'
import {compose, withProps}              from 'recompose'
import posed                from 'react-pose'
import styled               from 'styled-components'

import withCursor           from '../../all/withCursor'
import poseMap              from '../../api/poseMap'


const Root = styled.div`
  background: ${({background}) => background || ''};
  top: 0;
  right: ${({position}) => position === 'right' ? 0 : 'auto'};
  left: ${({position}) => position === 'left' ? 0 : 'auto'};
  position: absolute;
  width: ${({width}) => width || '100vw'};
  height: ${({height}) => height ? height+'px' : 'auto'};
`

const ContentAnimation = styled(
  posed.div({
    default: {
      x: `0`,
    },
    left: {
      x: `-1%`,
      left: 0,
      transition: {
        duration: 400,
        ease: 'linear'
      }
    },
    right: {
      x: `+1%`,
      right: 0,
      transition: {
        duration: 400,
        ease: 'linear'
      }
    },
  })
)`
  height: 100%;
`

const enhance = compose(
  withProps(({ current, index, position }) => {
    return {
      pose: current === index || index === 0 ? `default` : position || (current > index ? `left` : `right`),
      stateBlock: { display: current === index || index===0 ? 'block' : 'none' }
    };
  }),
  withCursor(),


)

const Content = enhance((props) => {
  const {children, pose, stateBlock, fromCursor, onMouseDown, onMouseUp, ...other} = props;
    return (
    <Root style={stateBlock} {...props} 
      onMouseDown={(e) => {
        fromCursor.poseSet(poseMap.DOWN)
        onMouseDown && onMouseDown(e)
      }}
      onMouseUp={(e) => {
        fromCursor.poseSet(poseMap.DEFAULT)
        onMouseUp && onMouseUp(e)
      }}
        
      >
      <ContentAnimation {...props} pose={pose}>
        {children}
      </ContentAnimation>
    </Root>
  )
})

export default Content