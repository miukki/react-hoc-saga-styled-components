import React, {Component} from 'react';
import {withStyles, Grid} from '@material-ui/core';

const styles = () => ({});

class ProductList extends Component {

  render() {
    const { children } = this.props;

    return (
        <Grid container justify="flex-start" spacing={40}>
          {children.map((item, key) => (
            <Grid key={key} item md={3} sm={3} xs={3}>
              {item}
            </Grid>
          ))}
        </Grid>
    );
  }
}

export default withStyles(styles)(ProductList);
