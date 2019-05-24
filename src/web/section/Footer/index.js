import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import {IconNoteBook, IconCart, IconLike, IconShare, IconNext, IconPrev, IconButtonRipple} from '../../icons'
import AboutAuthor from '../AboutAuthor'
import {compose, withProps, withHandlers } from 'recompose'


const styles = theme => ({
  root: {
  },
});

const enhance = compose(
  withHandlers({
  }),

  withProps(({ }) => {
    return {
    };
  })
);

const Footer = enhance((props) => {
  const {
    children, setNewStoryId, chosenStory, cursor 
  } = props;
  return (
    <Grid container alignItems="flex-end" direction="row" justify="space-between">
                
      <Grid item xs={5} sm={4} md={5}>
        <AboutAuthor {...props} story={chosenStory} cursor={cursor} />
      </Grid>

      <Grid item xs={3} sm={4} md={5} >
        {children}
      </Grid>

      <Grid item xs={4} sm={4} md={2}>
          <Grid container direction="row" alignItems="center" justify="center" spacing={0}>
              
              <Grid item xs={12}>

                <IconCart cursor={cursor} style={{ width: 16 }} coloricon="#fff"/>
                <IconLike cursor={cursor} style={{ width: 16 }} coloricon="#fff"/>
                <IconNoteBook cursor={cursor} style={{ width: 11 }} />
                <IconShare cursor={cursor} style={{ width: 14 }} /> 

              </Grid>

              <Grid item xs={12}>
                <Grid container  alignItems="stretch" direction="row" justify="space-between">
                  <Grid item xs={5}>
                    <IconPrev style={{fontSize: 15, marginLeft: '10px'}} cursor={cursor} onClick={()=>setNewStoryId(-1)} />
                  </Grid>
                  <Grid item xs={5}>
                    <IconNext style={{fontSize: 15}} cursor={cursor} onClick={()=>setNewStoryId(1)} />
                  </Grid>
                </Grid>
            </Grid>
          </Grid>

      </Grid>

  </Grid>
)});
    


export default Footer;
