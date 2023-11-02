import { createContext } from 'react'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios';
import { runInAction, makeAutoObservable } from 'mobx';
import { Mode } from '../types/mode';
import { Process } from '../types/process';
import defaultModes from '../utils/defaultModes';

import statusStore from './statusStore';

const server = "http://localhost:3500";


//status - initial application page
//modes - list of all modes
//edit - page for examination and modification of a mode picked on the modes page 
type pageNames = "status"|"modes"|"edit"

//State of the whole app
//page - one of three application pages. 
//modeRunning - initially the mode of aspirator but can be changed in the status page without aspirator state update
//modes - all existing modes
//modifiedMode - mode which is open for examination or modification on the edit page.
export interface State{
    page: pageNames,
    modeRunning: Mode,
    modifiedMode: Mode,
    modal: Boolean
}

class StateStore{
    state: State = {
        page: "status",
        modeRunning: defaultModes[0],
        modifiedMode: defaultModes[0],
        modal: false
    }

    constructor(){
        makeAutoObservable(this);
    }

    changePage(newPage: pageNames){
        this.state.page = newPage;
    }

    //Updates running mode.
    loadMode(id: number){
        this.state.modeRunning = statusStore.status.modes.find(mode => mode.id == id) || defaultModes[0];
    }

    setModifiedMode(id: number){
        this.state.modifiedMode = statusStore.status.modes.find((mode: Mode) => mode.id == id) || defaultModes[0];
        this.changePage("edit");
    }

    updateModifiedMode(update: Mode){
        this.state.modifiedMode = update;
    }

    toggleModal(){
        this.state.modal = !this.state.modal;
    }
    
}

export default new StateStore();