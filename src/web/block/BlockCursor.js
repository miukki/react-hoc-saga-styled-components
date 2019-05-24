import { Grid }             from '@material-ui/core'

import React                from 'react'
import posed                from 'react-pose'
import { withRouter }       from 'react-router-dom'

import compose              from 'recompose/compose'
import lifecycle            from 'recompose/lifecycle'
import withStateHandlers    from 'recompose/withStateHandlers'
import withHandlers         from 'recompose/withHandlers'
import defaultProps         from 'recompose/defaultProps'
import withPropsOnChange    from 'recompose/withPropsOnChange'

import styled               from 'styled-components'


import withSpace            from 'evoke-me/space/all/withSpace'
import spaceStoryImage      from 'app/melody/storyImage/space/spaceStoryImage'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'

import Container            from './Container'
import Content              from './Content'
import Link                 from './Link'

import { IconBar }          from '../icons'
import { rem }              from 'polished'
import { mediaGrid }        from '../mui'

import Sidebar              from '../section/Sidebar'
import Poster               from '../section/Poster'
import Home                 from '../section/Home'
import Header               from '../section/Header'
import Footer               from '../section/Footer'
import Tagline              from '../section/Tagline'

const GridResponsive = styled(Grid)`
  text-align: left;
  &.right {
    text-align: right;
  }

  ${mediaGrid(`md`)}{//sm tablet
    text-align:center;
    &.right {
      text-align:center;
    }
    >div {
      padding: ${rem(10)} 0;
    }
  }
  ${mediaGrid(`sm`)}{//xs phone
    text-align:center;
    &.right {
      text-align:center;
    }
    >div {
      padding: ${rem(10)} 0;
    }
  }

`

const Block = styled(Container)`
  position: relative;
`

const Slogan = styled.div`
  && {
    text-align: center;
    font-size: ${rem(36)};
    white-space: nowrap;
  }
`

const StyledBg = styled(
  posed.div({
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  })
)`
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

const Background = styled.div`
  height: 100vh;
  display: flex;
  width: 100%;
  position: absolute;
`

const BgList = ({ stories, storyId, orderMap, nextStoryIdx }) => {
  return orderMap.map((id, index) => {
    const story = stories[id]
    const url  = story.imageUrl || `https://i.imgur.com/h1VYEmT.jpg`

    return (
      <StyledBg
        key={id}
        pose={(id === storyId || index === nextStoryIdx) ? `show` : `hide`}
        style={{ backgroundImage: `url(${url})` }}
      />
    )
  })
}


