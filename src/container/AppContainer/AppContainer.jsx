import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../pages/Home'

const AppContainer = () => {
  return (
    <Switch>
      <Route path='/:dir' component={Home} />
      {/*<Route exact path='/home/:dir' component={DirectoryListener} />*/}
      <Redirect from='/' to='/home' />
    </Switch>
  )
}

export default AppContainer
