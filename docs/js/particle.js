var Particle = function() {
	this.position = {
		x: util.randomIntFromRange(0,width),
		y: util.randomIntFromRange(0,height)
	}
	this.velocity = {
		x: util.randomIntFromRange(-100,100)/100,
		y: util.randomIntFromRange(-100,100)/100
	}

	this.radius = (util.randomIntFromRange(100,300)/100);
	this.growth = 0.1;
	if(this.radius >= 4 || this.radius <= 1) {
		this.growth = -(this.growth);
		this.radius - this.growth*2;
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = "rgba(255,255,255,0.5)";
		c.fill();
		c.closePath();
		//c.fillText(this.radius,this.position.x+10,this.position.y+10);

		// Connections
		if(connect) {
            particles.forEach((particle) => {
                if(this != particle && (util.distance(this.position.x,this.position.y,particle.position.x,particle.position.y)<connectionDistance)) {
                	// the value of stringOpacity is divided by 2 because every paricle connects to each other with two string with doubles the opacity
                	this.stringOpacity = ((1 - ((util.distance(this.position.x,this.position.y,particle.position.x,particle.position.y))*(1/connectionDistance)))/2).toFixed(3);
                    c.beginPath();
                    c.moveTo(this.position.x,this.position.y);
                    c.lineTo(particle.position.x,particle.position.y);
                    c.lineWidth = 1;
                    c.strokeStyle = "rgba(200,200,200," + this.stringOpacity + ")";
                    c.stroke();
                    c.closePath();
                }
            });
        }
	}

	this.update = function() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.radius += this.growth;
		if(this.radius > 3 || this.radius < 1) {
			this.growth = -(this.growth);
		}

		// x edge interaction
		if(this.position.x > width || this.position.x < 0) {
			this.velocity.x *= -1;
		}

		// y edge interaction
		if(this.position.y > height || this.position.y < 0) {
			this.velocity.y *= -1;
		}

		this.draw();
	}
}