"use strict";
var SocketConnectionState;
(function (SocketConnectionState) {
    SocketConnectionState[SocketConnectionState["DISCONNECTED"] = -1] = "DISCONNECTED";
    SocketConnectionState[SocketConnectionState["CONNECTING"] = 0] = "CONNECTING";
    SocketConnectionState[SocketConnectionState["CONNECTED"] = 1] = "CONNECTED";
})(SocketConnectionState = exports.SocketConnectionState || (exports.SocketConnectionState = {}));
class Client {
    constructor(config, listener = null) {
        this.config = config;
        this.listener = listener;
        this.state = SocketConnectionState.DISCONNECTED;
    }
    getURI() {
        return this.config.protocol + "://" + this.config.host + ':' + this.config.port;
    }
    connect() {
        let me = this;
        this.state = SocketConnectionState.CONNECTING;
        if (this.listener.onEstablish)
            this.listener.onEstablish();
        let io = require('socket.io-client');
        let socket = io.connect(this.getURI());
        socket.on('connect', function (data) {
            me.onConnect(socket, data);
        });
        socket.on('event', function (data) {
            me.onEvent(data);
        });
        socket.on('disconnect', function () {
            me.onDisconnect();
        });
    }
    onConnect(socket, data) {
        this.socket = socket;
        this.state = SocketConnectionState.CONNECTED;
        if (this.listener && this.listener.onConnect)
            this.listener.onConnect(data);
    }
    onEvent(data) {
        if (this.listener && this.listener.onEvent)
            this.listener.onEvent(data);
    }
    onDisconnect() {
        this.socket = null;
        this.state = SocketConnectionState.DISCONNECTED;
        if (this.listener && this.listener.onDisconnect)
            this.listener.onDisconnect();
    }
    disconnect() {
        this.socket.disconnect();
    }
    sendJoin(message) {
        if (!this.socket) {
            console.log('Tried to emit join but no socket established');
            return;
        }
        this.socket.emit('join', message);
    }
    sendData(data) {
        if (!this.socket) {
            console.log('Tried to emit data but no socket established');
            return;
        }
        this.socket.emit('data', data);
    }
}
exports.Client = Client;
