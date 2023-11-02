import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { Mode } from '../types/mode';

import defaultModes from '../utils/defaultModes';
import appStateStore from './appStateStore';
import { Process } from '../types/process';

const server = "http://localhost:3500";


export interface Status{
    running: "running"|"paused"|"stopped",
    runningMode: Mode,
    modes: Mode[],
    process: Process
}

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

    fetchModes(){
        axios.get(`${server}/api/v1/mode`)
            .then(res=>{
                runInAction(()=>{
                    this.status.modes = res.data;
                })
            })
    }

    createMode(newMode: Mode){
        axios.post(`${server}/api/v1/mode`, newMode).then(()=>this.fetchModes());
    }

    updateMode(modeId: number, newMode: Mode){
        axios.put(`${server}/api/v1/mode/${modeId}`, newMode);
    }

    deleteMode(modeId: number){
        axios.delete(`${server}/api/v1/mode/${modeId}`)
    }

    pause(){
        axios.post(`${server}/api/v1/control/pause`);
    }
    start(modeId: number){
        axios.post(`${server}/api/v1/mode/${modeId}/apply`);
        axios.post(`${server}/api/v1/control/start`);
    }
    cancel(){
        axios.post(`${server}/api/v1/control/cancel`);
    }
}

export default new StatusStore();