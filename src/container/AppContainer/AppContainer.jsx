import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../pages/Home'

const AppContainer = () => {
  return (
    <Switch>
      <Route path='/home' component={Home} />
      <Redirect from='/' to='/home' />
    </Switch>
  )
}

export default AppContainer
