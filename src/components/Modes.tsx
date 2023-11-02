import React from 'react';
import '../styles/modes.css';

import {observer} from 'mobx-react-lite';
import appStateStore from '../stores/appStateStore';
import ModesList from './sections/modeslist';

const Modes = observer(() => {
  return (
    <div className='modesWrapper'>
        <ModesList />
    </div>
  );
})

export default Modes;
