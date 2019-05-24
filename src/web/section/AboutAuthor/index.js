import React, { Component } from 'react';
import {rem} from 'polished'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {compose, withProps, withHandlers } from 'recompose'
import defaultProps         from 'recompose/defaultProps'

import _ from 'lodash'


const styles = theme => ({
  root: {
  },
});


const enhance = compose(
  defaultProps({
    A: {
      Details: styled.p`
        && {
          font-size: ${rem(13)};
          color: #fff;
          text-decoration: none;
          display: block;
      
        }
          `,
      Title: styled.p`
        && {
          font-size: ${rem(16)};
          color: #fff;
          text-decoration: none;
          display: block;
          font-weight: 500;
      
        }
      `,
      Container: styled.div`
        a {
          text-decoration: none;
        }
      `,
      Link: styled(Link)`
        && {
          cursor: ${props => props.cursor ? 'inherit' : 'pointer' } ;
        }
      `,
    
    
    }
  }),

  
  withProps(({ story }) => {
    return {...story };

  })
);

const AboutAuthor = enhance(({
  storyImageName, imageDesc, projectName, A, cursor
}) => {
  return (
    <A.Container>
      <A.Link cursor={cursor} to="/expanded"><A.Title>{imageDesc}</A.Title></A.Link>
      <A.Link cursor={cursor} to="/expanded"><A.Details>{projectName}</A.Details></A.Link>
      <A.Link cursor={cursor} to="/expanded"><A.Details>{storyImageName}</A.Details></A.Link>
    </A.Container>

  )});


export default AboutAuthor;
