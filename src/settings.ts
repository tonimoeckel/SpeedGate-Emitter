import {EmitterConfig} from "./emitter";

export class Settings {
    static defaultConfig():EmitterConfig {
        return {
            "protocol": "http",
            "host": "127.0.0.1",
            "port": 3000,

            "emitterId": "Start"
        }
    }
}