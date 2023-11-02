import React from 'react';

import '../../styles/sections/block.css';
import '../../styles/sections/statusSection.css'

import { observer } from 'mobx-react-lite';
import statusStore from '../../stores/statusStore';
import appStateStore from '../../stores/appStateStore';
import { Mode } from '../../types/mode';

const StatusSection = observer(() => {
    return (
        <section className="blockWrapper statusSectionWrapper">
            <header>
                <h2>
                    Status
                </h2>
            </header>
            <section className='content'>
                <div className="content-block">
                    <h4>Mode: </h4>
                    <div className="dropdown">
                        <select
                            value={appStateStore.state.modeRunning.id} 
                            onChange={(e)=>{ appStateStore.loadMode(Number(e.target.value)); }}>
                            {
                                statusStore.status.modes.map((mode:Mode)=>{
                                    return (
                                        <option 
                                            key={mode.id} 
                                            value={mode.id}
                                             >{mode.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='content-block'>
                    <h4>Phases: {statusStore.status.runningMode.steps.length}</h4>
                </div>
                <div className='content-block'>
                    <h4>Current phase: {statusStore.status.process.process.step_idx.toString()}</h4>
                </div>
                <div className='content-block'>
                    <h4>Current values</h4>
                </div>
                <div className='content-block sub-block'>
                    <h4>    Pressure: {statusStore.status.process.current_values.pressure.toString()}Hg</h4>
                </div>
                <div className='content-block sub-block'>
                    <h4>    Antiseptic: {statusStore.status.process.current_values.antiseptic_power.toString()}%</h4>
                </div>
                <div className='content-block sub-block'>
                    <h4>    Voltage: {statusStore.status.process.current_values.voltage_power.toString()}%</h4>
                </div>
                <div className='content-block'>
                    <h4>Duration: {statusStore.status.process.process.total_worked_time.toString()} sec</h4>
                </div>
                <div className='content-block'>
                    <h4>Time remaining: {statusStore.status.process.process.step_remaining_time.toString()} sec</h4>
                </div>
            </section>
        </section>
      );
})

export default StatusSection;
