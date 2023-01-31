
class Popolutaion{
    constructor() {
        this.rockets = []
        this.matingPool = [];   //the array for choosing the next generation
        //initializing the population
        for(let i = 0; i<popSize; i++){
            this.rockets[i] = new Rocket();
        }
    }

    run(){
        for(let i = 0; i<popSize; i++){
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }

    //calculate the fitness for all the rockets and populate the mating pool
    evaluate(){
        let maxFit = 0;

        for(let i=0; i<popSize; i++){
            this.rockets[i].calcFitness();
            if(this.rockets[i].fitness > maxFit)    maxFit = this.rockets[i].fitness;
        }

        bestFitness = round(maxFit);

        //normalized
        for(let i=0; i<popSize; i++){
            this.rockets[i].fitness /= maxFit;
        }
        
        this.matingPool = []

        //we had the i-esim rocket in the matinpool n times, for incrementing the chance of the rocket of being pick based on its fitness
        for(let i=0; i<popSize; i++){
            let n = this.rockets[i].fitness * 100;
            for(let j=0; j<n; j++){
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    //selecting parents and generating child
    selection(){

        let newRockets = [];

        for(let i=0; i<this.rockets.length; i++){

            let parentA = random(this.matingPool).dna;  //picking a random element of the array, thanks P5
            let parentB = random(this.matingPool).dna;

            let child = parentA.crossOver(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }

        this.rockets = newRockets;
    }
}