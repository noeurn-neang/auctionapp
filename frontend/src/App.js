import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import store from './store-config';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
