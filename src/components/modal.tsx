import React from 'react';
import '../styles/header.css';
import '../styles/modal.css';

import appStateStore from '../stores/appStateStore';
import statusStore from '../stores/statusStore';
import { observer } from 'mobx-react-lite';


const Modal = observer(() => {
  return (
    <div className={`modal_container ${appStateStore.state.modal || 'inactive'}`}>
        <div className="modal_wrapper">
            <header>
                <h2>Warning</h2>
            </header>
            <div className="modal_content">
                <p>You have not enterred data or another mistake</p>
                <div className="buttons">
                    <button type='button' onClick={()=>appStateStore.toggleModal()}>Start</button>
                    <button type='button' onClick={()=>appStateStore.toggleModal()} className='button_blue'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  );
})

export default Modal;
