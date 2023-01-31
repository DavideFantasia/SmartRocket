class Rocket{
    constructor(dna) {
        this.pos = createVector(width/2, height);
        this.vel = createVector();
        this.acc = createVector();
        this.completed = false;
        this.crushed = false;
        
        if(dna)
            this.dna = dna;
        else
            this.dna = new DNA()

        this.fitness = 0;
    }

    applyForce(force){
        this.acc.add(force)
    }

    update(){

        var d = dist(this.pos.x, this.pos.y , target.x, target.y)
        if(d<16){
            this.completed = true;
            this.pos = target.copy();
            this.fitness *= 10;
        }
        if(this.crashed)    this.fitness /= 10;
        
        for(let j=0; j<walls.length; j++){
            if(walls[j].type=='wall' && this.pos.x > walls[j].x && this.pos.x < walls[j].x+walls[j].w && this.pos.y > walls[j].y && this.pos.y < walls[j].y+walls[j].h){
                this.crashed = true;
            }
        }

        if(this.pos.x > width || this.pos.x < 0)
            this.crashed = true    //if the rocket hits the wall, than it crashed
        if(this.pos.y > height || this.pos.y < 0)
            this.crashed = true;
        this.applyForce(this.dna.genes[counter]);
        //if the target hasnt been hitted, than we can move our rocket
        if(!this.completed && !this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel)
            this.acc.mult(0)
        }
    }

    show(){
        push()
        noStroke();
        fill(255,150)
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        rectMode(CENTER);
        triangle(0,0,10,5,0,10)
        pop()
    }


    calcFitness(){
        var d = dist(this.pos.x,this.pos.y, target.x, target.y)
        this.fitness = map(d, 0, width, width, 0);
        if(d<16)
            arrived++;
    }
}