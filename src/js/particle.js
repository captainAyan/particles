var Particle = function() {
	this.position = {
		x: util.randomIntFromRange(0,width),
		y: util.randomIntFromRange(0,height)
	}
	this.velocity = {
		x: util.randomIntFromRange(-100,100)/30,
		y: util.randomIntFromRange(-100,100)/30
	}

	this.radius = util.randomIntFromRange(100,300)/100;
	this.growth = 0.2;
	if(this.radius > 2 || this.radius < 1) {
		this.growth = -(this.growth);
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = "rgba(255,255,255,0.6)";
		c.fill();
		c.closePath();
	}

	this.update = function() {
		this.position.x += this.velocity.x/5;
		this.position.y += this.velocity.y/5;

		this.radius += this.growth;
		if(this.radius > 3 || this.radius < 1) {
			this.growth = -(this.growth);
		}

		// x setup
		if(this.position.x > width) {
			this.position.x = 0;
		}
		else if(this.position.x < 0) {
			this.position.x = width;
		}

		// y setup
		if(this.position.y > height) {
			this.position.y = 0;
		}
		else if(this.position.y < 0) {
			this.position.y = height;
		}

		// connections
		if(true) {
            for(var i=1; i < particles.length; i++) {
                if(this != particles[i] && (util.distance(this.position.x,this.position.y,particles[i].position.x,particles[i].position.y)<150) ) {
                	this.string = 7.5/(util.distance(this.position.x,this.position.y,particles[i].position.x,particles[i].position.y));
                	//this.string = 0.3;
                    c.beginPath();
                    c.moveTo(this.position.x,this.position.y);
                    c.lineTo(particles[i].position.x,particles[i].position.y);
                    c.lineWidth = 1;
                    c.strokeStyle = "rgba(200,200,200," + this.string + ")";
                    c.stroke();
                    c.closePath();
                }
            }
        }

		this.draw();
	}
}