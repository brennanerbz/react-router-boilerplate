/* eslint-env browser */
/* global process */

// ------- PARENT: CLIENT.JS ---//

import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import cookie from './utils/cookie';
import routes from './routes';
import { routerStateChange } from './actions/router';
import { createRedux } from './store/redux';

const store = createRedux((process.env.NODE_ENV === 'production')
  ? window.__INITIAL_STATE__
  : { auth: { token: cookie.get('token') || '' } });

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <Provider store={store}>
        <Router
          history={this.props.history}
          routes={routes(store, true)}

          onUpdate={() => {
            store.dispatch(routerStateChange(this.state));
          }}
        />
      </Provider>
    );
  }
}


// ------ CHILD: /ROUTES/INDEX.JS ----//