import React from 'react';
import play from '../images/check-circle.svg';
import '../styles/status.css';
import StatusSection from './sections/statusSection';
import PhaseDescriptionSection from './sections/phaseDescriptionSection';

import {observer} from 'mobx-react-lite';
import statusStore from '../stores/statusStore';
import appStateStore from '../stores/appStateStore';

const Status = observer(() => {
  return (
    <div className='statusWrapper'>
      <StatusSection />
      <PhaseDescriptionSection />
      <div className="control_pannel">
        <button type='button' className='button_start' 
          onClick={()=>{
            statusStore.start(appStateStore.state.modeRunning.id)}
          }>Start</button>
        <button type='button' onClick={statusStore.pause}>Pause</button>
        <button type='button' onClick={statusStore.cancel}>Stop</button>
      </div>
    </div>
  );
})

export default Status;
