import { createStore, applyMiddleware, compose } from 'redux'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        user: {
          id: action.payload.userId,
        },
      }
    case 'UPDATE_USER':
      return {
        user: {
          id: state.user.id,
          name: action.payload.userName,
        }
      }
    default:
      return {}
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = ({ initialState = {} } = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...[])),
  )

  store.dispatch({
    type: 'ADD_USER',
    payload: { userId: 10 },
  })

  store.dispatch({
    type: 'UPDATE_USER',
    payload: { userName: 'Bogan' },
  })

  if (module.hot) {
    // module.hot.accept('./reducers', () => {
      // const next = require('./reducers')

      // store.replaceReducer(next.createReducer())
    // })
  }

  return store
}
