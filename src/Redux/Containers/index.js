import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { App } from '../../Pages';
import { logout } from '../Actions/Login';

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}

const AppContainer = withRouter(connect(null, mapDispatchToProps)(App));
export { AppContainer };
