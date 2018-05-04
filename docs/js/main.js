// setting up canvas and constants

const setup = util.setup();
const width = setup.width;
const height = setup.height;
const canvas = setup.canvas;
const c = setup.context;

var total_frames = 0;

var particles;
var connect = true;
var mouseEffect = false;

var mouse = {
    x: undefined,
    y: undefined
};

document.querySelector('canvas').addEventListener("mousemove",(e)=> {
    mouse = {
        x: e.clientX,
        y: e.clientY
    };
});

// Initialization
function init() {
    particles = [];

    for(var i =0; i < 70; i++) {
    	particles.push(new Particle());
    }
    animate();
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    total_frames += 1;

    particles.forEach((particle)=> {
    	particle.update();
    });

    if(mouseEffect) {
        for(var i=1; i < particles.length; i++) {
            if(util.distance(mouse.x,mouse.y,particles[i].position.x,particles[i].position.y)<150) {
                this.string = 50/(util.distance(mouse.x,mouse.y,particles[i].position.x,particles[i].position.y));
                c.beginPath();
                c.moveTo(mouse.x,mouse.y);
                c.lineTo(particles[i].position.x,particles[i].position.y);
                c.lineWidth = 0.5;
                c.strokeStyle = "rgba(200,200,200," + this.string + ")";
                c.stroke();
                c.closePath();
            }
        }
    }
}

init();