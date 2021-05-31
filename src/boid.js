class Boid {
    constructor(x, y, alpha, flock) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.flock = flock;

        // Constants
        this.speed = 1;
        this.angspeed = 0.1;
        // Keep these as even numbers?
        this.length = 20;
        this.width = 10;


        this.neighbors = [];

        // Debugging
        this.show_radius = true;
    }

    dist(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    move(ctx) {
        this.y += this.speed * Math.cos(this.alpha);
        this.x += this.speed * Math.sin(this.alpha);

        if (this.y < 0) {
            this.y += ctx.canvas.height;
        }
        if (this.y > ctx.canvas.height) {
            this.y -= ctx.canvas.height;
        }
        if (this.x < 0) {
            this.x += ctx.canvas.width;
        }
        if (this.x > ctx.canvas.width) {
            this.x -= ctx.canvas.width;
        }
    }

    rotate(rot_coefficient) {
        this.alpha += rot_coefficient * this.angspeed;
    }

    neighbor_avg() {
        let x = 0;
        let y = 0;
        let n = 0;

        let ang_x = 0;
        let ang_y = 0;

        for (let boid of this.flock.boids) {
            if (boid === this || this.dist(boid) > this.flock.neighbor_radius) continue;
            // Only for neighbors:
            x += boid.x;
            y += boid.y;
            n += 1;

            ang_x += Math.sin(boid.alpha);
            ang_y += Math.cos(boid.alpha);

        }
        if (n === 0) return {};

        let avg_angle = Math.PI / 2 - Math.atan2(ang_y,ang_x);
        if (avg_angle < 0) avg_angle += 2 * Math.PI;

        return {
            x: x / n,
            y: y / n,
            alpha: avg_angle
        };
    }

    process_cohesion(neighbor_avg) {
        let vec_c = {x: this.x - neighbor_avg.x, y: this.y - neighbor_avg.y};
        let ang = Math.PI / 2 - Math.atan2(vec_c.y,vec_c.x);
        if (ang < 0) ang += 2 * Math.PI;

        let ret = 1;
        if ((ang > this.alpha && ang-this.alpha < Math.PI)
            || (this.alpha > ang && this.alpha - ang > Math.PI)) ret = -1;
        return ret;
    }

    process_alignment(neighbor_avg) {
        let ret = -1;
        if ((neighbor_avg.alpha > this.alpha && neighbor_avg.alpha-this.alpha < Math.PI)
            || (this.alpha > neighbor_avg.alpha && this.alpha - neighbor_avg.alpha > Math.PI)) ret = 1;
        return ret;
    }

    process_separation(neighbor_avg) {
        return 0;
    }

    process_movement(ctx, params) {
        let neighbor_avg = this.neighbor_avg();
        if (neighbor_avg.x !== undefined) {
            let rot_coefficient = params.cohesion * this.process_cohesion(neighbor_avg) / 100;
            rot_coefficient += params.alignment * this.process_alignment(neighbor_avg) / 100;
            rot_coefficient += params.separation * this.process_separation(neighbor_avg) / 100;
            this.rotate(rot_coefficient);
        }
        this.move(ctx);

    }

    draw(ctx) {
        ctx.beginPath();

        let r = this.length / 2 + this.width * this.width / (8 * this.length);
        let a = Math.acos((this.length - r) / r);

        ctx.moveTo(this.x + r * Math.sin(this.alpha), this.y + r * Math.cos(this.alpha)); // Top
        ctx.lineTo(this.x + r * Math.sin(this.alpha + a + Math.PI), this.y + r * Math.cos(this.alpha + a + Math.PI)); // Left
        ctx.lineTo(this.x + r * Math.sin(this.alpha - a + Math.PI), this.y + r * Math.cos(this.alpha - a + Math.PI)); // Right
        //
        //ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        //ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
        ctx.fill();

        if (this.show_radius) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.flock.neighbor_radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}

export default Boid;
