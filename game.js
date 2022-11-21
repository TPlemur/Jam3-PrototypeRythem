title = "prototype";

description = `[press] on queue`;

characters = [
];

const G ={
   WIDTH: 200,
   HEIGHT: 150, 
   MILISPERBEAT: 1000, //number of miliseconds between ticks
   //offsets so that sprite bouces at edge of screen
   BOUNDS_RIGHT:200-11,
   BOUNDS_LEFT:10,
   BOUNDS_TOP:6,
   BOUNDS_BOT:150-5,
   LASTCOLOR:0, //ensures no color duplication
   TIMERWIDTH: 80, //the number of miliseconds on either side of a bounce that are valid for scoring
   TIMER: 0,
   LAST_CLOCK: 0, //used for getting the system clock
   DELTA_TIME: 0,  //time between ticks
   Beats: 0
};


options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
};

//upload music file
var audio = new Audio('Disco Dance.mp3'); //'Disco Dance.mp3'

function update() {
    if (!ticks) {
        //play music at start of game
        //audio.play();//reset everything
        G.TIMER = 0;
        G.LAST_CLOCK = Date.now();
        G.Beats = 0;
    }
    //get time between ticks
    G.DELTA_TIME = Date.now() - G.LAST_CLOCK;
    G.LAST_CLOCK = Date.now();
    // end the game if music is finished
    if(G.Beats>3){
        end();
    }
    G.TIMER +=G.DELTA_TIME;

    //check for input on beat
    if(input.isJustPressed){
        //check for within timerBuffer
        if(G.TIMER < G.TIMERWIDTH || G.TIMER > (G.MILISPERBEAT - G.TIMERWIDTH)){
            play("coin");
            addScore(10);
        }
        else{
            addScore(-1);
        }
    }
    if(G.TIMER>G.MILISPERBEAT){
        G.TIMER -=G.MILISPERBEAT;
        G.Beats++;
    }
    rect(G.WIDTH/4,70,3,3);
    rect(2*G.WIDTH/4,70,3,3);
    rect(3*G.WIDTH/4,70,3,3);

    rect(G.WIDTH*((G.Beats*G.MILISPERBEAT + G.TIMER)/(4*G.MILISPERBEAT)),60,3,3);
    console.log(G.TIMER)
}

addEventListener("load", onLoad);