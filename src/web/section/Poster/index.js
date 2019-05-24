import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import styled               from 'styled-components'

import {rem} from '../../mui'

const Block = styled(({ height, background,  ...other }) => (
  <Grid {...other} />
))`
&& {
  height: ${({height}) => height ? height+'px' : 'auto'};
  position: relative;
  padding: ${rem(20)} ${rem(40)};
  background: ${props => props.background};
}`;

class Poster extends Component   {
  render () {
    const { children, height, background } = this.props;
    return (
      <Block container
        height={height}
        direction={'row'}
        justify={'space-between'}
        alignItems={'stretch'}
        spacing={0}
        background={background}
      >
        <React.Fragment>{children}</React.Fragment>
      </Block>
    )}
}

export default Poster