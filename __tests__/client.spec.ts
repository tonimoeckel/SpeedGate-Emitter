
import {Client, ClientConfig} from "../src/client";
import {Settings} from "../src/settings";

let config:ClientConfig;

beforeEach(() => {

    config = Settings.defaultConfig();

});

it('Should get uri from config', () => {

    let client = new Client(config);
    expect(client.getURI()).toBe('http://127.0.0.1:3000');

});

it('Should call onEstablish when connecting', (done) => {

    let listener = {
        onEstablish: ()=>{
            done();
        }
    };

    let client = new Client(config,listener);
    client.connect();

});


it('Should call onConnect when connected', (done) => {

    let socket = {socket: true};
    let data = {data: true};

    let listener = {
        onConnect: (d)=>{
            expect(d).toBe(data);
            done();
        }
    };

    let client = new Client(config,listener);
    client['onConnect'](socket, data);

});

it('Should call onEvent when connected', (done) => {

    let listener = {
        onEvent: (d)=>{
            expect(d).toBe(data);
            done();
        }
    };

    let client = new Client(config,listener);
    let data = {data: true};
    client['onEvent'](data);

});