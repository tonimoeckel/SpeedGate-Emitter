'use strict';
import {ClientConfig, SocketListener, Client} from './client';
import {SimulationTrigger} from "./simulation.trigger";
import {Trigger} from "./abstract.trigger";

const triggerMap = {
  "simulation": SimulationTrigger
};

export interface EmitterConfig extends ClientConfig {

  emitterId?: string,
  trigger?: string,

  simulationRunTime?: number,
  simulationPauseTime?: number

}

export class Emitter {

  listener: SocketListener;
  client: Client;
  trigger: Trigger;

  constructor(public config: EmitterConfig) {

    this.listener = {
      onEstablish: () => {
        console.log('Client connecting');
      },
      onConnect: (data) => {
        console.log('Client connected: ',data);
        this.client.sendJoin(config.emitterId);
      },
      onEvent: (data) => {
        console.log('Message received: ',data);
      },
      onDisconnect: () => {
        console.log('Client disconnected');
      }
    }

  }

  start(){

    this.startTrigger();

    this.stop();

    this.client = new Client(this.config, this.listener);
    this.client.connect();

  }

  stop(){

    this.stopTrigger();

    if (this.client){
      this.client.disconnect();
    }

  }


  private startTrigger() {

    this.stopTrigger();
    let triggerClass = triggerMap[this.config.trigger];
    if (!triggerClass){
      console.error('Trigger not available: ', this.config.trigger);
      return;
    }
    this.trigger = new triggerClass(this.config, (data)=>{
      this.client.sendData(data);
    });
    this.trigger.start();

  }

  private stopTrigger() {

    if (this.trigger){
      this.trigger.stop();
    }

  }
}