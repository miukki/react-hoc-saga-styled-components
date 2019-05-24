import React, {Children}                from 'react'
import ContainerDimensions  from 'react-container-dimensions'
import { withRouter }       from 'react-router-dom'

import compose              from 'recompose/compose'
import withPropsOnChange    from 'recompose/withPropsOnChange'
import lifecycle            from 'recompose/lifecycle'
import withStateHandlers    from 'recompose/withStateHandlers'
import withHandlers         from 'recompose/withHandlers'

import styled               from 'styled-components'

import queryString          from 'query-string'

import spaceAuth            from 'app/melody/auth/space/spaceAuth'
// import spaceDesigner        from 'app/melody/designer/api/space'
// import spaceDesignerRole    from 'app/melody/designerRole/api/space'
import withSpace            from 'evoke-me/space/all/withSpace'

import SectionCursor        from '../SectionCursor'
import SectionPageStatic    from '../SectionPageStatic';

import indexMap from        '../../../api/indexMap'

const Page = styled.div`
  flex: ${props => props.isStaticPage ? 1 : 'unset'};
  min-height: 100vh;
  background: #fff;
`

export default compose(
  withRouter,
  withSpace(spaceAuth),
  // withSpace(spaceDesigner),
  // withSpace(spaceDesignerRole),
  withStateHandlers(
    () => ({
      defaultIndex: 0,
      isStaticPage: false,

    }),
    {
      setDefaultIndex: () => (defaultIndex) => ({ defaultIndex }),
      setStateParams: () => ({params, searchQueries}) => ({ params, searchQueries }),
      setStaticPage: () => (isStaticPage) => ({isStaticPage})
    }
  ),
  withHandlers({
    mount: ({
      fromAuth,
      fromDesigner,
      fromDesignerRole,
    }) => () => {
      if (!fromAuth.machineNo) {
        fromAuth.start()
      }

      // fromDesignerRole.query()
      // fromDesigner.queryByRole({ roleId: `600007` })
      // fromDesigner.queryByRole({ roleId: `600005` })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
  }),

  withPropsOnChange(['match'], ({match, setStateParams, setStaticPage, location}) => {
    const {params={}} = match;
    const searchQueries = location.search && queryString.parse(location.search) || null
    setStateParams({params, searchQueries});
    setStaticPage(params.param && params.param !== 'expanded')

  }),

)(({
  defaultIndex,
  fromAuth,
  params = {},
  searchQueries = {},
  isStaticPage,

}) => {

  if (!fromAuth.machineNo) return null

  
  return (

    <React.Fragment>

      <Page isStaticPage={isStaticPage}>
        {isStaticPage ? <SectionPageStatic params={params} param={params.param} searchQueries={searchQueries}/> : 
        
        <ContainerDimensions>
          {({height}) => (
            <SectionCursor isExpanded={params.param && params.param === 'expanded'} height={height} defaultIndex={defaultIndex} params={params} searchQueries={searchQueries} />
          )}
        </ContainerDimensions> 
      }
      </Page>

    </React.Fragment>

  )
})
