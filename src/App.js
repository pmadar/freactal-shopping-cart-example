import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { provideState, injectState } from "freactal";

const wrapComponentWithState = provideState({
  initialState: () => ({
    products: {
      id1: {
        name: 'Produkt 1'
      },
      id2: {
        name: 'Produkt 2'
      },
      id3: {
        name: 'Produkt 3'
      }
    },
    cart: {}
  }),
  effects: {
    addToCart: (effects, { productId }) => state => ({
      ...state,
      cart: {
        ...state.cart,
        [productId]: {
          count: state.cart[productId] ? state.cart[productId].count + 1 : 0
        }
      }
    }),
    removeFromCart: (effects, { productId }) => state => ({
      ...state,
      cart: {
        ...state.cart,
        [productId]: {
          count: (state.cart[productId] && state.cart[productId].count > 0)
            ? state.cart[productId].count - 1
            : 0
        }
      }
    })
  },
  computed: {
    getProductDetail: ({ products }) => productId => ({
      id: productId,
      name: products[productId].name
    }),
    productsList: ({ products, getProductDetail }) => Object.keys(products).map(productId => ({
      ...getProductDetail(productId),
      id: productId
    })),
    cartList: ({ cart, getProductDetail }) => Object.keys(cart).map(productId => ({
      ...getProductDetail(productId),
      ...cart[productId],
      id: productId
    }))
  }
});

const Shop = injectState(({ state, effects }) => {
  return (
    <div>
      <h4>Cart:</h4>
      {state.cartList.map(({ id, name, count }) =>
        <div key={id}>
          <p>{name}: <strong>{count}</strong></p>
        </div>)}
      <h4>Shop:</h4>
      {state.productsList.map(({ id }) =>
        <ProductDetail
          key={id}
          {...state.getProductDetail(id)}
          addToCart={effects.addToCart}
          removeFromCart={effects.removeFromCart}
        />)}
    </div>
  )
});

const ProductDetail = ({ id, name, addToCart, removeFromCart }) =>
  <div>
    <h3>{name}</h3>
    <p>
      <a onClick={() => addToCart({ productId: id })}>Add one to cart</a>
    </p>
    <p>
      <a onClick={() => removeFromCart({ productId: id })}>Remove one from cart</a>
    </p>
  </div>

export default wrapComponentWithState(Shop);
