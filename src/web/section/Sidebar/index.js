import React, {Component, Fragment} from 'react';

import {compose} from 'recompose'
import withHandlers         from 'recompose/withHandlers'
import lifecycle            from 'recompose/lifecycle'
import defaultProps         from 'recompose/defaultProps'
import withStateHandlers    from 'recompose/withStateHandlers'
import withPropsOnChange    from 'recompose/withPropsOnChange'
import withState            from 'recompose/withState'


import withSpace            from 'evoke-me/space/all/withSpace'
import spaceBrand           from 'app/melody/brand/space/spaceBrand'
import spaceSku             from 'app/melody/sku/space/spaceSku'
import spaceDesigner        from 'app/melody/designer/api/space'
import spaceDesignerRole    from 'app/melody/designerRole/api/space'


import {Grid, Typography, SvgIcon} from '@material-ui/core';
import poseMap from '../../../api/poseMap'
import Link from '../../block/Link'
import {IconClose, IconHover1, IconHover2} from "../../icons"

import styled from 'styled-components'
import posed from 'react-pose';
import {rem} from 'polished'
import AboutAuthor from '../AboutAuthor'

import chunk           from 'lodash.chunk'


const Title = styled(Typography)`
&& {
  color: #fff;
  padding: ${rem(40)} 0 0 ${rem(40)};
  font-size: ${rem(14)};
}
`;
const Chunk = styled(Grid)`
&& {
  &.secondChunk {
    margin-left: -${rem(40)};  
  }
}
`;


const Item = styled(Typography)`
&& {
  white-space: nowrap;
  color: #fff;
  display: block;
  font-size: ${rem(13)};
  font-weight: 500;
  padding: ${rem(30)} 0 0 ${rem(40)};
  position: relative;
  
  .iconHover {
    display: none;
    position: absolute;
    left: 0;  
    top: calc(50% + 7.5px);
    width: 50px;
    height: 10px;
  }

  &:hover, &.active {
    padding-left: ${rem(60)};
    
    .iconHover {
      display: flex;
    }
  }

  &.itemSecond {
    &:hover, &.active {
      &:after {
        background: none;
        border: 1px solid #fff;
      }
    }
  }

}
`;

const Nav = styled(Grid)`
  && {
    height: 100vh;
  }
`;

const SidebarBlock = styled(Grid)`
&& {
  position: relative;
  padding: 0;
  margin: 0;
  height: ${({ height }) => height ? height + 'px' : 'auto'};
  overflow: hidden;
  .levelFirst {
    height: ${({ height }) => height ? height + 'px' : 'auto'};
    background: rgb(0, 58, 83);
    box-shadow: 3px 0px 8px 1px rgba(0,0,0,0.4);
    z-index: 1;
    overflow: hidden;
  }
  .levelSecond {
    height: ${({ height }) => height ? height + 'px' : 'auto'};
    padding-top: ${rem(55)};
    background: rgb(0, 68, 97);
    box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }
  .close {
    margin: 0 0  0 ${rem(15)}
  }
  &.right {
    .levelFirst {
      background-color: #A89563;
      z-index: 1;
      box-shadow: -3px 0px 8px 1px rgba(0,0,0,0.4);
    }
    .levelSecond {
      padding-top: ${rem(55)};
      background-color: #B9A56E;
      box-shadow: -2px 0px 6px rgba(0, 0, 0, 0.5);
    }
    .close {
      text-align: right;
      margin: 0 ${rem(15)} 0 0;
    }

  }
}
`;

const LevelSecond = styled(
  posed.div({
    small: {
      width: 170,
    },
    big: {
      width: 350,
    },
    closed: {
      width: 0,
    }
  })
)`
`


const Column = compose(

)(({items, fromQuery={}, cleanSecondLevel}) => {
  const {data} = fromQuery

  return items.map((id, index) => {

    const item = data && data[id]
    
    return (
      <Item  key={index} variant="body1" title={item.skuName || item.userName} onClick={cleanSecondLevel} className={'itemSecond'}>
        <IconHover2 className={'iconHover'} />
        {item.skuName || item.userName}
      </Item>
    )
  })
}
)

const Designers = compose(
  withSpace(spaceDesigner),

  withStateHandlers(
    () => ({
      stateSearch: []
    }),
    {
      cleanSecondLevel: ({}) => () => {
        return ({stateSearch: []})
      },
      setStateSearch: ({}) => (stateSearch) => {
        return ({stateSearch})
      }
    }
  ),


  withPropsOnChange(['fromDesigner'], ({roleId, fromDesigner={}, stateSearch, setStateSearch}) => {
    const {orderMap={}} = fromDesigner
    const search = orderMap['byRole_'+roleId]
    
    if (stateSearch !== search) {
      setStateSearch(search)
    }
 
  }),

)(
  ({fromDesigner={}, stateSearch=[], cleanSecondLevel}) => {
  return (
    <LevelSecond pose={!stateSearch.length ? 'closed' : stateSearch.length > 10 ? 'big' : stateSearch.length < 9 ? 'small' : 'closed'}>
      <Grid container>

      {stateSearch.length > 10 ? chunk(stateSearch, 10).map((chunk, keyChunk) =>
        
        <Chunk key={keyChunk} item xs={6} className={keyChunk !==0 ? 'secondChunk' : ''}>
          <Column items={chunk} fromQuery={fromDesigner} cleanSecondLevel={cleanSecondLevel} />
        </Chunk>) : (

        <Grid item xs={6}>
          <Column items={stateSearch} fromQuery={fromDesigner} cleanSecondLevel={cleanSecondLevel} />
        </Grid>
      )}

      

      </Grid>
  </LevelSecond>
)
})

