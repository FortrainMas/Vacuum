import React from 'react';
import { useState, useRef } from 'react';

import '../../styles/sections/block.css';
import '../../styles/sections/modesList.css'

import { observer } from 'mobx-react-lite';
import appStateStore from '../../stores/appStateStore';
import { Step } from '../../types/step';
import { Mode } from '../../types/mode';
import statusStore from '../../stores/statusStore';
import EditingSectionCollapsable from './editingSectionCollapsable/edittingSectionCollapsable';



interface propsInterface{
    isEditable: Boolean,
    updatedMode: Mode,
    setUpdatedMode:  (value: Mode) => void
}

const EditingSection = observer(({isEditable, updatedMode, setUpdatedMode}:propsInterface) => {
    const updateStep = (stepId:number, step:Step) => {
        const updatedCopy = updatedMode;
        updatedCopy.steps[stepId] = step;   
        setUpdatedMode(updatedCopy);
    }
    const removeStep = (stepId:number) => {
      const updatedCopy = updatedMode;
      updatedCopy.steps.splice(stepId, 1);
      setUpdatedMode(updatedCopy);
    }

    //Swaps steps[stepId] with steps[stepId-1]
    const stepUp = (stepId:number) =>{
      console.log(stepId);
      const updatedCopy = updatedMode;
      const t: Step = updatedCopy.steps[stepId];
      updatedCopy.steps[stepId] = updatedCopy.steps[stepId-1];
      updatedCopy.steps[stepId-1] = t;
      console.log(updatedCopy.steps);
        
      setUpdatedMode(updatedCopy);
    }

    //Swaps steps[stepId] with steps[stepId+1]
    const stepDown = (stepId:number) =>{
      const updatedCopy = updatedMode;
      const t: Step = updatedCopy.steps[stepId];
      updatedCopy.steps[stepId] = updatedCopy.steps[stepId+1];
      updatedCopy.steps[stepId+1] = t;
        
      setUpdatedMode(updatedCopy);
    }
    
    return (
        <section className="blockWrapper modeListSectionWrapper">
            <header>
                <h2>
                    Phases
                </h2>
                {
                    (isEditable?
                        <button onClick={()=>{
                            const stepTemplate:Step = {
                                      "duration": 0,
                                      "antiseptic": {
                                        "type": "const",
                                        "args": {
                                          "min": 0,
                                          "max": 0,
                                          "period": 0
                                        }
                                      },
                                      "voltage": {
                                        "type": "const",
                                        "args": {
                                          "min": 0,
                                          "max": 0,
                                          "period": 0
                                        }
                                      },
                                      "pressure": {
                                        "type": "const",
                                        "args": {
                                          "min": 0,
                                          "max": 0,
                                          "period": 0
                                        }
                                      }
                            }
                            const updatedCopy = updatedMode
                            updatedCopy.steps.push(stepTemplate);
                            setUpdatedMode(updatedCopy);
                        }}>
                            <h2>+</h2>
                        </button>:""
                    )
                }
            </header>
            <section className='content'>
                {
                    updatedMode.steps.map((step, ind)=>{
                        return <EditingSectionCollapsable 
                                key={ind}    
                                isEditable={isEditable} 
                                step={step} 
                                stepId={ind} 
                                isLast={ind == updatedMode.steps.length - 1}
                                stepUp={stepUp}
                                stepDown={stepDown}
                                stepRemove={removeStep}
                                updateStep={updateStep} />
                    })
                }
            </section>
        </section>
      );
})

export default EditingSection;
