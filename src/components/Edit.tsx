import React, {useState} from 'react';
import '../styles/edit.css';

import {observer} from 'mobx-react-lite';
import appStateStore from '../stores/appStateStore';
import statusStore from '../stores/statusStore';
import ModesList from './sections/modeslist';
import EditingSection from './sections/editingSection';


const Edit = observer(() => {
  const [isEditable, setIsEditable] = useState(false);
  const [updatedMode, setUpdatedMode] = useState(appStateStore.state.modifiedMode);

  return (
    <div className='editWrapper'>
      <EditingSection isEditable={isEditable} updatedMode={updatedMode} setUpdatedMode={setUpdatedMode}/>
      <div className="control_pannel">
        {
          isEditable?(
            <>
              <button type='button' className='button_blue' 
                onClick={()=>{
                  statusStore.updateMode(appStateStore.state.modifiedMode.id, updatedMode);
                  appStateStore.updateModifiedMode(updatedMode);
                  setIsEditable(false);
                }}>Save</button>
              <button type='button' onClick={()=>{appStateStore.changePage("modes")}}>Cancel</button>
            </>
          ):(
            <>
              <button type='button' className='button_blue' 
                onClick={()=>{
                  if(updatedMode.name.toLowerCase().startsWith('default')){
                    appStateStore.toggleModal();
                  }else{
                  setIsEditable(true)}}}>Edit</button>
              <button type='button' onClick={()=>{
                if(updatedMode.name.toLowerCase().startsWith('default')){
                  appStateStore.toggleModal();
                }else{
                  statusStore.deleteMode(updatedMode.id);
                  appStateStore.changePage("modes");
                }}}>Delete</button>
            </>
          )
        }

        
      </div>
    </div>
  );
})

export default Edit;
