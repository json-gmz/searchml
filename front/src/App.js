import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store/store';
import routes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/App.css';

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <main>
                    {routes}
                </main>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;