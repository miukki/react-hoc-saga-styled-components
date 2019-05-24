import { Grid }             from '@material-ui/core'

import React                from 'react'

import compose              from 'recompose/compose'
import withStateHandlers    from 'recompose/withStateHandlers'
import withHandlers         from 'recompose/withHandlers'

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceStoryImage      from 'app/melody/storyImage/space/spaceStoryImage'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'

import Poster               from '../Poster'
import ExpandedMain         from '../ExpandedMain'
import Header               from '../Header'
import Store                from '../Store'
import ReadAndAgree         from '../ReadAndAgree'
import EntryProducts        from '../EntryProducts'
import SectionProfile       from '../SectionProfile'
import SectionOrders        from '../SectionOrders'
import SectionProductView   from '../SectionProductView'

import styled               from 'styled-components'
import { mediaGrid }        from '../../mui'

const Background = styled.div`
  height: 100vh;
  display: flex;
  width: 100%;
  position: absolute;
`


const enhance = compose(
  withSpace(spaceAuth),
  withSpace(spaceStoryImage),
  withStateHandlers(
    () => ({
      queryName: '',

    }),
    {

      setQueryName: () => (queryName) => {
        return {queryName}
      },


    },
  ),

  withHandlers({
    setSectionPage: ({params, queryName, searchQueries, fromAuth}) => () => {
      return params.param === 'store' && !params.skuNo ? <Store params={params} searchQueries={Object.assign( {}, searchQueries, queryName? {name: queryName} : {} )} queryName={queryName} /> : 
        params.param === 'store' && params.skuNo ? <SectionProductView skuNo={params.skuNo} params={params} searchQueries={Object.assign( {}, searchQueries, queryName? {name: queryName} : {} )} queryName={queryName} /> : 
        params.param === 'agreement' ? <ReadAndAgree /> :  
        params.param === 'orders' ? <SectionOrders /> :  
        params.param === 'entryproducts' ? <EntryProducts/> : 
        params.param === 'profile' ? <SectionProfile sessionKey={fromAuth.sessionKey} /> : null 
    }
  }),

)

const StyledBg = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  position: absolute;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: rgba(255,255,255,0.5);
  
  ${mediaGrid(`xl`)}{//lg d
    background-size: 150% auto;
    @media only screen and (orientation: portrait) {
      background-size: auto 100%;
    }
  }
  ${mediaGrid(`lg`)}{//md d
    background-size: 120% auto;
    @media only screen and (orientation: portrait) {
      background-size: auto 100%;
    }
  }
  ${mediaGrid(`md`)}{//sm tablet
    background-size: auto 130%;
  }
  ${mediaGrid(`sm`)}{//xs phone
    background-size: auto 100%;
  }
`

const BgChosenStory = ({productPageSourceUrl}) => {
  const url = productPageSourceUrl || `/img/posters/poster.png`
  return (
    <StyledBg
      pose='show'
      style={{ backgroundImage: `url(${url})` }}
    />
  )
} 

const SectionPageStatic = enhance(props => {
  const {
    height,
    setQueryName,
    setSectionPage,
    params,
  } = props
  
  return (
     <React.Fragment>
 
      {params && params.param === 'entryproducts' ? (
        <Background>
          <BgChosenStory productPageSourceUrl={'/img/posters/poster.png'} />
        </Background>
      ) : null}

      <Poster height={100} background="#fff" >
        <Header setQueryName={setQueryName} color="#777777" colorLogoText="#262626"  />
      </Poster>

      <ExpandedMain height={height} >
          <Grid item xs={10} md={10}>
            {setSectionPage()}
          </Grid>
      </ExpandedMain>
 
    </React.Fragment>
  )
})

export default SectionPageStatic
