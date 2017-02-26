"use strict";
const abstract_trigger_1 = require("./abstract.trigger");
class SimulationTrigger extends abstract_trigger_1.Trigger {
    constructor() {
        super(...arguments);
        this.enabled = false;
    }
    init() {
        this.runTime = this.config.simulationRunTime || 4000;
        this.pauseTime = this.config.simulationPauseTime || 500;
        this.data = "1";
    }
    start() {
        this.enabled = true;
        this.startTimer();
    }
    stop() {
        this.enabled = false;
        this.clearTimer();
    }
    startTimer() {
        this.clearTimer();
        setTimeout(() => {
            this.data = "0";
            this.onOutput(this.data);
            setTimeout(() => {
                this.data = "1";
                this.onOutput(this.data);
                this.startTimer();
            }, this.pauseTime);
        }, this.runTime);
    }
    getCurrentData() {
        return this.data;
    }
    clearTimer() {
        if (this.timer) {
            this.timer.clearTimeout();
        }
    }
}
exports.SimulationTrigger = SimulationTrigger;
