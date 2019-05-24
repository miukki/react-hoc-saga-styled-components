import React, {Component} from 'react'
import posed from 'react-pose'
import compose from 'recompose/compose'
import { defaultProps, setPropTypes} from 'recompose'
import styled from 'styled-components'

import {Link} from 'react-router-dom'

import {rem} from '../../mui'

import {Grid} from '@material-ui/core'

import menuItemsExpanded from '../../../api/menuItemsExpanded'

const Menu = styled(
  posed.div({
    open: {
      width: '540px',
      staggerChildren: 100,
      opacity: 1,
    },
    close: {
      width: 0,
      staggerChildren: 100,
      opacity: 0,
    }
  })
)`
  background: #AE3E38;
  position: absolute;
  top: 0;
  min-height: 60px;
  max-height: 60px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  z-index: 10;
  border-radius: 0 ${rem(30)} ${rem(30)} 0;
  padding-left: ${rem(35)};
  margin-left: ${rem(30)};
  width: 0;
  opacity: 0;
`

const MenuItem = styled.span`
  && {
    display: inline-block;
    padding: ${rem(25)} ${rem(9)};
    font-style: normal;
    line-height: ${rem(14)};
    font-size: ${rem(14)};
    letter-spacing: ${rem(1.1375)};
    margin: ${props => props.margin};
    color: #fff;
    &:hover {
      font-weight: 500;
    }
  }
`

const enhance = compose(
  setPropTypes({
  }),
  defaultProps({
    Link: styled(Link)`
      && {
        color: #fff;
      }
    `,
    items: []
  })
)

const LogoMenu = enhance(({
  logoExpanded, Link
}) => {
  return (
    <Menu pose={!logoExpanded ? 'close' : 'open'} >
      <Grid container justify="center" alignItems="center" style={{display: logoExpanded ? 'flex' : 'none'}}>

        {menuItemsExpanded.map((item, key) => (
          <Grid key={key} item> 
            <Link to="/store">
              <MenuItem margin={key===menuItemsExpanded.length-1 ? '0 1.875rem 0 0' : 'auto'}>{item.label}</MenuItem>
            </Link>
          </Grid>
        ))}

      </Grid>
    </Menu>
  )
})

export default LogoMenu