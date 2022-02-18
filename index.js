import { createStore } from "./redux.js";

const COUNTER = 'count'

const middleware1 = (store) => (dispatch) => (action) => {
  if(action.type === 'fetch') {
    setTimeout(() => {
      dispatch({
        type: 'fetch',
        payload: [
          1,2,3
        ]
      })
    }, 1000)
  } else {
    dispatch(action)
  }
}

function reducer(state, action) {
  if(action.type === COUNTER) {
    return {...state, counter: action.payload.counter}
  }
  if(action.type === 'fetch') {
    return {...state, fetch: action.payload}
  }
  return state;
}

function listener() {
  console.log(store.getState())
}

function actionCreator(type, payload) {
  return { type, payload }
}

function counter(data) {
  store.dispatch(actionCreator(COUNTER, {counter: data}));
}

const store = createStore(reducer, [middleware1]);

store.subscribe(listener);

counter(1)

store.dispatch(actionCreator('fetch'))

counter(2)
