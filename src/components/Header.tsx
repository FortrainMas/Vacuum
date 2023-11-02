import React from 'react';
import play from '../images/check-circle.svg';
import pause from '../images/pause.svg'
import '../styles/header.css';


import appStateStore from '../stores/appStateStore';
import statusStore from '../stores/statusStore';
import { observer } from 'mobx-react-lite';


const Header = observer(() => {
  console.log(statusStore.status.running)
  return (
    <header className="header">
        <h1 className='logo'>VACUUM</h1>
        {
          statusStore.status.running == "paused"?(
              <div className="isRunning">
                <img src={pause} alt="pause" />
                <p>Paused</p>
            </div>
          ):statusStore.status.running == "running"?(
            <div className="isRunning">
                <img src={play} alt="play" />
                <p>Running</p>
            </div>
          ):(
          <div className="isRunning">
            <img src={pause} alt="play" />
            <p>Stopped</p>
          </div>
          )
        }
        
    </header>
  );
})

export default Header;
