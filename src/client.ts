

export interface ClientConfig {
	protocol?: string,
	host?: string,
	port?: number
}

export interface SocketListener {
	onEstablish: Function,
	onConnect: Function,
	onEvent: Function,
	onDisconnect: Function,
}

export enum SocketConnectionState {
	DISCONNECTED = -1,
	CONNECTING = 0,
	CONNECTED = 1
}


export class Client {

	socket: any;
	state: SocketConnectionState = SocketConnectionState.DISCONNECTED;

	constructor(public config:ClientConfig, public listener = null){

	}

	getURI(){
		return this.config.protocol + "://" + this.config.host + ':' + this.config.port;
	}

	connect(){

		let me = this;

		this.state = SocketConnectionState.CONNECTING;
		if (this.listener.onEstablish) this.listener.onEstablish();

		let io = require('socket.io-client');
		let socket = io.connect(this.getURI());
		socket.on('connect', function(data){
			me.onConnect(socket, data);
		});
		socket.on('event', function(data){
			me.onEvent(data);
		});
		socket.on('disconnect', function(){
			me.onDisconnect()
		});

	}

	private onConnect(socket, data){

		this.socket = socket;
		this.state = SocketConnectionState.CONNECTED;
		if (this.listener && this.listener.onConnect) this.listener.onConnect(data);
	}

	private onEvent(data){
		if (this.listener && this.listener.onEvent) this.listener.onEvent(data);
	}

	private onDisconnect() {
		this.socket = null;
		this.state = SocketConnectionState.DISCONNECTED;
		if (this.listener && this.listener.onDisconnect) this.listener.onDisconnect();
	}

	disconnect() {
		this.socket.disconnect();
	}

	sendJoin(message: string){
		if (!this.socket){
			//console.log('Tried to emit join but no socket established');
			return;
		}
		console.log('Emit join:', message);
		this.socket.emit('join', message);
	}

	sendData(data: string){
		if (!this.socket) {
			//console.log('Tried to emit data but no socket established');
			return;
		}
		console.log('Emit data:', data);
		this.socket.emit('emit', data);
	}
}