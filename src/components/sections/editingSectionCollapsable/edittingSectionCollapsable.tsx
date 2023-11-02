import React from 'react';
import { useState, useRef } from 'react';

import expand from '../../../images/expand_arrow.svg';
import arrow from '../../../images/arrow.svg';
import minus from '../../../images/minus.svg';

import { observer } from 'mobx-react-lite';
import '../../../styles/sections/edittingSectionCollapsable.css'

import appStateStore from '../../../stores/appStateStore';
import { Mode } from '../../../types/mode';
import { Step } from '../../../types/step';


interface propsInterface{
    isEditable: Boolean,
    step: Step,
    stepId: number,
    isLast: Boolean,
    stepUp: (stepId: number) => void,
    stepDown: (stepId: number) => void,
    stepRemove: (stepId: number) => void,
    updateStep: (stepId:number, step:Step) => void
}
const EditingSectionCollapsable = observer(({isEditable, step, stepId, isLast, stepUp, stepDown, stepRemove, updateStep}:propsInterface) => {


    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <section className="editingSecionCollapsableWrapper">
            <header>
                <button onClick={()=>setIsCollapsed(!isCollapsed)}>
                    <h2>Phase {stepId + 1}</h2>
                    <img style={isCollapsed?{transform: "rotate(180deg)"}:{}} src={expand} alt="collapse" />
                </button>
                {
                    (isEditable == false)||(
                    <div className="phaseManagement">
                        {
                            (stepId==0)||(
                            <button onClick={()=>stepUp(stepId)}>
                                <img style = {{transform: "rotate(180deg)"}}src={arrow} alt="arrow" />
                            </button>
                            )
                        }
                        {
                            (isLast==true)||(
                            <button onClick={()=>stepDown(stepId)}>
                                <img src={arrow} alt="arrow" />
                            </button>
                            )
                        }
                        <button onClick={()=>stepRemove(stepId)}>
                            <img src={minus} alt="arrow" />
                        </button>
                    </div>
                    )
                }
            </header>
            <div style={isCollapsed?{display:"none"}:{}}>
                <div className='content-block'>
                    <h4>Duration: </h4>
                    <input 
                        value={step.duration} 
                        disabled={!isEditable}
                        onChange={e=>{
                            step.duration = Number(e.target.value);
                            updateStep(stepId, step);
                        }}
                        onBlur={(e)=>{
                            if(e.target.value==""||e.target.value=="NaN"){
                                appStateStore.toggleModal();
                            }}
                        }/>
                    <h4>sec</h4>
                </div>
                <div className='content-block'>
                    <h4>Pressure: </h4>
                    <div className="dropdown">
                        <select 
                            value={step.pressure.type} 
                            onChange={e=>{
                                step.pressure.type = (e.target.value as "sin"|"const")
                            }}>
                           <option value="sin">sin</option>
                           <option value="const">const</option>
                        </select>
                    </div>
                </div>
                    {
                        step.pressure.type == "sin"?(
                            <div style={{marginLeft: "50px"}} className='content-block'>
                                <div className="small-block">
                                    <h4>min: </h4>
                                    <input 
                                        value={step.pressure.args.min} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.pressure.args.min = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                                <div className="small-block">
                                    <h4>max: </h4>
                                    <input 
                                        value={step.pressure.args.max} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.pressure.args.max = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                                <div className="small-block">
                                    <h4>period: </h4>
                                    <input 
                                        value={step.pressure.args.period} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.pressure.args.period = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>sec</h4>
                                </div>
                            </div>
                        ):(
                            <div style={{marginLeft: "50px"}} className="content-block">
                                <div className="small-block">
                                    <h4>value: </h4>
                                    <input 
                                        value={step.pressure.args.max} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.pressure.args.max = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                            </div>
                        )
                    }
                <div className='content-block'>
                    <h4>Antiseptic power: </h4>
                    <div className="dropdown">
                        <select 
                            value={step.antiseptic.type} 
                            onChange={e=>{
                                step.antiseptic.type = (e.target.value as "sin"|"const")
                            }}>
                           <option value="sin">sin</option>
                           <option value="const">const</option>
                        </select>
                    </div>
                </div>
                    {
                        step.antiseptic.type == "sin"?(
                            <div style={{marginLeft: "50px"}} className='content-block'>
                                <div className="small-block">
                                    <h4>min: </h4>
                                    <input 
                                        value={step.antiseptic.args.min} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.antiseptic.args.min = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                                <div className="small-block">
                                    <h4>max: </h4>
                                    <input 
                                        value={step.antiseptic.args.max} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.antiseptic.args.max = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                                <div className="small-block">
                                    <h4>period: </h4>
                                    <input 
                                        value={step.antiseptic.args.period} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.antiseptic.args.period = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>sec</h4>
                                </div>
                            </div>
                        ):(
                            <div style={{marginLeft: "50px"}} className="content-block">
                                <div className="small-block">
                                    <h4>value: </h4>
                                    <input 
                                        value={step.antiseptic.args.max} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.antiseptic.args.max = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                            </div>
                        )
                    }
                    <div className='content-block'>
                    <h4>Voltage power: </h4>
                    <div className="dropdown">
                        <select 
                            value={step.voltage.type} 
                            onChange={e=>{
                                step.voltage.type = (e.target.value as "sin"|"const")
                            }}>
                           <option value="sin">sin</option>
                           <option value="const">const</option>
                        </select>
                    </div>
                </div>
                    {
                        step.voltage.type == "sin"?(
                            <div style={{marginLeft: "50px"}} className='content-block'>
                                <div className="small-block">
                                    <h4>min: </h4>
                                    <input 
                                        value={step.voltage.args.min} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.voltage.args.min = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                                <div className="small-block">
                                    <h4>max: </h4>
                                    <input 
                                        value={step.voltage.args.max} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.voltage.args.max = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                                <div className="small-block">
                                    <h4>period: </h4>
                                    <input 
                                        value={step.voltage.args.period} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.voltage.args.period = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>sec</h4>
                                </div>
                            </div>
                        ):(
                            <div style={{marginLeft: "50px"}} className="content-block">
                                <div className="small-block">
                                    <h4>value: </h4>
                                    <input 
                                        value={step.voltage.args.period} 
                                        disabled={!isEditable}
                                        onChange={e=>{
                                            step.voltage.args.max = Number(e.target.value);
                                            updateStep(stepId, step);
                                        }}
                                        onBlur={(e)=>{
                                            if(e.target.value==""||e.target.value=="NaN"){
                                                appStateStore.toggleModal();
                                            }}
                                        }/>
                                    <h4>%</h4>
                                </div>
                            </div>
                        )
                    }
                
            </div>
        </section>
      );
})

export default EditingSectionCollapsable;
