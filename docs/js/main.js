// setting up canvas and constants

const setup = util.setup();
const width = setup.width;
const height = setup.height;
const canvas = setup.canvas;
const c = setup.context;

var total_frames = 0;

var particles;
var connect = true;
var mouseEffect = true;
var connectionDistance = 150;
var connectionDistanceMouse = 300;

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

    for(var i =0; i < 80; i++) {
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
        particles.forEach((particle)=> {
            if(util.distance(mouse.x,mouse.y,particle.position.x,particle.position.y)<connectionDistanceMouse) {
                this.stringOpacity = (1 - (((util.distance(mouse.x,mouse.y,particle.position.x,particle.position.y))*(1/connectionDistanceMouse)))/1).toFixed(3);
                c.beginPath();
                c.moveTo(mouse.x,mouse.y);
                c.lineTo(particle.position.x,particle.position.y);
                c.lineWidth = 0.5;
                c.strokeStyle = "rgba(255,255,255," + this.stringOpacity + ")";
                c.stroke();
                c.closePath();
            }
        });
    }
}

init();