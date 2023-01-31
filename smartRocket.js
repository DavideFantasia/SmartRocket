var population;
var popSize = 200;
var lifeSpan = 500;
var lifeP;
var genP
var counter=0;
var gen = 0;
var bestResultP;
var bestFitness = 0;
var target;
var looping = true;
var arrivedP;
var arrived=0;

var walls = [
                new Obstacle(0,200,300,10,'wall'),
                new Obstacle(300,350,300,10,'wall')
            ]

function setup(){
    createCanvas(600,500);
    
    population = new Popolutaion();
    nlButton = createButton('stop')
    genP = createP();
    lifeP = createP();
    arrivedP = createP();
    bestResultP = createP();
    target = createVector(width/2, 100)
}

function draw(){
    frameRate(240)
    background(0);
    //simulation timeout button
    nlButton.mousePressed(()=>{
        if(looping){
        looping = false;
        noLoop();}else{
            looping=true;
            loop();
        }
    })

    population.run()
    genP.html('generation: ' + gen);
    bestResultP.html('best result: ' + bestFitness);
    arrivedP.html('arrived: ' + arrived);
    lifeP.html('life span: ' + (lifeSpan -counter));


    for(let i=0; i<walls.length; i++){
        fill(204, 33, 50);
        rect(walls[i].x, walls[i].y,walls[i].w, walls[i].h)
    }


    counter++;
    if(counter > lifeSpan){
        population.evaluate();
        population.selection();
        counter=0;
        //arrived = 0;
        gen++;
    }
    fill(212, 156, 17)
    ellipse(target.x,target.y,16,16); //printing the ellipse of the target
}

