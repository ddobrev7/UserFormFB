import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuccessPage from './components/SuccessPage';
import reportWebVitals from './reportWebVitals';
import App from './components/App';

const RootApp = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/SuccessPage" element={<SuccessPage />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <RootApp />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
