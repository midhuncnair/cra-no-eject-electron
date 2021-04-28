import React from 'react';
import logo from './logo.svg';
import './default.dumb.css';
import { Link } from 'react-router-dom';
import Counter from '../counter.redux-demo/counter';


const DefaultDumb: React.FC = () => {
  return (

    <div className="default">
      <div>
        <ul>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </div>
      <header className="default-header">
        <img src={logo} className="default-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/default.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="default-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="default-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="default-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="default-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default DefaultDumb;
