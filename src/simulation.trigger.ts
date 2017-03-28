import {Trigger} from "./abstract.trigger";
export class SimulationTrigger extends Trigger {

    timer: any;
    runTime: number;
    pauseTime: number;
    data: string;
    private enabled: boolean = false;

    init(): void {

        this.runTime = this.config.simulationRunTime || 4000;
        this.pauseTime = this.config.simulationPauseTime || 4500;
        this.data = "1";

    }

    start(): void {
        this.enabled = true;
        this.startTimer();
    }

    stop(): void {
        this.enabled = false;
        this.clearTimer();
    }

    private startTimer() {

        this.clearTimer();

        setTimeout(()=>{

            this.data = "0";
            this.onOutput(this.data);
            setTimeout(()=>{

                this.data = "1";
                this.onOutput(this.data);
                this.startTimer();

            },this.pauseTime)


        }, this.runTime);

    }

    getCurrentData(): string {
        return this.data;
    }

    private clearTimer() {
        if (this.timer){
            this.timer.clearTimeout();
        }
    }
}