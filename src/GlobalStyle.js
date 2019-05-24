import React, { Component }  from 'react'
import { createGlobalStyle } from 'styled-components'


export default createGlobalStyle`
  html, body {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
    margin: 0;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-decoration: none;
    font-style: normal;
    color: #fff;
    
    /*font-size: 16px;*/
  }

  #root {
    display: flex;
    min-height: 100vh;
    flex-direction: column;    
  }
`