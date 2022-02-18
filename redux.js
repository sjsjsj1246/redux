export function createStore(reducer, middleware = []) {
  let state;
  const handler = [];

  function dispatch(action) {
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    })
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    handler.push(listener);
  }

  let lastDispatch = dispatch;
  
  const store = {
    getState,
    subscribe
  }

  middleware = Array.from(middleware).reverse();

  middleware.forEach((mid) => {
    lastDispatch = mid(store)(lastDispatch);
  })

  return {...store, dispatch: lastDispatch};
}
