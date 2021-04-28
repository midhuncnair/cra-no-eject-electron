import React from 'react';
import {
  HashRouter as Router,  // BrowserRouter won't work with electron.
} from "react-router-dom";
import AppRouting from './app-routing';

const App: React.FC = () => {
  // console.info("Electron should get require ", (window as any).require);

  return (
    <Router>
      <AppRouting></AppRouting>
    </Router>
  );
}

export default App;
