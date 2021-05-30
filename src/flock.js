import Boid from './boid.js';

class Flock {
    constructor(num) {
        this.boids = [new Boid(200,200,0)];
        this.separation = 50;
        this.alignment = 50;
        this.cohesion = 50;
    }

    setSeparation(val) {
        this.separation = val;
    }

    setAlignment(val) {
        this.alignment = val;
    }

    setCohesion(val) {
        this.cohesion = val;
    }

    draw(ctx) {
        for (let boid of this.boids) {
            boid.draw(ctx);
        }
    }
}

export default Flock;
