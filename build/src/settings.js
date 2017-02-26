"use strict";
class Settings {
    static defaultConfig() {
        return {
            "protocol": "http",
            "host": "127.0.0.1",
            "port": 3000,
            "emitterId": "Start",
            "trigger": "simulation",
            "simulationRunTime": 2000,
            "simulationPauseTime": 500,
        };
    }
}
exports.Settings = Settings;
