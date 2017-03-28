import {Trigger} from "./abstract.trigger";
import * as onoff from "onoff";

const Gpio = onoff['Gpio'];

export class IRTrigger extends Trigger {

    receiver: any;
    data: string;
    private enabled: boolean = false;

    init(): void {

        let me = this;
        this.data = "0";
        this.receiver = new Gpio(13, 'in', 'both');

        this.enabled = true;
        this.receiver.watch(function(err, value) {
            if (err){
                console.error(err);
            }
            me.data = value;
            if (me.enabled === true){
                me.onOutput(me.data);
            }else {
                console.log('Changed but disabled');
            }

        });

    }

    start(): void {
        this.enabled = true;

    }

    stop(): void {
        this.enabled = false;

    }



    getCurrentData(): string {
        return this.data;
    }


}