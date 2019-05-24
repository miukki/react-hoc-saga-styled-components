import { ButtonBase }       from '@material-ui/core'
import { Grid }             from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { FormGroup }        from '@material-ui/core'
import { FormLabel }        from '@material-ui/core'
import { Radio }            from '@material-ui/core'
import { RadioGroup }       from '@material-ui/core'
import { TextField }        from '@material-ui/core'
import { Typography }       from '@material-ui/core'
import React                from 'react'

import compose              from 'recompose/compose'
import defaultProps         from 'recompose/defaultProps'
import lifecycle            from 'recompose/lifecycle'
import withPropsOnChange    from 'recompose/withPropsOnChange'
import withStateHanlders    from 'recompose/withStateHandlers'
import withHandlers         from 'recompose/withHandlers'
import styled               from 'styled-components'

import { withRouter } from "react-router-dom"

import { IconRemove }       from '../../icons'
import { rem }              from '../../mui'

import SkuProduct           from '../SkuProduct'

import spaceFilterCategory  from 'app/melody/filterCategory/space/spaceFilterCategory'
import spaceFilterSpace     from 'app/melody/filterSpace/space/spaceFilterSpace'
import spaceSku             from 'app/melody/sku/space/spaceSku'
import withSpace            from 'evoke-me/space/all/withSpace'


const Title = styled(Typography)`
  && {
    font-size: ${rem(18)};
    font-weight: normal;
    line-height: 1.56;
    letter-spacing: 0.8px;
    color: #262626;
    text-align: center;
    margin-top: ${props => props.marginTop !== undefined ? rem(props.marginTop) : rem(40)};
    margin-bottom: ${props => props.marginBottom !== undefined ? rem(props.marginBottom) : rem(57)};
  }
`

const SearchRadio = styled(Radio)`
  && {
    display: inline-block;
    
    svg {
      width: ${rem(12)};
      height: ${rem(12)};
      color: #979797;
    }
  }
`

const FilterBlock = compose(
  defaultProps({
    A: {
      Category: styled.div`
      && {
        margin: ${props => props.level === 1 ? ('0 0 ' + rem(15) + ' ' + rem(15))   : props.level ===2 ? '0 0 0 '+rem(15) : 0} ;
        border: ${props => props.level === 1 ? '' : props.level === 2 ? '' : ''}
        position: relative;
        width: 100%;

      }
      `,
      FormControlLabel: styled(FormControlLabel)`
      margin: ${rem(5)} auto;
      && {
        font-size: ${rem(14)};
        color: #262626; 
        label {
          font-size: inherit;
        }
        .radio {
          margin: 0;
          padding: 0;
          font-size: inherit;
        }
        span {
          font-size: inherit;
        }
      } 
    `,
    },
  })
)((props) => {
  const {
    A,
    doc,
    filterId,
    onExpand,
    onSelect,
    type,
  } = props

  const {
    id,
    categoryName,
    subCategoryList=[],
    subSpaceList=[],
    spaceName
  } = doc

  return <>
    <A.Category level={1}>
      <A.FormControlLabel
        value={id+''}
        onChange={() => onSelect({ id: doc.id })}
        control={<Radio className={'radio'} fontSize='small' color='default' checked={filterId === doc.id} />}
        label={<span className={'label'} active={'active'}>{type==='category' ? categoryName : spaceName}</span>}
      />

      <A.Category level={2}>
        <RadioGroup
          name='test'
          value='value'
          onChange={() => {}}
        >
          {type==='category' ? subCategoryList.map((doc, index) => (
            <A.FormControlLabel
              key={index}
              onChange={() => onSelect({ id: doc.id })} value={doc.id+''}
              control={<Radio className={'radio'} fontSize='small' color='default' checked={filterId === doc.id} />}
              label={<span className={'label'}>{doc.categoryName}</span>}
            />
          )) : type==='space' ? subSpaceList.map((doc, index) => 
          <A.FormControlLabel
            key={index}
            onChange={() => onSelect({ id: doc.id })} value={doc.id+''}
            control={<Radio className={'radio'} fontSize='small' color='default' checked={filterId === doc.id} />}
            label={<span className={'label'}>{doc.spaceName}</span>}
        />
          ) : null}
        </RadioGroup>
      </A.Category>
      
    </A.Category>
  </>
})

