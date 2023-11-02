export interface Step{
    duration: number,
    antiseptic: {
        type: "const"|"sin",
        args:{
            min: number,
            max: number,
            period: number
        }
    },
    pressure: {
        type: "const"|"sin",
        args:{
            min: number,
            max: number,
            period: number
        }
    },
    voltage: {
        type: "const"|"sin",
        args:{
            min: number,
            max: number,
            period: number
        }
    },
}