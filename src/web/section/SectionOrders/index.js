import React, {Component} from 'react'

import compose from 'recompose/compose'
import {defaultProps} from 'recompose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import withStateHandlers    from 'recompose/withStateHandlers'

import {withRouter} from "react-router-dom"
import {Link} from 'react-router-dom'

import styled from 'styled-components'
import {rem} from '../../mui'
import {withStyles, Grid, Typography, ButtonBase, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, FormGroup, FormHelperText } from '@material-ui/core'

import {IconDelete, IconPlus, IconMinus} from "../../icons"

import BasePopUp from '../BasePopUp';

import withSpace            from 'evoke-me/space/all/withSpace'
import spaceAuth            from 'app/melody/auth/space/spaceAuth'



const Steps = styled.div`
  display: flex;
  align-content: space-between;
  position: relative;
`

const Step = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  margin-top: ${rem(64)};
  
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #ae3e38;
    bottom: ${rem(11)};
    left: 0;
    z-index: 0;
  }
  
  &:last-child {
    &:after {
      width: 50%;
    }
  }
  
  &:first-child {
    &:after {
      width: 50%;
      left: inherit;
      right: 0;
    }
  }
`

const StepTitle = styled.div`
  font-size: ${rem(16)};
  letter-spacing: 0.7px;
  color: #000000;
  margin-bottom: ${rem(6)};
`

const StepIndicator = styled.div`
  position: relative;
  display: inline-block;
  width: ${rem(14)};
  height: ${rem(14)};
  border: 1px solid #ae3e38;
  border-radius: 100%;
  background-color: ${props => props.active ? '#ae3e38' : 'white'};
  z-index: 10;
`

const GridOrdersHeader = styled(Grid)`
  padding: ${rem(25)} 0;
  border-bottom: 1px solid #dedede;
  font-size: ${rem(18)};
  line-height: 1.33;
  letter-spacing: 1.4px;
  color: #9b9b9b;
  text-align: center;
  width: 100%; 
  
  > div {
    flex-grow: 1;
  }
`;

const GridOrdersRow = styled(Grid)`
  padding: ${rem(25)} 0;
  border-bottom: 1px solid #dedede;
  font-size: ${rem(16)};
  line-height: 1.5;
  letter-spacing: 1.2px;
  color: #9b9b9b;
  text-align: center;
  width: 100%; 
  
  > div {
    flex-grow: 1;
  }
`;

const GridOrdersPopUpFooter = styled.div`
  padding: ${rem(20)} ${rem(8)};
  background-color: #f1f1f1;
  font-size: ${rem(20)};
  letter-spacing: 1.4px;
  color: #9b9b9b;
  text-align: right;
  margin-bottom: ${rem(97)};
`;

const OrdersTotal = styled.div`
  position: relative;
  background-color: #f1f1f1;
  padding: ${rem(21)} ${rem(140)} ${rem(21)} ${rem(37)};
  font-size: ${rem(18)};
  letter-spacing: 1.3px;
  color: #9b9b9b;
  margin-bottom: ${rem(42)};
`;

const OrdersTotalVal = styled.span`
  color: #4a4a4a;
`;

const SubmitBtn = styled(ButtonBase)`
  && {
    display: inline-block;
    position: absolute;
    padding: ${rem(21)} ${rem(62)};
    background-color: #ae3e38;
    color: white;
    right: 0;
    top: 0;
    height: 100%;
  }
`;

const RemoveBtn = styled(ButtonBase)`
  && {
     width: ${rem(11)};
     height: ${rem(11)};
  }
`;


const IconDeleteStyled = styled(IconDelete)`
  && {
     width: auto;
     height: auto;
  }
`

const CounterBtn = styled(ButtonBase)`
  && {
    width: ${rem(36)};
    height: ${rem(36)};
    padding: 0;
    color: #9b9b9b;
    border: 1px solid #9b9b9b;
  }
`

const Counter = (props) => {
  return (
    <Grid container justify="space-between" alignItems="center" {...props}>
      <Grid item>
        <CounterBtn><IconMinus style={{ width: '0.5em', height: '0.5em' }}/></CounterBtn>
      </Grid>
      <Grid item>
        1
      </Grid>
      <Grid item>
        <CounterBtn><IconPlus style={{ width: '0.5em', height: '0.5em' }}/></CounterBtn>
      </Grid>
    </Grid>
  )
}

const CheckboxStyled = styled(Checkbox)`
  && {
    padding: 0;
    > span {
      color: #9B9B9B
    }
    
    svg {
      width: ${rem(15)};
      height: ${rem(15)};
    }
  }
`

const Address = styled.div`
  padding: ${rem(20)};
  background-color: #f1f1f1;
  color: #9b9b9b;
`;


const BaseRadio = withStyles({
  root: {
    color: '#408bf9',
  },
})(Radio)


const ParagraphLink = styled.a`
  color: black;
  text-decoration: underline;