const enhance = compose(
  defaultProps({
    LinkInline: styled(Link)`
      display: inline-block;
    `
    }),

  withSpace(spaceAuth),
  withSpace(spaceStoryImage),
  withRouter,
  withStateHandlers(
    () => ({
      index: 0,
      timerId: 0,
      firstStoryId: null,
      randomImageIndex: null,
      randomStoryId: null,
      nextStoryIdx: null,
      intervalList: [],
      queryName: '',
      isOpenPopup: false

    }),
    {
      nextStoryIdxSet: () => (nextStoryIdx, nextStoryId) => ({nextStoryIdx, randomStoryId: nextStoryId}),

      currentBackgroundSet: () => (firstStoryId, randomImageIndex, randomStoryId) => ({
        firstStoryId, randomImageIndex, randomStoryId, nextStoryIdx: null
      }),

      indexSet: () => (index) => {
        return ({ index })
      },

      setQueryName: () => (queryName) => {
        return {queryName}
      },



    },
  ),
  withHandlers(() => {
    return ({

      setNewStoryId: ({ nextStoryIdx, nextStoryIdxSet, fromStoryImage, intervalList }) => (inc) => {
        for (let id of intervalList) {
          clearInterval(id)
        }

        const { orderMap } = fromStoryImage

        if (orderMap.default.length) {
          const idx = orderMap.default[nextStoryIdx] !== undefined ? nextStoryIdx + inc : inc > 0 ? 0 : orderMap.default.length - 1
          const nextIdx = idx > orderMap.default.length - 1 ? 0 : idx
          const nextStoryId = orderMap.default[nextIdx]
          nextStoryIdxSet(nextIdx, nextStoryId)
        }
      },
      next: ({ currentBackgroundSet, fromStoryImage }) => () => {
        const { data, orderMap } = fromStoryImage
        if (orderMap.default.length) {
          const [, id] = orderMap.default
          const { storyImageProductList } = data[id]
          const index = Math.floor(Math.random() * storyImageProductList.length)
          const indexOrderMap = Math.floor(Math.random() * orderMap.default.length)
          const idOrderMap = orderMap.default[indexOrderMap]
          currentBackgroundSet(id, index, idOrderMap)
        }
      },
    })
  }),
  withHandlers({
    startAnimation: ({next, intervalList}) => () => {
      intervalList.push(setInterval(() => {
        next()
      }, 5000))
    },
    stopAnimation: ({intervalList}) => () => {
      for (let id of intervalList) {
        clearInterval(id)
      }
    },
  }),
  withHandlers(({ intervalList }) => {
    return ({

      moveToIndexPage: ({history}) => () => {
        history.push('/')
      },

      mount: ({
        fromFilterCategory,
        startAnimation,
        fromStoryImage,
        fromSku,
        fromFilterSpace,
        next,
        index,
      }) => () => {
        fromStoryImage.query()
        if (index === 0 ) {
          startAnimation()
        }
      },

      unmount: ({stopAnimation}) => () => {
        stopAnimation()
      },


    })
  }),
  lifecycle({
    componentDidMount() {
      const {params} = this.props
      const index = params && params.param === 'expanded' ? 3 : 0;

      this.props.indexSet(index)
      this.props.mount()
    },
    componentWillUnmount() {
      if (this.props) {
        this.props.unmount()
      }
    },
    componentDidUpdate(prepProps) {
      const {index, startAnimation, stopAnimation} = this.props
      if(index !== prepProps.index) {
        stopAnimation()
        if(index === 0) {
          startAnimation()
        }
      }
    }
  }),

  withPropsOnChange(['params'], ({params, indexSet}) => {
    indexSet(params && params.param === 'expanded' ? 3 : 0)
  }),

)

const BlockAnimated = enhance(props => {
  const {
    firstStoryId,
    randomStoryId,
    nextStoryIdx,
    height,
    index,
    indexSet,
    toggleVisibility,
    fromStoryImage,
    setQueryName,
    LinkInline,
    moveToIndexPage,
    setNewStoryId
  } = props

  return (

    <React.Fragment>

        <Block>

          {/* Index */}
          <Content current={index} index={0} height={height} >

            <Background>
              <BgList
                  stories={fromStoryImage.data} storyId={randomStoryId || firstStoryId} orderMap={fromStoryImage.orderMap.default} nextStoryIdx={nextStoryIdx}
                />
            </Background>

            <Poster height={height}>

              <Header setQueryName={setQueryName} cursor={true} />

              <Tagline>

                  <GridResponsive item xs={12} sm={12} md={4}>
                    <Link
                      content='物'
                      size='medium'
                      onClick={() => {indexSet(1)}}
                    >
                      {'物'}
                    </Link>
                  </GridResponsive>

                  <GridResponsive item xs={12} sm={12} md={4}>
                    <Slogan>
                      <LinkInline
                        content='人'
                        size='medium'
                      >
                        {'汇集人与'}
                      </LinkInline>
                      <LinkInline
                        content='物'
                        size='medium'
                      >
                        {'物的空间'}
                      </LinkInline>
                    </Slogan>
                  </GridResponsive>

                  <GridResponsive item xs={12} sm={12} md={4} className={'right'} >
                    <Link
                      content='查看,设计师,作品'
                      size='medium'
                      onClick={() => {indexSet(2)}}
                    >
                      {'人'}
                    </Link>
                  </GridResponsive>

              </Tagline>
 
              <Footer setNewStoryId={setNewStoryId} cursor={true} {...props} chosenStory={fromStoryImage.data[randomStoryId || firstStoryId]} />

              </Poster>

          </Content>

          <Content position={'left'} current={index} index={1} width='60%' height={height}>
            <Sidebar cursor={true} indexSet={indexSet} height={height} position={'left'} color='rgb(0, 58, 83)' chosenStory={fromStoryImage.data[randomStoryId || firstStoryId]}
            />
          </Content>

          <Content position={'right'} current={index} index={2} width='60%' height={height}>
            <Sidebar cursor={true} indexSet={indexSet} height={height} position={'right'} color='#A89563'
            />
          </Content>

        </Block>

    </React.Fragment>

  )
})

export default BlockAnimated
