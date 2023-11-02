import React from 'react';
import { useState, useRef } from 'react';

import '../../styles/sections/block.css';
import '../../styles/sections/modesList.css'

import { observer } from 'mobx-react-lite';
import appStateStore from '../../stores/appStateStore';
import { Step } from '../../types/step';
import { Mode } from '../../types/mode';
import statusStore from '../../stores/statusStore';
import defaultModes from '../../utils/defaultModes';


const parseToTr = (mode: Mode, id: number) => {
    const name = mode.name;
    const phases = mode.steps.length.toString();
    const duration = `${mode.steps.reduce(
        (acc: number, step: Step) => acc + step.duration,
        0
    )} sec`;

    return(
        <tr style={{cursor: "pointer"}} onClick={()=>{
            appStateStore.setModifiedMode(mode.id);
        }}>
            <td style={{width: "34%"}}>{name}</td>
            <td style={{width: "33%"}}>{phases}</td>
            <td style={{width: "33%"}}>{duration}</td>
        </tr>
    )
} 


const ModesList = observer(() => {
    
    const [isAddingShown, setIsAddingShown] = useState(false);
    const [addingName, setAddingName] = useState("");

    return (
        <section className="blockWrapper modeListSectionWrapper">
            <header>
                <h2>
                    Modes
                </h2>
                <button onClick={()=>{setIsAddingShown(true)}}>
                    <h2>+</h2>
                </button>
            </header>
            <section className='content'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phases</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statusStore.status.modes.map(parseToTr)
                        }
                        {
                            isAddingShown?(
                                <tr>
                                    <td>
                                        <input onChange={(e)=>setAddingName(e.target.value)} 
                                                value={addingName}
                                                autoFocus={true} 
                                                onBlur={()=>{
                                                    const defMode = defaultModes[0];
                                                    defMode.name = addingName;
                                                    statusStore.createMode(defMode);
                                                    setAddingName("");
                                                    setIsAddingShown(false);
                                                }} 
                                                className="inputField"></input>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ):("")
                        }
                    </tbody>
                </table>
            </section>
        </section>
      );
})

export default ModesList;
