class DNA{
    constructor() {
        this.genes = [];
        //init the genes with random vectors;
        for(let i=0; i<lifeSpan; i++){
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1)
        }
    }

    //binding and joining in a child the DNA of the parent a (this) and parent b
    crossOver(partner){
        let newDna = new DNA();
        let mid = floor( random(this.genes.length) )
        for(let i=0; i<this.genes.length; i++){
            if(i > mid){
                newDna.genes[i] = this.genes[i];
            }else{
                newDna.genes[i] = partner.genes[i];
            }
        }
        return newDna;
    }

    mutation(){
        for(let i=0; i<this.genes.length; i++){
            if(random(1)<0.01){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1) 
            }
        }
    }
}