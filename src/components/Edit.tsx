import React, {useState} from 'react';
import '../styles/edit.css';

import {observer} from 'mobx-react-lite';
import appStateStore from '../stores/appStateStore';
import statusStore from '../stores/statusStore';
import ModesList from './sections/modeslist';
import EditingSection from './sections/editingSection';


//Wrapper for the last page - edit.
//There are two states of that component, isEditable and updatedMode
//updatedMode by default is equal to the mode which is being updated but later gets updated in child components
//eventually, it is to update appStateStore.state.modifiedMode with statusStore
//isEditable is used to inactive all inputs and buttons in child components when the mode is not being editted
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
