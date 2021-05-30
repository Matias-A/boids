import Boid from './boid.js';

class Flock {
    constructor(num) {
        const { innerWidth: width, innerHeight: height } = window
        this.boids = []
        for (var i = 0; i < num; i++) {
            this.boids.push(new Boid(Math.random()*width,
                                    Math.random()*height,
                                    2*Math.random()*Math.PI));
        }

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

    center() {
        let x = 0;
        let y = 0;

        for (let boid of this.boids) {
            x += boid.x;
            y += boid.y;
        }

        return {x: x / this.boids.length, y: y / this.boids.length};
    }

    draw(ctx) {
        let ctr = this.center();
        for (let boid of this.boids) {
            boid.draw(ctx, ctr);
        }
    }
}

export default Flock;
