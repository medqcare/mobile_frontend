import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/stores/reducers';
import store from './src/stores';
import Navigation from './src/navigation';
import { View } from 'react-native';

// const store = createStore(reducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ backgroundColor: '#1F1F1F', flex: 1 }}>
        <Navigation></Navigation>
      </View>
    </Provider>
  );
}
