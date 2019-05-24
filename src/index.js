import { createMuiTheme }   from '@material-ui/core'
import { CssBaseline }      from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core'

import React                from 'react'
import ReactDOM             from 'react-dom'
import styled               from 'styled-components'

import { BrowserRouter }    from 'react-router-dom'
import { Route }            from 'react-router-dom'
import { Switch }           from 'react-router-dom'


import ProviderSpace        from 'evoke-me/space/all/Provider'
import GlobalStyle          from './GlobalStyle'

import SectionMain        from './web/section/SectionMain'


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
    fontSize: 16, 
    htmlFontSize: 10,
    color: '#9b9b9b'
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  palette: {
    primary: { 500: '#ae3e38' },
    error: { 500: '#ff0000' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  fontWeightMedium: 500,
  button: {
    borderRadius: 5,
  },
  status: {
    danger: 'red',
  },
  overrides: {
    MuiButton: { // Name of the component 
      text: { // Name of the rule
        color: 'white', // Some CSS
      },
    },
  },
})

const re = '/:param(store|profile|expanded|agreement|entryproducts|orders|\\w*)/:skuNo(\\d+)?'

const App = () => {
  return (
    <ProviderSpace>
  
      <MuiThemeProvider theme={theme}>
  
        <CssBaseline />
        <GlobalStyle />
  
          <BrowserRouter>
            <Switch>
              <Route exact path={'/'} component={SectionMain} />
              <Route path={re} component={SectionMain} />             
            </Switch>
          </BrowserRouter>
  
      </MuiThemeProvider>
  
    </ProviderSpace>
  )
  
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
