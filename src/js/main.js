// setting up canvas and constants

const setup = util.setup();
const width = setup.width;
const height = setup.height;
const canvas = setup.canvas;
const c = setup.context;

var total_frames = 0;

var particles;

// Initialization
function init() {
    particles = [];

    for(var i =0; i < 80; i++) {
    	particles.push(new Particle);
    }
    animate();
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    total_frames += 1;

    particles.forEach(function(particle) {
    	particle.update();
    });
}

init();