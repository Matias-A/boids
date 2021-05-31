import Boid from './boid.js';

class Flock {
    constructor(num) {
        const { innerWidth: width, innerHeight: height } = window;
        // Tweak this constant!
        this.neighbor_radius = 80;

        this.boids = [];
        for (var i = 0; i < num; i++) {
            this.boids.push(new Boid(Math.random()*width,
                                    Math.random()*height,
                                    2*Math.random()*Math.PI,
                                    this));
        }

        this.params = {
            separation: 50,
            alignment: 50,
            cohesion: 50,
        }
    }

    setSeparation(val) {
        this.params.separation = val;
    }

    setAlignment(val) {
        this.params.alignment = val;
    }

    setCohesion(val) {
        this.params.cohesion = val;
    }

    draw(ctx) {
        for (let boid of this.boids) {
            boid.process_movement(ctx, this.params);
            boid.draw(ctx);
        }
    }
}

export default Flock;
