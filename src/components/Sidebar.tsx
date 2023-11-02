import React from 'react';
import logo from '../logo.svg';
import menu from '../images/menu.svg';
import play from '../images/play.svg';

import '../styles/sidebar.css';

import stateStore from '../stores/appStateStore';
import { observer } from 'mobx-react-lite';


const Sidebar = observer(() => {
    return (
        <div className='sidebar'>
            <div className={`menuButton ${ stateStore.state.page == "status"?"button-active":""}`} onClick={()=>stateStore.changePage("status")}>
                <img src={play} alt="play"/>
            </div>
            <div className={`menuButton ${ stateStore.state.page != "status"?"button-active":""}`} onClick={()=>stateStore.changePage("modes")}>
                <img src={menu} alt="menu"/>
            </div>
        </div>
      );
})

export default Sidebar;
