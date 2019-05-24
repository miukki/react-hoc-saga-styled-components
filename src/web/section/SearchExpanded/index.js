import React, {Component} from 'react'
import posed from 'react-pose'
import compose from 'recompose/compose'
import {withStateHandlers} from 'recompose'
import styled from 'styled-components'
import withHandlers          from 'recompose/withHandlers'
import {rem} from '../../mui'
import {InputBase} from '@material-ui/core'
import {IconSearch} from "../../icons"
import { withRouter } from "react-router-dom"

const IconSearchCustom = styled(IconSearch)`
  && {
    position: relative;
    z-index:11;
    cursor: ${props => props.cursor ? 'inherit' : 'pointer' } ;

  }
`

const Root = styled.div`
  position: relative;
`

const Block = styled(
  posed.div({
    open: {
      width: '40vw',
      staggerChildren: 100,
      background: 'rgba(38,38,38,1)',
    },
    closed: {
      width: 0,
      background: 'rgba(38,38,38,0)',
    }
  })
)`
  position: absolute;
  top: calc(50% - ${rem(30/2)});
  right: 0;
  min-height: ${rem(40)};
  width: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: ${rem(30)};
  background-color: #262626;
`

const InputBlock = styled(InputBase)`
  && {
      width: 100%;
      color: white;
      font-size: ${rem(14)};
      padding: ${rem(10)} ${rem(15)};
      padding-right: ${rem(40)};
      
      input {
        padding: 0;
        
      }
  }
`

const enhance = compose(
  withRouter,
  withStateHandlers(
    () => ({
      isExpanded: false,
      queryName: '',
      placeholder:  '什么做'
    }),
    {
      toggleExpanded: ({ isExpanded }) => () => ({
        isExpanded: !isExpanded
      }),
      onChangeQueryName: () => (event) => ({queryName: event.target.value})
    }
  ),
  withHandlers(({setQueryName}) => {
    
    return {
      handleKeyPress: ({queryName, history, toggleExpanded}) => (event) => {
        if (event.key == 'Enter' && queryName && setQueryName) {
          setQueryName(queryName)
          history.push('/store?name='+queryName)
          toggleExpanded()
        }
      } 
    }
  }),

)

const SearchExpanded = enhance(({
  isExpanded, toggleExpanded, color, handleKeyPress, queryName, onChangeQueryName, cursor
}) => {
  return (
    <Root>
      <IconSearchCustom cursor={cursor} coloricon={color} style={{ width: 16 }} onClick={toggleExpanded}/>
      <Block pose={!isExpanded ? 'closed' : 'open'}>
        <InputBlock
          autoComplete="off"
          margin="none"
          fullWidth
          value={queryName}
          placeholder={'什么做'}
          onChange={onChangeQueryName}
          onKeyPress={handleKeyPress}/>
      </Block>
    </Root>
  )
})

export default SearchExpanded