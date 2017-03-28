'use strict';
const client_1 = require("./client");
const simulation_trigger_1 = require("./simulation.trigger");
const ir_trigger_1 = require("./ir.trigger");
const triggerMap = {
    "simulation": simulation_trigger_1.SimulationTrigger,
    "ir": ir_trigger_1.IRTrigger
};
class Emitter {
    constructor(config) {
        this.config = config;
        this.listener = {
            onEstablish: () => {
                console.log('Client connecting');
            },
            onConnect: (data) => {
                console.log('Client connected: ', data);
                this.client.sendJoin(config.emitterId);
            },
            onEvent: (data) => {
                console.log('Message received: ', data);
            },
            onDisconnect: () => {
                console.log('Client disconnected');
            }
        };
    }
    start() {
        this.stop();
        this.startTrigger();
        this.client = new client_1.Client(this.config, this.listener);
        this.client.connect();
    }
    stop() {
        this.stopTrigger();
        if (this.client) {
            this.client.disconnect();
        }
    }
    startTrigger() {
        this.stopTrigger();
        let triggerClass = triggerMap[this.config.trigger];
        if (!triggerClass) {
            console.error('Trigger not available: ', this.config.trigger);
            return;
        }
        this.trigger = new triggerClass(this.config, (data) => {
            this.client.sendData(data);
        });
        this.trigger.start();
    }
    stopTrigger() {
        if (this.trigger) {
            this.trigger.stop();
        }
    }
}
exports.Emitter = Emitter;
