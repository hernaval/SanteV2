import React from 'react';
import {StyleSheet} from 'react-native'
import Search from './assets/component/Search'
import TestFlexBox from './assets/component/TestFlexBox'
import Login from './assets/component/Login'
import ActiveAccount from './assets/component/ActiveAccount'
import SignUp from './assets/component/SignUp'
import SignUpDoc from './assets/component/SignUpDoc'
import ValidSignUpDoc from './assets/component/ValidSignUpDoc'
import Home from './assets/component/Home'
import Navigation from './assets/Navigation/navigation'
import store from "./assets/Store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
    <Navigation/>     
  </Provider>   
  );
}

