import { Grid }             from '@material-ui/core'
import { rem }              from 'polished'
import React                from 'react'
import compose              from 'recompose/compose'
import defaultProps         from 'recompose/defaultProps'
import styled               from 'styled-components'

import BaseFooter from '../BaseFooter';

export default compose(
  defaultProps({
    A: {
      ExpandedMain: styled.div`
        position: relative;
        color: #777; 
        background: #fff;
        min-height: 100vh;
        width: 100vw;
        flex:1;
      `,
      Container: styled(({ height, ...props }) => (
        <Grid {...props} />
      ))`
        flex:1;
        min-height: 100vh;
      `

    }

  }),
)((props) => {
  const {
    A,
    children,
    height
  } = props

  return (
    <React.Fragment>

      <A.ExpandedMain height={height} >
        <A.Container height={height} container alignItems="flex-start" justify="center" spacing={0}>
          {children}
        </A.Container>
      </A.ExpandedMain>
      <BaseFooter/>

    </React.Fragment>
  )
  
})