import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import store from './store';
import history from './history';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import './styles/base.sass';

render(
  <Provider store={store}>
    <I18nextProvider i18n={ i18n }>
      <Router
        history={history}
        routes={routes}
        onUpdate={() => window.scrollTo(0, 0)}
      />
    </I18nextProvider>
  </Provider>, document.getElementById('app'));

