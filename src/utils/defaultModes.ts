import { Mode } from "../types/mode";

const default1 : Mode= {
    "name": "default",
    "id": -1,
    "steps": [
      {
        "duration": 9,
        "antiseptic": {
          "args": {
            "min": 0,
            "max": 100,
            "period": 120
          },
          "type": "const"
        },
        "pressure": {
          "args": {
            "min": 0,
            "max": 100,
            "period": 120
          },
          "type": "const"
        },
        "voltage": {
          "args": {
            "min": 0,
            "max": 100,
            "period": 120
          },
          "type": "const"
        }
      },
      {
        "duration": 9,
        "antiseptic": {
          "args": {
            "min": 0,
            "max": 100,
            "period": 120
          },
          "type": "const"
        },
        "pressure": {
          "args": {
            "min": 0,
            "max": 100,
            "period": 120
          },
          "type": "const"
        },
        "voltage": {
          "args": {
            "min": 0,
            "max": 100,
            "period": 120
          },
          "type": "const"
        }
      }
    ]
  }

const defaultModes: Mode[] = [
    default1
]

export default defaultModes