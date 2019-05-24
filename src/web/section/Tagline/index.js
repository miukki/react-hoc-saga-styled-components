import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';

const styles = () => ({
  root: {
  },
});

class Tagline extends Component {
  render() {
    const {children} = this.props;
    return (
      <Grid container  alignItems="center" direction="row" justify="space-between">
        {children}
      </Grid>
    );
  }
}

export default withStyles(styles)(Tagline);
