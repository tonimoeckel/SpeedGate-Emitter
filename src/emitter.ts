'use strict';
import {ClientConfig, SocketListener, Client} from './client';

export interface EmitterConfig extends ClientConfig {

  emitterId?: string

}

export class Emitter {

  listener: SocketListener;
  client: Client;

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

    if (this.client){
      this.client.disconnect();
    }

    this.client = new Client(this.config, this.listener);
    this.client.connect();

  }
}