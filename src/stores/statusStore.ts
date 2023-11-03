import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { Mode } from '../types/mode';

import defaultModes from '../utils/defaultModes';
import appStateStore from './appStateStore';
import { Process } from '../types/process';

//It should be better in env probably
const server = "http://localhost:3500";


//Running - state of aspirator
//Running mode - running mode
//Modes - modes from api/v1/mode
//Process - status of apsirator. Result of get(/api/v1/status)
export interface Status{
    running: "running"|"paused"|"stopped",
    runningMode: Mode,
    modes: Mode[],
    process: Process
}


//Store the logic of aspirator which is not attached to the app state.
class StatusStore{
    status: Status = {
        running: "stopped",
        runningMode: defaultModes[0],
        modes: defaultModes,
        process:{
            current_values:{
                antiseptic_power: 0,
                voltage_power: 0,
                pressure: 0
            },
            process:{
                running: false,
                paused: false,
                started_at: "00000",
                paused_at: "00000",
                step_idx: 0,
                step_remaining_time: 0,
                total_worked_time: 0,
                mode: defaultModes[0]
            }
        }
    }

    constructor(){
        makeAutoObservable(this);
        this.fetchModes();
        this.fetchCurrentState();
    }

    //Fetch state of the aspirator every two seconds.\
    //If running mode of the aspirator has been changed, function updates appStateStore runningMode
    fetchCurrentState(){
        axios.get(`${server}/api/v1/status`)
            .then(res=>{
                const data = res.data;
                console.log(data);
                runInAction(()=>{
                    if(this.status.runningMode.id != data.process.mode.id){
                        appStateStore.loadMode(data.process.mode.id);
                    }
                    this.status.process = data;
                    this.status.running = data.process.running?(data.process.paused?"paused":"running"):"stopped";
                    this.status.runningMode = this.status.process.process.mode;
                });
            })
        setTimeout(this.fetchCurrentState.bind(this), 2000);
    }

    //Self-explanatory
    fetchModes(){
        axios.get(`${server}/api/v1/mode`)
            .then(res=>{
                runInAction(()=>{
                    this.status.modes = res.data;
                })
            })
    }

    //Creates new mode on the server
    createMode(newMode: Mode){
        axios.post(`${server}/api/v1/mode`, newMode).then(()=>this.fetchModes());
    }

    //Updates mode by id.
    updateMode(modeId: number, newMode: Mode){
        axios.put(`${server}/api/v1/mode/${modeId}`, newMode);
    }

    //Deletes mode by id
    deleteMode(modeId: number){
        axios.delete(`${server}/api/v1/mode/${modeId}`)
    }

    //Pause aspirator
    pause(){
        axios.post(`${server}/api/v1/control/pause`);
    }
    //Starts aspirator with specified mode.
    //This function is used in start button and there apply appStateStore.runningMode.id as an argument
    start(modeId: number){
        axios.post(`${server}/api/v1/mode/${modeId}/apply`);
        axios.post(`${server}/api/v1/control/start`);
    }
    //Stopped 
    cancel(){
        axios.post(`${server}/api/v1/control/cancel`);
    }
}

export default new StatusStore();