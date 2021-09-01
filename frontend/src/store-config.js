import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers';

// Mount it on the Store
const store = createStore(rootReducer)

export default store;