import React, {Component, Fragment} from 'react';
import {withStyles, Grid, Button, ButtonBase} from '@material-ui/core';

import {Link} from 'react-router-dom'

import { defaultProps} from 'recompose'
import compose              from 'recompose/compose'
import withStateHanlders    from 'recompose/withStateHandlers'

import posed from 'react-pose'
import {rem} from '../../mui'
import styled from 'styled-components'

const styles = () => ({});

const enhance = compose(
  withStateHanlders(
    () => ({
      isExpanded: false,
      idx: 0,
      items: [
        { title: '文章A：项目A的灵感来源', backgroundImage: 'pic-menu-1.png' },
        { title: '文章D：今年的设计趋势，产品推荐', backgroundImage: 'pic-menu-2.png' },
        { title: '文章D：今年的设计趋势，产品推荐', backgroundImage: 'pic-menu-3.png' },
        { title: '文章D：今年的设计趋势，产品推荐', backgroundImage: 'pic-menu-4.png' }
      ]
    }),
    {
      toggleExpanded: ({isExpanded, idx}) => (indexUpdated) => {
        return ({ isExpanded: indexUpdated===idx? !isExpanded : isExpanded, idx: indexUpdated })
      },
    },
  ),
  defaultProps({
    Root: styled.div`
      && {
        text-align: center;
        margin-bottom: ${rem(30)};
      }
      `,

    Link: styled(Link)`
      && {
        text-decoration: none;
        color: #262626;
        font-size: ${rem(18)};
        line-height: 1;
        white-space: nowrap;
        margin: auto;
        position: relative;
   
      `,
    Button: styled(Button)`
      && {

      }
      `,
    Animated: styled(posed.div({
      close: { height: rem(80) },
      open: { height: rem(160) }
    }))`
    && {
      text-align:center;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 250% auto;
      display: flex;
      flex-direction: row;
      height: ${rem(80)};
    `
  }),
  )




const PictureMenu = enhance(({Root, toggleExpanded, items, Link, Animated, isExpanded, idx}) => {
  
  return (
      <Root>
        {items.map((item, index) => {

          const backgroundImage = {
            backgroundImage: 'url(/img/examples/' + item.backgroundImage + ')'
          };

          return (
            <Animated pose={idx === index && isExpanded ? `open` : `close`}
              key={index}
              style={backgroundImage}
              onClick={()=>toggleExpanded(index)}
            >
              <Link to={'/store/' + item.id} >{item.title}</Link>
            </Animated>
          )
        })}
      </Root>
    );
  }
)


export default withStyles(styles)(PictureMenu);
