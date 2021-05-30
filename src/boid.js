class Boid {
    constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;

        // Constants
        this.speed = 1;
        this.angspeed = 1;
    }

    move() {
        // TODO
    }

    rotate(clockwise) {
        if clockwise {
            this.alpha += this.angspeed;
        } else {
            this.alpha -= this.angspeed;
        }
    }

    draw(ctx) {

    }
}
