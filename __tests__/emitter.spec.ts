
import {Settings} from "../src/settings";
import {Emitter} from "../src/emitter";

let config;

beforeEach(() => {
    config = Settings.defaultConfig();

});

it('Should define client listener', () => {

    let emitter = new Emitter(config);
    expect(emitter.listener).toBeDefined();

});

it('Should start trigger', () => {

    let startMock = jest.fn();
    let sendJoinMock = jest.fn();
    let clientMock = {
        sendJoin: sendJoinMock
    };

    let emitter:any = new Emitter(config);
    emitter['client'] = clientMock;
    emitter['startTrigger'] = startMock;
    emitter.listener.onConnect();

    expect(startMock.mock.calls.length).toBe(1);

});


it('Should stop trigger', () => {

    let stopMock = jest.fn();
    let emitter = new Emitter(config);
    emitter['stopTrigger'] = stopMock;
    emitter.listener.onDisconnect();

    expect(stopMock.mock.calls.length).toBe(1);

});

it('Should create client on start',()=>{

    let emitter = new Emitter(config);
    expect(emitter.client).toBeUndefined();

    emitter.start();
    expect(emitter.client).toBeDefined();

});