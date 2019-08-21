import React, { Component } from 'react'
// import {Icon} from 'native-base'
import {Provider} from 'react-redux'
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'

import HomeScreen from './src/app/HomeScreen'
import AddKaryawanScreen from './src/app/AddKaryawanScreen'
import DetailKaryawanScreen from './src/app/DetailKaryawanScreen'

// import ProfileScreen from './src/app/ProfileScreen'


import STORE from './src/store/reducers/index'

const KaryawanStack = createStackNavigator(
  {
    ListKaryawan: HomeScreen,
    AddKaryawan: AddKaryawanScreen,
    DetailKaryawan: DetailKaryawanScreen
  },
  {
    headerMode: 'none'
  }
)

const RootStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Main: KaryawanStack
  },
  {
    headerMode: 'none'
  }
)
const AppContainer = createAppContainer(RootStack)

class App extends Component {
  render() {
    return (
      <Provider store={STORE}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App