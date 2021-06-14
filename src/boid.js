function add(vec1, vec2) {
    return {
        x: vec1.x + vec2.x,
        y: vec1.y + vec2.y,
    }
}

function mult(vec, num) {
    return {
        x: vec.x * num,
        y: vec.y * num
    }
}

class Boid {
    constructor(x, y, alpha, flock) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.flock = flock;

        // Constants
        this.speed = 0.2;
        this.angspeed = 0.1;

        this.length = 10;
        this.width = 5;


        this.neighbors = [];

        // Debugging
        this.show_radius = true;
        this.angle_vec = {x: 0, y: 0};
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
        const gravity_constant = 20.0;
        let n = 0;

        let alignment = {x: 0, y: 0};
        let center = {x: 0, y: 0};
        let antigravity = {x: 0, y: 0}; // "anti-gravity" effect away from close neighbors (i.e. separation)

        for (let boid of this.flock.boids) {
            if (boid === this || this.dist(boid) > this.flock.neighbor_radius) continue;
            // Only for neighbors:
            center = add(center, boid);
            alignment = add(alignment, {x: Math.sin(boid.alpha), y: Math.cos(boid.alpha)});

            let vec = {x: this.x - boid.x, y: this.y - boid.y};
            let multiplier = gravity_constant / Math.pow(this.dist(boid) + 0.0001, 2);
            antigravity = add(antigravity, mult(vec, multiplier));

            n += 1;

        }
        if (n === 0) return {};

        return {
            center: mult(center, 1.0 / n),
            alignment: mult(alignment, 1.0 / n),
            separation: mult(antigravity, 1.0 / n)
        };
    }


    process_separation(neighbor_avg) {
        let vec = neighbor_avg.separation;
        return vec;
    }

    process_alignment(neighbor_avg) {
        let vec = neighbor_avg.alignment;
        return vec;
    }

    process_cohesion(neighbor_avg) {
        let vec_c = {x: neighbor_avg.center.x - this.x, y: neighbor_avg.center.y - this.y};
        let vec = mult(vec_c, 1.0 / this.flock.neighbor_radius);
        return vec;
    }

    process_movement(ctx, params) {
        let neighbor_avg = this.neighbor_avg();
        let param_sum = params.separation + params.alignment + params.cohesion;
        if (neighbor_avg.center !== undefined && param_sum !== 0) {
            // neighbors exist
           let separation_vec = this.process_separation(neighbor_avg);
           separation_vec = mult(separation_vec, params.separation);
           let align_vec = this.process_alignment(neighbor_avg);
           align_vec = mult(align_vec, params.alignment);
           let cohesion_vec = this.process_cohesion(neighbor_avg);
           cohesion_vec = mult(cohesion_vec, params.cohesion);

           let vec = add(separation_vec, align_vec);
           vec = add(vec, cohesion_vec);
           this.angle_vec = vec;

           let coeff = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
       } else {
           this.angle_vec = {x: 0, y: 0};
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

        if (this.angle_vec.x !== 0 || this.angle_vec.y !== 0) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.angle_vec.x, this.y + this.angle_vec.y);
            ctx.stroke();
        }
    }
}

export default Boid;
