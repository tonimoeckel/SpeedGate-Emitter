import createEmitter from '../src/index';
import {Emitter} from "../src/emitter";
import {Settings} from "../src/settings";


it('Should be function', () => {
    expect(typeof createEmitter).toBe('function');
});

it('Should have default config', () => {
    var emitter: Emitter = createEmitter(null);
    var defaultConfig = Settings.defaultConfig();
    expect(emitter.config).toMatchObject(defaultConfig);
});

it('Should have overwritten config', () => {
    var emitter: Emitter = createEmitter({
        emitterId: "Begin",
        host: "localhost"
    });
    var defaultConfig = Settings.defaultConfig();
    defaultConfig.host = 'localhost';
    defaultConfig.emitterId = 'Begin';
    expect(emitter.config).toMatchObject(defaultConfig);
});