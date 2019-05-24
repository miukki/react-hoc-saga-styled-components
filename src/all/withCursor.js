import React, { Component } from 'react'


import Context              from './Context'


export default () => (WrappedComponent) => (props) => (
  <Context.Consumer>
    {(context) => (
      <WrappedComponent {...props} fromCursor={context} />
    )}
  </Context.Consumer>
)