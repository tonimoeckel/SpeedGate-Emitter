import {EmitterConfig} from "./emitter";

export class Settings {
    static defaultConfig():EmitterConfig {
        return {
            "protocol": "http",
            "host": "127.0.0.1",
            "port": 9000,

            "emitterId": "Start",

            "trigger": "ir",
            "simulationRunTime": 2000,
            "simulationPauseTime": 500,
        }
    }
}