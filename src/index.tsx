import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Loader from './components/Loader';
import { store } from './store/store';
import './utils/i18n';
import "./firebase";
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>
);
