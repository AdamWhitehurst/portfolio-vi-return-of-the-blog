import {
  ApolloClient, ApolloLink, ApolloProvider,

  createHttpLink, InMemoryCache
} from '@apollo/client';
import Amplify, { Auth } from 'aws-amplify';
import { AUTH_TYPE } from 'aws-appsync';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import {
  WASMCanvas
} from 'comp';
import { useAuth } from 'hook';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import awsconfig from './aws-exports';
import './index.css';
import * as serviceWorker from './serviceWorker';

Amplify.configure({ ...awsconfig });

const WithProvider = () => {
  const isAuth = useAuth();

  const url = awsconfig.aws_appsync_graphqlEndpoint;
  const region = awsconfig.aws_appsync_region;
  // "Multi-auth"
  const auth = isAuth ? ({
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    credentials: Auth.currentCredentials(),
    jwtToken: async () => {
      try {
        const res = await Auth.currentSession();
        return res.getIdToken().getJwtToken();
      } catch (e) {
        return '';
      }
    },
  }) : ({
    type: AUTH_TYPE.AWS_IAM,
    credentials: Auth.currentCredentials(),
  });

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink(url, createHttpLink({ uri: url })),
  ]);

  const client = new ApolloClient(
    {
      link,
      cache: new InMemoryCache(),
    },

  );

  return (
    <ApolloProvider client={client}>
      <App />
      {/* This (canvas element) Component is required by
      bracket-lib wasm module to exist at all times once
      the module is loaded. RoguieCanvas Component handles
      displaying and hiding this element. */}
      <WASMCanvas />
    </ApolloProvider>
  );
};

ReactDOM.render(<WithProvider />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// window.onbeforeunload = (e) => {
//   // Cancel the event
//   e.preventDefault();
//
//   // Chrome requires returnValue to be set
//   e.returnValue = 'Really want to quit the game?';
// };

// Prevent Ctrl+S (and Ctrl+W for old browsers and Edge)
window.onkeydown = (event) => {
  const e = event || window.event;// Get event

  if (!e.ctrlKey) return;

  const code = e.which || e.keyCode;// Get key code

  switch (code) {
    case 83:// Block Ctrl+S
    case 87:// Block Ctrl+W -- Not work in Chrome and new Firefox
      e.preventDefault();
      e.stopPropagation();
      break;
    default:
      break;
  }
};
