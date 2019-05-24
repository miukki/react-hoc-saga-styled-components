import React, {Component} from 'react';

import styled from 'styled-components';
import {rem} from '../../mui'

import {compose} from 'recompose'

import {IconCart, IconLike, IconUser} from '../../icons'
import {Link} from 'react-router-dom'
import {defaultProps} from 'recompose'

const Card = styled.div`
  color: #4a4a4a;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: 1.4px;

  svg {
    color: #262626;
  }

  img {
    max-width: 100%;
    max-height: 85%;
  }
`;

const CardImg = styled.div`
    position: relative;
    height: ${rem(360)};
    text-align: center;
`;

const CardButtons = styled.div`
    position: absolute;
    text-align: right;
    right: 0;
    bottom: ${rem(4)};
`;

const CardTitle = styled.div`
    margin-bottom: ${rem(13)};
    font-size: ${rem(18)};
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: ${rem(1.4)};

    a {
      text-decoration: none;
      color: #4a4a4a;
      font-size: ${rem(18)};
    }
`;

const CardTags = styled.div`
    margin-top: .7em;
    margin-bottom: ${rem(8)};
    font-size: ${rem(14)};
    font-weight: 300;
    //line-height: rem(22);
    line-height: 1.57;
    letter-spacing: 1.1px;
    color: #262626;
    a {
      display: block;
    }
`;

const CardPrice = styled.div`
    font-size: ${rem(14)};
    font-weight: 300;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: 1.1px;
    color: #262626;
`;

const enhance = compose(
  defaultProps({
    Link: styled(Link)`
      && {
        text-decoration: none;
        color: #262626;
        a {
          text-decoration: none;
          color: #262626;

        }
      }
      `,
  })
)
const ProductCard = enhance(({ Link, imageUrl = '', author='by Harry-Paul',name, priceMin, priceMax, currency = '¥', tags = ['foo', 'bar'], id, isStoreList=false }) => {

  
    return (
      <Card>
        <CardImg>

          <Link to={'/store/'+id}  >
            <img src={imageUrl} alt={name}/>
          </Link>
          <CardButtons>
            <IconCart coloricon={'#262626'} style={{ width: 16 }}/>
            <IconLike coloricon={'#262626'} style={{ width: 16 }}/>
            <IconUser coloricon={'#262626'} style={{ width: 16 }}/>
          </CardButtons>
        </CardImg>
        <CardTitle>
          <a href="#">{name}</a>
        </CardTitle>
        <CardTags>
          {author}
          {/* {tags.map((title, key) => ({title}))} */}
        </CardTags>

        {isStoreList && <React.Fragment><CardTags>
          Dedon
        </CardTags>
        <CardTags>
          Garden Lounger          
        </CardTags>
        </React.Fragment>}

        <CardPrice>
          <Link to={'/store/'+id}  >
            {currency} {priceMin}-{priceMax}
          </Link>
        </CardPrice>
      </Card>

    )
  }
)

export default ProductCard;
