import { Step } from "./step"
import { Mode } from "./mode"

export interface Process{
    current_values:{
        antiseptic_power: number,
        voltage_power: number,
        pressure: number
    },
    process:{
        running: Boolean,
        paused: Boolean,
        started_at: String,
        paused_at: String,
        step_idx: number,
        step_remaining_time: number,
        total_worked_time: number,
        mode: Mode
    }
}