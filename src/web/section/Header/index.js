import React, { Component } from 'react';
import { withStyles, Grid, ButtonBase} from '@material-ui/core';
import compose              from 'recompose/compose'
import defaultProps         from 'recompose/defaultProps'
import withStateHanlders    from 'recompose/withStateHandlers'
import withHandlers         from 'recompose/withHandlers'
import lifecycle            from 'recompose/lifecycle'

import {IconLogoRedCircle, IconLogoText, IconCart, IconLike, IconUser} from '../../icons'
import LogoMenu             from '../LogoMenu'
import SearchExpanded       from '../SearchExpanded'
import menu                 from '../../../api/menu'
import styled               from 'styled-components'
import {mediaGrid, rem}     from '../../mui'

import {Link}               from 'react-router-dom'
import SignUpIn             from '../SignUpIn'

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'

import { withRouter }       from "react-router-dom"

const enhance = compose(
  withRouter,
  withSpace(spaceAuth),
  defaultProps({

    A: {
      IconCart: styled(IconCart)`
        && {
          cursor: ${props => props.cursor ? 'inherit' : 'pointer' } ;
        }
      `,
      IconLike: styled(IconLike)`
        && {
          cursor: ${props => props.cursor ? 'inherit' : 'pointer' } ;
        }
      `,
      IconUser: styled(IconUser)`
        && {
          cursor: ${props => props.cursor ? 'inherit' : 'pointer' } ;
        }
      `,

      Link: styled(Link)`
        && {
          display: inline-block;
          color: ${props => props.color};
          cursor: ${props => props.cursor ? 'inherit' : 'pointer' } ;
          margin: 0 ${rem(12)}; 
          text-decoration:none;
    
        }
    `,

      LogoWrap: styled.div`
      && {
        position: relative; 
        display: inline-block;
        height: 60px;
      }
      `,
      Logo: styled(Grid)`
      && {
      text-align: left;
      ${mediaGrid(`md`)}{//sm tablet
        text-align:center;
      }
      ${mediaGrid(`sm`)}{//xs phone
        text-align:center;
        }
      }
      `,
      MenuWrap: styled(Grid)`
      &&{
        height: 53px;
      }
    `,
      SearchWrap: styled(Grid)`
      &&{
        text-align: right;
      }
    `
    }
  }),
  withStateHanlders(
    () => ({
      menu: menu,
      logoExpanded: false,
      isOpenPopup: false
    }),
    {
      setLogoExpanded: ({ logoExpanded }) => () => ({ logoExpanded: !logoExpanded }),
      onMouseLeave: () => () => ({ logoExpanded: false }),
      onMouseEnter: () => () => ({ logoExpanded: true }),
      togglePopup: ({isOpenPopup}) => () =>({isOpenPopup: !isOpenPopup}),

  
    }
  ),

  withHandlers({
    mount: ({
      fromAuth,
    }) => () => {
      fromAuth.getSessionKey()
    },
    moveToPage: ({history}) => (arg='') => {
      history.push('/'+arg)
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.mount()
    }
  }),
)



const styles = theme => ({
  root: {
  },
});

const Header = enhance(({
  menu, logoExpanded, A, colorLogoText,
  color, fromAuth, moveToPage, setQueryName, 
  onMouseEnter, onMouseLeave, togglePopup, isOpenPopup, cursor
}) => {
  const {sessionKey} = fromAuth
  return (
      <React.Fragment>
  
        <SignUpIn isOpenPopup={isOpenPopup} togglePopup={togglePopup} />

        <Grid container alignItems="stretch" direction="row" justify="space-between" style={{position: 'relative'}}>

          <A.Logo item xs={12} sm={12} md={4}>
            <A.LogoWrap onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} >
              <ButtonBase disableRipple={true} disableTouchRipple={true} focusRipple={true} >
              <IconLogoRedCircle onClick={()=> moveToPage()} style={{ fontSize: 60, zIndex: 15 }}/>
                <IconLogoText coloricon={colorLogoText} style={{ width: 150, margin: '0 0 0 15px'}} />
              </ButtonBase>
              <LogoMenu logoExpanded={logoExpanded} />
            </A.LogoWrap>
          </A.Logo>

          <Grid item xs={12} sm={12} md={6}>
            <A.MenuWrap container alignItems="center" justify="center" spacing={0}>
                {menu.map((value, index) => (
                <Grid key={index} item >
                    <A.Link to="/store" content='做什么' cursor={cursor} size='small' color={color || '#fff'}  >
                      {value}
                    </A.Link>
                  </Grid>
                ))}
            </A.MenuWrap>
          </Grid>

          <Grid item xs={12} sm={12} md={2}>
            <Grid container style={{'height': 60}} direction="column" alignItems="stretch" justify="center" spacing={0}>


                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center" justify="space-between" spacing={0} >

                      <Grid item>
                        <A.IconCart onClick={()=>moveToPage('entryproducts')} cursor={cursor} style={{ width: 16 }} coloricon={color || '#fff'}/>
                        <A.IconLike cursor={cursor} style={{ width: 16 }} coloricon={color || '#fff'}/>
                        <A.IconUser cursor={cursor}  onClick={() => {
                          return sessionKey ? moveToPage('profile') : togglePopup()
                        }} coloricon={color || '#fff'} style={{ width: 16 }}/>
                      </Grid>
                      <A.SearchWrap item>
                        <SearchExpanded cursor={cursor} setQueryName={setQueryName} color={color} />
                      </A.SearchWrap>

                  </Grid>
                </Grid>
                
            </Grid>
          </Grid>


        </Grid>


      </React.Fragment>
    );
  }
)

export default withStyles(styles)(Header);
