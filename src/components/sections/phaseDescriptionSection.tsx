import React from 'react';

import '../../styles/sections/block.css';
import '../../styles/sections/phaseDescriptionSection.css'

import { observer } from 'mobx-react-lite';
import statusStore from '../../stores/statusStore';
import appStateStore from '../../stores/appStateStore';
import { Step } from '../../types/step';


const parseToTr = (step: Step, id: number) => {
    const ids = (id+1).toString();
    const duration = step.duration.toString();
    let pressure;
    let antiseptic;
    let voltage;

    if(step.pressure.type == "const"){
        pressure = `const(${step.pressure.args.max})`
    }else{
        pressure = `sin(${step.pressure.args.min}, ${step.pressure.args.max}, ${step.pressure.args.period} min)`
    }

    if(step.antiseptic.type == "const"){
        antiseptic = `const(${step.antiseptic.args.max})`
    }else{
        antiseptic = `sin(${step.antiseptic.args.min}, ${step.antiseptic.args.max}, ${step.antiseptic.args.period} min)`
    }


    if(step.voltage.type == "const"){
        voltage = `const(${step.voltage.args.max})`
    }else{
        voltage = `sin(${step.voltage.args.min}, ${step.voltage.args.max}, ${step.voltage.args.period} min)`
    }

    return (
        <tr key={ids}>
            <td>{ids}</td>
            <td>{duration}</td>
            <td>{pressure}</td>
            <td>{antiseptic}</td>
            <td>{voltage}</td>
        </tr>
    )
} 


const PhaseDescriptionSection = observer(() => {
    return (
        <section className="blockWrapper statusSectionWrapper">
            <header>
                <h2>
                    {statusStore.status.runningMode.name}
                </h2>
            </header>
            <section className='content'>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: "5%"}}>№</th>
                            <th style={{width: "30%"}}>Duration (sec)</th>
                            <th>Pressure (Hg)</th>
                            <th>Antiseptic (%)</th>
                            <th>Voltage (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statusStore.status.runningMode.steps.map(parseToTr)
                        }
                    </tbody>
                </table>
            </section>
        </section>
      );
})

export default PhaseDescriptionSection;
