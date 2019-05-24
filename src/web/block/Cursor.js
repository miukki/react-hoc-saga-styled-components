import { Grid }             from '@material-ui/core'

import React from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import posed from 'react-pose'
import styled from 'styled-components'

import poseMap from '../../api/poseMap'
import {rem} from '../mui'

const Pointer = styled.div.attrs(({ position: { x, y }}) => {
  return {
    style: {
      transform: `translate(${x}px, ${y}px)`
    }
  }
})`
  left: 0;
  top: 0;
  position: fixed;
  margin-left: -15px;
  margin-top: -15px;
  display: ${ ({ isActive }) => isActive ? 'block' : 'none' };
  pointer-events: none;
  z-index: 1000;
`

const Item = styled.div`
&& {
  padding: ${rem(10)};
  font-size: ${rem(14)};
  white-space: nowrap;
}`;


const Content = styled(Grid)`
  height: 100%;
  line-height: 0;
  font-size: 60%;
`

const bgMap = {
  [poseMap.DEFAULT]: `#A89563`,
  [poseMap.SMALL]: `#A89563`,
  [poseMap.MEDIUM]: `#A89563`,
  [poseMap.LARGE]: `#A89563`,
  [poseMap.HINT]: `#A89563`,
  [poseMap.DOWN]: `#c2aa6f`,
}

const enhance = compose(
  defaultProps({
    pose: poseMap.DEFAULT,
    Animation: styled(
      posed.div({
        [poseMap.DEFAULT]: {
          background: '#A89563',
          scale: 0.5,
        },
        [poseMap.SMALL]: {
          background: '#A89563',
          scale: 0.4,
          transition: { type: 'spring', stiffness: 300 },
        },
        [poseMap.MEDIUM]: {
          background: '#A89563',
          scale: 3,
          transition: { type: 'spring', stiffness: 300 },
        },
        [poseMap.LARGE]: {
          background: '#A89563',
          scale: 4,
          transition: { type: 'spring', stiffness: 300 },
        },
        [poseMap.HINT]: {
          background: '#A89563',
          scale: 1.4,
          transition: { type: 'spring', stiffness: 300 },
        },
        [poseMap.DOWN]: {
          background: '#c2aa6f',
          scale: 0.8,
          transition: { type: 'spring', stiffness: 300 }
        }
      })
    )`
      background: ${({ pose }) => bgMap[pose]};
      border-radius: 100%;
      width: 50px;
      height: 50px;  
      padding: 10px;
    `,
  })
)

const Cursor = enhance((props) => {
  const {
    content,
    isActive,
    pose,
    Animation
  } = props
  return (
    <Pointer {...props}>
      <Animation pose={pose}>
        {pose === poseMap.HINT ? (
          <Content container alignItems="center" justify="center" spacing={0}>
              {content.split(',').map((c,i)=> {
                return (
                  <Grid item key={i}>
                    <Item>{c}</Item>
                  </Grid>
                )
              })}
          </Content>
        ) : null }
      </Animation>
    </Pointer>
  )
})

export default Cursor