const SkuItems = compose(
  withSpace(spaceSku),

  withStateHandlers(
    () => ({
      stateSearch: []
    }),
    {
      cleanSecondLevel: ({}) => () => {
        return ({stateSearch: []})
      },
      setStateSearch: ({fromSku={}}) => (stateSearch) => {
        return ({stateSearch})
      }
    }
  ),


  withPropsOnChange(['fromSku'], ({fromSku={}, stateSearch, setStateSearch}) => {
    const {orderMap={}} = fromSku
    const {search} = orderMap
    
    if (stateSearch !== search) {
      setStateSearch(search)
    }
 
  }),

)(
  ({fromSku={}, stateSearch=[], cleanSecondLevel}) => {
  return (
    <LevelSecond pose={!stateSearch.length ? 'closed' : stateSearch.length && stateSearch.length > 10 ? 'big' : stateSearch.length < 9 ? 'small' : 'closed'}>
      <Grid container>

      {stateSearch.length > 10 ? chunk(stateSearch, 10).map((chunk, keyChunk) =>
      <Chunk key={keyChunk} item xs={6} className={keyChunk !==0 ? 'secondChunk' : ''}>
      
        <Column items={chunk} fromQuery={fromSku}  cleanSecondLevel={cleanSecondLevel} />

      </Chunk>) : (

      <Grid item xs={6}>
        
        <Column items={stateSearch} fromQuery={fromSku} cleanSecondLevel={cleanSecondLevel} />

      </Grid>
      )}

      

      </Grid>
  </LevelSecond>
)
})

 
const DesignerRoles = compose(
  withSpace(spaceDesigner),
  withSpace(spaceDesignerRole),
  withState('activeRole', 'setActiveRole'),

  withHandlers(({ }) => {
    return {
      selectRole: ({fromDesigner, setRoleId, setActiveRole}) => (roleId) => {
        fromDesigner.queryByRole({roleId})
        setRoleId(roleId)
        setActiveRole(roleId)
      },
      mount: ({
        fromDesignerRole
      }) => () => {
        fromDesignerRole.query()

      },
      
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
  }),

  )(({fromDesignerRole={}, selectRole, activeRole}) => {
    const {orderMap} = fromDesignerRole
    return orderMap && orderMap.default && orderMap.default.map((id, index) => {
      const role = fromDesignerRole.data[id];
      return (
        <Item
          key={index}
          variant="body1"
          title={role.roleName}
          onClick={() => selectRole(role.id)}
          className={role.id === activeRole ? 'active' : ''}
        >
          <IconHover1 className={'iconHover'}/>
          {role.roleName} 
        </Item>
        )
      }
  )
}
)  
               
const BrandItems = compose(
  withSpace(spaceBrand),
  withSpace(spaceSku),

  withState('activeBrand', 'setActiveBrand'),
  withHandlers(({ }) => {
    return {
      mount: ({
        fromBrand
      }) => () => {
        fromBrand.queryHome()

      },
      selectBrand: ({fromSku, setActiveBrand}) => (brandCode) => {
        setActiveBrand(brandCode)
        fromSku.querySearch({brandCode})
      },
        
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
  }),
  
  )(
    ({fromBrand={}, selectBrand, fromSku, activeBrand}) => {
      const {orderMap} = fromBrand
      return orderMap && orderMap.default && orderMap.default.map((id, index) => {
        const brand = fromBrand && fromBrand.data[id];
        return (
          <Item
            key={index}
            variant="body1"
            title={brand.brandName}
            onClick={() => selectBrand(brand.brandCode)}
            className={activeBrand === brand.brandCode ? 'active' : ''}
          >
            <IconHover1 className={'iconHover'}/>
            {brand.brandName} 
          </Item>
          )
        }
    )
  }
)  
  
const enhance = compose(
  withStateHandlers(
    () => ({
      roleId: null
    }),
    {
      setRoleId: ({}) => (roleId) => {
        return ({roleId})
      }
    }
  ),

)
const Sidebar = enhance(({
    position,
    indexSet,
    color,
    stopTimer,
    height,
    chosenStory,
    roleId,
    setRoleId,
    cursor

  }) => {


    return (
      <SidebarBlock height={height} className={position === poseMap.POSITION_RIGHT ? 'right' : ''}>

        <Grid height={height} container
              direction={position === poseMap.POSITION_RIGHT ? 'row-reverse' : null}
              justify={position === poseMap.POSITION_RIGHT ? 'flex-start' : null}>
          <Grid item xs={3} className={'levelFirst'}>

            <Title variant="button">我们代理的品牌</Title>

            {position === poseMap.POSITION_LEFT  ? <BrandItems /> :  <DesignerRoles setRoleId={setRoleId} />
          }


          </Grid>

          <Grid item className={'levelSecond'}>
            {position === poseMap.POSITION_LEFT  ? <SkuItems /> : <Designers roleId={roleId} />}

          </Grid>

          {/* Nav */}
          <Grid item xs={3}>

            <Nav container direction="column" justify="space-between"
                 alignItems={position === poseMap.POSITION_RIGHT ? 'flex-end' : 'flex-start'}>

              <Grid item style={{ height: '45%' }}>
                {/* keep empty */}
              </Grid>

              <Grid item style={{ height: '35%' }}>
                <Link className={'close'} onClick={() => indexSet(0)} >
                  <IconClose coloricon={color}/>
                </Link>
              </Grid>

              <Grid item style={{ height: '20%' }}>
                <div style={{ margin: '0 0 0 1rem' }}>
                  {position !== poseMap.POSITION_RIGHT ? (
                    <AboutAuthor story={chosenStory} stopTimer={stopTimer} cursor={cursor}/>
                  ) : null}
                </div>
              </Grid>

            </Nav>

          </Grid>
        </Grid>
      </SidebarBlock>
    )
  }
);

export default Sidebar;