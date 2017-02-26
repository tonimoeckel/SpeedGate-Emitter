
import {SimulationTrigger} from "../src/simulation.trigger";


it('Should start timer', (done) => {

    let counter = 0;
    let trigger = new SimulationTrigger({
        simulationRunTime: 100
    },(data)=>{

        expect(Number(data)).toEqual(counter++ % 2);
        if (counter > 4){
            done();
        }

    });

    expect(trigger.runTime).toEqual(100);
    trigger.start();

});
