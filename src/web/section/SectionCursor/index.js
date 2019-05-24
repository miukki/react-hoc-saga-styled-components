import { Grid }             from '@material-ui/core'

import React                from 'react'
import compose              from 'recompose/compose'
import defaultProps         from 'recompose/defaultProps'
import withHandlers         from 'recompose/withHandlers'
import lifecycle            from 'recompose/lifecycle'
import styled               from 'styled-components'


import withSpace            from 'evoke-me/space/all/withSpace'
// import spaceAuth            from 'app/melody/auth/space/spaceAuth'
import spaceStoryImage      from 'app/melody/storyImage/space/spaceStoryImage'

import BlockCursor          from '../../block/BlockCursor'
import BlockCursorExpanded          from '../../block/BlockCursorExpanded'

import { withRouter } from "react-router-dom"

const Section = styled(Grid)` 
&& {
  height: ${({height}) => height ? height+'px' : 'auto'};
  background-color: #efefef;
  // overflow: hidden;
  cursor: none;
}
`

const enhance = compose(
  withRouter,
  defaultProps({
  }),
  // withSpace(spaceAuth),
  withSpace(spaceStoryImage),
  withHandlers({
    mount: ({
      // fromAuth,
      fromStoryImage,
    }) => () => {
      fromStoryImage.query()
      // fromAuth.registerEmulator()
      // fromAuth.loginEmulator()
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.mount()
    }
  }),
)

const SectionAnimated = enhance(({height, defaultIndex, params, searchQueries, isExpanded}) => {
  return (
    <Section height={height} container justify="center" spacing={0}>
      <Grid item xs={12}>
        {!isExpanded ? 
        <BlockCursor height={height} params={params} searchQueries={searchQueries} /> : 
        <BlockCursorExpanded height={height} params={params} searchQueries={searchQueries} />
      }
      </Grid>
    </Section>
  )
})

export default SectionAnimated