`;

const enhance = compose(
  withSpace(spaceAuth),
  withRouter,
  withStateHandlers(
    () => ({
      isOpenPopup: false,
    }),
    {
      togglePopup: ({isOpenPopup}) => () =>({isOpenPopup: !isOpenPopup}),
    }
  ),
  defaultProps({
    A: {
      Link: styled(Link)`
        && {
          a{
            color: #d5b6a0;

          }
        }
      `,

      PopUpContainer: styled.div`
      && {
        padding: ${rem(40)};
      }
    `,
      FormControl: styled(FormControl)`
      && {
      }
      `,
      PopUpFooter: styled.div`
        margin-top: ${rem(40)};
        border-top: 1px solid #f3f3f3;
        padding: ${rem(15)};
        text-align: center; 
      `,

      SubmitButton: styled(ButtonBase)`
        && {
          background-color: black;
          color: white;
          font-weight: 700;
          padding: ${rem(15)} ${rem(60)};
        }
      `,
      Title: styled(Typography)`
        && {
          font-size: ${rem(24)};
          font-weight: normal;
          line-height: 1.56;
          letter-spacing: 1.7px;
          color: #4a4a4a;
          text-align: center;
          margin-top: ${props => props.margintop !== undefined ? rem(props.margintop) : rem(100)};
          margin-bottom: ${props => props.marginbottom !== undefined ? rem(props.marginbottom) : rem(49)};
        }
      `,
    }

  }),


  // todo: test code for testing checkboxes
  withState('selected', 'setSelected', false),

  withHandlers({
    toggleSelected: ({ selected, setSelected }) => () => setSelected(!selected)
  })
)

const SectionOrders = enhance(({ Title, selected, toggleSelected, togglePopup, isOpenPopup, fromAuth, A }) => {
  return (
    <React.Fragment>

      <BasePopUp togglePopup={togglePopup} isOpenPopup={isOpenPopup} sessionKey={fromAuth.sessionKey} closeButton={true} >        
        <React.Fragment>

        <A.PopUpContainer>

            <FormControl component="fieldset" error={true}>
              <FormLabel component="legend">以某些文本错误为例</FormLabel>
              <RadioGroup
                aria-label="female"
                name="商品信息"
                value={'female'}
                onChange={() => {}}
              >
                <FormControlLabel value="female" control={<Radio />} label="商品信息" />

              </RadioGroup>


              <FormGroup style={{marginLeft: 20}}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={'1'} onChange={()=>{}} value="1" />
                    }
                    label="商品信息"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={'2'}  onChange={()=>{}}  value="2" />
                    }
                    label={(
                      <div>
                        商品信息 <A.Link to="/store" ><a>商品信息</a></A.Link>
                      </div>
                    )}
                  />
              </FormGroup>

              <FormHelperText>您可以显示错误</FormHelperText>

            </FormControl>
            

        </A.PopUpContainer>


        <A.PopUpFooter>
          <A.SubmitButton>商品</A.SubmitButton>
        </A.PopUpFooter>

        </React.Fragment>
      </BasePopUp>

     
      <Steps>
          <Step>
            <StepTitle>加入购物车</StepTitle>
            <StepIndicator active={true}/>
          </Step>
          <Step>
            <StepTitle>加入购物车</StepTitle>
            <StepIndicator active={false}/>
          </Step>
          <Step>
            <StepTitle>加入购物车</StepTitle>
            <StepIndicator active={false}/>
          </Step>
          <Step>
            <StepTitle>加入购物车</StepTitle>
            <StepIndicator active={false}/>
          </Step>
      </Steps>

{/* first step */}
      <A.Title>商品信息</A.Title>

      <GridOrdersHeader container justify="space-between" alignItems="center">
        <Grid item>
          <CheckboxStyled
            checked={selected}
            onChange={() => toggleSelected(true)}
            value={'selected'}
          />
        </Grid>
        <Grid item>产品</Grid>
        <Grid item>型号</Grid>
        <Grid item>颜色</Grid>
        <Grid item>面料</Grid>
        <Grid item>数量</Grid>
        <Grid item>价格</Grid>
        <Grid item></Grid>
      </GridOrdersHeader>

      <GridOrdersRow container justify="space-between" alignItems="center">
        <Grid item>
          <CheckboxStyled
            checked={selected}
            onChange={() => toggleSelected(true)}
            value={'selected'}
          />
        </Grid>
        <Grid item>img</Grid>
        <Grid item>Slim Line</Grid>
        <Grid item>白蜡木</Grid>
        <Grid item>CURL CATEGORY B</Grid>
        <Grid item>
          <Counter/>
        </Grid>
        <Grid item>￥15000.00</Grid>
        <Grid item><RemoveBtn><IconDeleteStyled/></RemoveBtn></Grid>
      </GridOrdersRow>

      <GridOrdersRow container justify="space-between">
        <Grid item>
          <CheckboxStyled
            checked={selected}
            onChange={() => toggleSelected(true)}
            value={'selected'}
          />
        </Grid>
        <Grid item>img</Grid>
        <Grid item>Slim Line</Grid>
        <Grid item>白蜡木</Grid>
        <Grid item>CURL CATEGORY B</Grid>
        <Grid item>
          <Counter/>
        </Grid>
        <Grid item>￥15000.00</Grid>
        <Grid item><RemoveBtn><IconDeleteStyled/></RemoveBtn></Grid>
      </GridOrdersRow>

      <GridOrdersPopUpFooter>商品金额: 30000.00</GridOrdersPopUpFooter>
      <OrdersTotal>
        <Grid container justify="space-between">
          <Grid item>
            已经选购了2件商品
          </Grid>
          <Grid item>
            <OrdersTotalVal>商品金额: 30000.00</OrdersTotalVal>

            <SubmitBtn>去结算</SubmitBtn>

          </Grid>
        </Grid>
      </OrdersTotal>


{/* second step     */}
<A.Title>商品信息</A.Title>

<Address>
  <BaseRadio
    checked={true}
    value="e"
    color="default"
    name="radio-button-demo"
    aria-label="E"
  />
  Location: city New York street 124 <A.Link to="/store"><a>商品信息</a></A.Link> | <A.Link to="/store"><a>商品信息</a></A.Link>
</Address>




    </React.Fragment>

  )
})

export default SectionOrders