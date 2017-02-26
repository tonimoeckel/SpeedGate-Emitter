"use strict";
class Trigger {
    constructor(config, onOutput) {
        this.config = config;
        this.onOutput = onOutput;
        this.init();
    }
}
exports.Trigger = Trigger;
