import { makeAutoObservable } from 'mobx';
import { Mode } from '../types/mode';
import defaultModes from '../utils/defaultModes';

import statusStore from './statusStore';


//status - initial application page
//modes - list of all modes
//edit - page for examination and modification of a mode picked on the modes page 
type pageNames = "status"|"modes"|"edit"

//State of the whole app
//page - one of three application pages. 
//modeRunning - initially the mode of aspirator and state of aspirator on update. Used to pick new aspirator mode to run
//modifiedMode - mode which is open for examination or modification on the edit page.
//modal - is modal window showed
export interface State{
    page: pageNames,
    modeRunning: Mode,
    modifiedMode: Mode,
    modal: Boolean
}


//Stores data attached to the app state and not attached to the aspirator.
class StateStore{
    
    //Default app state.
    state: State = {
        page: "status",
        modeRunning: defaultModes[0],
        modifiedMode: defaultModes[0],
        modal: false
    }

    constructor(){
        makeAutoObservable(this);
    }

    //Opens another page
    changePage(newPage: pageNames){
        this.state.page = newPage;
    }


    //Updates running mode. Used in dropdown on status page
    loadMode(id: number){
        this.state.modeRunning = statusStore.status.modes.find(mode => mode.id == id) || defaultModes[0];
    }

    //Pcik the new mode for modification on the edit page.
    setModifiedMode(id: number){
        this.state.modifiedMode = statusStore.status.modes.find((mode: Mode) => mode.id == id) || defaultModes[0];
        this.changePage("edit");
    }

    //Updates the modificating mode
    updateModifiedMode(update: Mode){
        this.state.modifiedMode = update;
    }

    //Show or hide modal window
    toggleModal(){
        this.state.modal = !this.state.modal;
    }
    
}

export default new StateStore();