
import {EmitterConfig} from "./emitter";
interface OutputFunction {
    (data: string) : void;
}

export abstract class Trigger {

    constructor(public config: EmitterConfig, public onOutput: OutputFunction){
        this.init();
    }

    abstract init():void;

    abstract start():void;

    abstract stop():void;

    abstract getCurrentData():string;

}

