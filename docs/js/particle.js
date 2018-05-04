var Particle = function() {
	this.position = {
		x: util.randomIntFromRange(0,width),
		y: util.randomIntFromRange(0,height)
	}
	this.velocity = {
		x: util.randomIntFromRange(-100,100)/100,
		y: util.randomIntFromRange(-100,100)/100
	}

	this.radius = util.randomIntFromRange(100,300)/100;
	this.growth = 0.05;
	if(this.radius > 2 || this.radius < 1) {
		this.growth = -(this.growth);
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = "rgba(255,255,255,0.6)";
		c.fill();
		c.closePath();

		// Connections
		if(connect) {
            particles.forEach( (particle) => {
                if(this != particle && (util.distance(this.position.x,this.position.y,particle.position.x,particle.position.y)<connectionDistance)) {
                	// the value of stringOpacity is divided by 2 because every paricle connects to each other with two string with doubles the opacity
                	this.stringOpacity = ((1 - ((util.distance(this.position.x,this.position.y,particle.position.x,particle.position.y))*(1/150)))/2).toFixed(3);
                    c.beginPath();
                    c.moveTo(this.position.x,this.position.y);
                    c.lineTo(particle.position.x,particle.position.y);
                    c.lineWidth = 1;
                    c.strokeStyle = "rgba(255,255,255," + this.stringOpacity + ")";
                    c.stroke();
                    c.closePath();
                }
            });
        }
	}

	this.update = function() {
		this.position.x += this.velocity.x*0.5;
		this.position.y += this.velocity.y*0.5;

		this.radius += this.growth;
		if(this.radius > 3 || this.radius < 1) {
			this.growth = -(this.growth);
		}

		// x edge interaction
		if(this.position.x > width) {
			this.position.x = 0;
		}
		else if(this.position.x < 0) {
			this.position.x = width;
		}

		// y edge interaction
		if(this.position.y > height) {
			this.position.y = 0;
		}
		else if(this.position.y < 0) {
			this.position.y = height;
		}

		this.draw();
	}
}