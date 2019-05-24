import React, { Component } from 'react'
import ReactCursorPosition  from 'react-cursor-position'
import compose              from 'recompose/compose'
import withStateHandlers    from 'recompose/withStateHandlers'
import styled               from 'styled-components'

import Context              from '../../all/Context'
import poseMap              from '../../api/poseMap'
import Cursor               from './Cursor'


const Root = styled(ReactCursorPosition)`
  position: relative;
`

const enhance = compose(
  withStateHandlers(
    () => ({
      content: ``,
      pose: poseMap.DEFAULT,
    }),
    {
      contentSet: () => (content) => ({ content }),
      poseSet: () => (pose) => ({ pose }),
    }
  )
)

const ProviderNavAnimated = enhance(
  (props) => {
  const {
    children,
    content, contentSet,  
    pose, poseSet,
    position: {x, y},
    isActive,
 
  } = props;
  const position = {
    x: x - window.scrollX,
    y: y - window.scrollY
  };

  return (
    <Context.Provider value={{
      content, contentSet,
      pose, poseSet,
      position,
      isActive,
    }}>
      <Cursor
        content={content}
        pose={pose}
        position={position}
        isActive={isActive}
      />
      {children}
    </Context.Provider>
  )
}
)

export default ({ children, ...props }) => (
  <Root {...props}>
    <ProviderNavAnimated>
      {children}
    </ProviderNavAnimated>
  </Root>
)
