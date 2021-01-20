
import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import {Provider} from "react-redux";
import {createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import Navbar from '../src/components/Navbar'
import Home from '../src/components/Home'
import Register from '../src/components/Register'
import Login from '../src/components/Login';
import Comments  from '../src/components/Comments';
import postReducer from './redux/reducers/postReducer.js'
import signUpReducer from './redux/reducers/signUpReducer.js'
import commentReducer from './redux/reducers/commentReducer.js'
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const rootReducer = combineReducers({
  posts:postReducer,
  signUp:signUpReducer,
  comments:commentReducer
})
const store = createStoreWithMiddleware(rootReducer);


function App(props) {

  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
         <Navbar/>
         <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/posts/:userId" component={Comments} />
         </Switch>
      </BrowserRouter>
     
    </div>
    </Provider>
  );
}




export default App;
// export default Home;
