import React from 'react';
import logo from '../logo.svg';
import '../styles/body.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Status from './Status';
import Modes from './Modes';
import Edit from './Edit';

import appStateStore from '../stores/appStateStore';
import {observer} from 'mobx-react-lite'

function Body() {
  return (
    <div className='body'>
        <Sidebar />
        {
          appStateStore.state.page == "status"?(<Status/>):
          appStateStore.state.page == "modes"?(<Modes/>):
          (<Edit/>)
        }
    </div>
  );
}

export default observer(Body);