export default compose(
  withSpace(spaceSku),
  withSpace(spaceFilterCategory),
  withSpace(spaceFilterSpace),
  withRouter,
  defaultProps({
    FormLabel: styled(FormLabel)`
      && {
        font-size: ${rem(18)};
        color: #4a4a4a;
  
      }
    `,
    FormControlLabel: styled(FormControlLabel)`
      && {
        font-size: 12px;
        color: #262626; 
        .label {
          color: ${props => props.statebutton === 'active' ? '#000' : '#262626'}
        }
        label {
          font-size: inherit;
        }
        .radio {
          margin: 0;
          padding: 0;
          font-size: inherit;
        }
        span {
          font-size: inherit;
        }
      } 
    `,
    BreadCrumps: styled.div`
      font-size: ${rem(14)};
      color: #777;
      margin: ${rem(40)} auto ${rem(40)} auto;
  `,

    FormGroup: styled(FormGroup)`
      && {
        font-size: ${rem(14)};
        color: #777;
        margin: ${rem(10)} auto;
  
      }
    `,
    SearchTagWrapper: styled.div`
      && {
        margin-left: -${rem(5)};
        margin-right: -${rem(5)};
        margin-bottom: ${rem(20)};
      }
    `,
    SearchTag: styled(ButtonBase)`
      && {
        font-size: ${rem(12)};
        color: #4a4a4a;
        border-radius: 100px;
        padding: ${rem(5)} ${rem(10)} ${rem(5)} ${rem(20)};
        margin: ${rem(5)};
        border: 1px solid ${props => props.active === 'active' ? '#eaeaea' : '#c0c0c0'} ;
        &:hover {
          background: #eaeaea;
        } 
        svg { 
          margin-left: -${rem(10)};
          margin-right: ${rem(7)};
        }
      }
    `,
    Search: styled(TextField)`
      && {
        font-size: ${rem(14)};
        fieldset {
          border: none;
        }
        input {
          border-radius: 100px;
          border: 1px solid #000;
          color: #777;
          font-size: 14px;
          padding: ${rem(5)} ${rem(15)};
        }
      }
    `,
  }),
  withStateHanlders(
    () => ({
      value: 7,
      filterCategoryId: null,
      filterSpaceId: null,
      selectedValue: '全部',
      isExpanded: false,
      idx: 0,
      tags: [],
      filters: [{type: 'category', title: '类别'}, {type: 'space', title: '适用空间'}],
      searchName:''
    }),
    {

      filterCategoryIdSet: () => (filterCategoryId) => ({ filterCategoryId }),
      filterSpaceIdSet: () => (filterSpaceId) => ({ filterSpaceId }),
      handleChange: ({}) => () => {},
      toggleExpanded: ({ isExpanded }) => (idx) => ({ isExpanded: !isExpanded, idx }),
      setSearchName: () => (name) => ({
        tags: [].concat({name}), searchName: name
      }),
      onChangeSearchName: () => (event) => ({searchName: event.target.value}),
     
    }
  ),
  withHandlers({
    querySearch: ({
      fromSku,
      searchQueries,
      setSearchName
    }) => () => {
      const {name} = searchQueries
      fromSku.querySearch(name ? { name } : {})
      setSearchName(name)
    },
    handleKeyPress: ({searchName, history}) => (event) => {
      if (event.key == 'Enter' && searchName) {
        history.push('/store?name='+searchName)
      }
    },
    removeTag: ({fromSku, setSearchName}) => () => {
      fromSku.querySearch({})
      setSearchName('')
    },

  }),

  withHandlers({
    mount: ({
      fromFilterCategory,
      fromFilterSpace,
      querySearch,
    }) => () => {
      querySearch()
      fromFilterCategory.query()
      fromFilterSpace.query()
    }

  }),
  
  lifecycle({
    componentDidMount() {
      this.props.mount()
    },
  }),

  withPropsOnChange(['searchQueries'], ({searchQueries, querySearch }) => {
    Object.keys(searchQueries).length !== 0 && querySearch()
  }),
)(
  ({
  fromSku, 
  handleChange,
  fromFilterCategory,
  fromFilterSpace,
  filterCategoryId, filterCategoryIdSet,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Search,
  BreadCrumps,
  SearchTag,
  SearchTagWrapper,
  tags=[],
  removeTag,
  searchName,
  handleKeyPress,
  onChangeSearchName,
  filterSpaceId,
  filterSpaceIdSet,
  filters
}) => {
  return (
    <Grid container justify='flex-start' alignItems={'flex-start'} spacing={40}>
      <Grid item xs={3}>
        <BreadCrumps>
          所有产品 / 私宅 / 私宅
        </BreadCrumps>

        <FormGroup row>
          <FormControlLabel
            onChange={handleChange} value='全部'
            control={<Radio fontSize='small' className={'radio'} color='default' checked={true}/>}
            label={<span className={'label'} statebutton='active'>全部</span>}
          />
          <FormControlLabel
            onChange={handleChange} value='有货'
            control={<Radio fontSize='small' className={'radio'} color='default'/>}
            label={<span className={'label'}>有货</span>}
          />
        </FormGroup>

        <FormGroup>
          <Search
            placeholder={'搜索…'}
            margin='normal'
            variant='outlined'
            value={searchName}
            onChange={onChangeSearchName}
            onKeyPress={handleKeyPress}

          />
        </FormGroup>

        {tags.length ? <SearchTagWrapper>
              {tags.map(
                (item, index) => (
                  item.name ? <SearchTag key={index} onClick={removeTag}>
                    <IconRemove style={{fontSize: 10}} />{item.name}
                  </SearchTag> : null)
                )} 

        </SearchTagWrapper> : null }

      
        <FormGroup row>
          <Grid container alignItems='stretch' direction='row' justify='space-between'>
            <Grid item xs={6}>
              <FormLabel component='legend'>类别</FormLabel>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <ButtonBase style={{ padding: '3px' }}>
                <IconRemove style={{ fontSize: 18, borderRadius: '100px' }} coloricon={'#262626'}/>
              </ButtonBase>
            </Grid>
          </Grid>

          {fromFilterCategory.orderMap.default.map((id, index) => (
            <FilterBlock
              type="category" 
              key={index}
              filterId={filterCategoryId}
              doc={fromFilterCategory.data[id]}
              onSelect={({ id }) => filterCategoryIdSet(id)}
            />

          ))}
        </FormGroup>


        <FormGroup row>
          <Grid container alignItems='stretch' direction='row' justify='space-between'>
            <Grid item xs={6}>
              <FormLabel component='legend'>适用空间</FormLabel>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <ButtonBase style={{ padding: '3px' }}>
                <IconRemove style={{ fontSize: 18, borderRadius: '100px' }} coloricon={'#262626'}/>
              </ButtonBase>
            </Grid>
          </Grid>

          {fromFilterSpace.orderMap.default.map((id, index) => (
            <FilterBlock
              type="space" 
              key={index}
              filterId={filterSpaceId}
              doc={fromFilterSpace.data[id]}
              onSelect={({ id }) => filterSpaceIdSet(id)}
            />
          ))}
        </FormGroup>



          
          
        </Grid>

  <Grid item xs={9}>
    <Grid item xs={12}>
      <Title>让设计落实的产品 {searchName ? ': '+ searchName : ''} </Title>
      <Grid container justify='center'>
        <Grid item xs={12}>
                <SkuProduct fromSku={fromSku} persistName={'search'}/>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

</Grid>
)
})
