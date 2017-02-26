import {Emitter, EmitterConfig} from "./emitter";
import * as _ from "underscore";
import {Settings} from "./settings";


export default function createEmitter(config: EmitterConfig): Emitter { // tslint:disable-line

    let emitter = new Emitter(_.defaults(config || {}, Settings.defaultConfig()));
    return emitter;

}