import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

import React from 'react'
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import TasksHome from 'components/tasks_home';

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ApolloProvider client={client}>
      <TasksHome />
    </ApolloProvider>,
    document.body.appendChild(document.createElement('div')),
  )
});
