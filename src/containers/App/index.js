import React, { Component }   from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes                    from 'prop-types'
import * as providerActionCreators from 'core/actions/actions-provider'
import * as fileActionCreators from 'core/actions/actions-files'
import { MuiThemeProvider }   from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import theme                    from 'configs/theme/config-theme'
import HomeView                 from 'containers/HomeView'
import SharedFilesView          from '../SharedFilesView'
import Header                   from './components/Header'
import LeftDrawer               from './components/LeftDrawer'

import './styles.scss' // global styles

class App extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.provider.setProvider()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div>
            <Header />
            <LeftDrawer />
            <div className="app-shell">
              <Switch>
                <Route path="/home" component={HomeView} />
                <Route path="/shared" component={SharedFilesView} />
                <Redirect from="/" to="/home" />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  actions: PropTypes.shape({}).isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch),
      files: bindActionCreators(fileActionCreators, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
