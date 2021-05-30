class Boid {
    constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;

        // Constants
        this.speed = 1;
        this.angspeed = 0.1;
        // Keep these as even numbers?
        this.length = 20;
        this.width = 10;
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

    rotate(clockwise) {
        if (clockwise) {
            this.alpha += this.angspeed;
        } else {
            this.alpha -= this.angspeed;
        }
    }

    process_cohesion(center) {
        let vec_c = {x: this.x - center.x, y: this.y - center.y};
        let ang = Math.acos(vec_c.y / Math.sqrt(vec_c.x*vec_c.x + vec_c.y*vec_c.y));
        if (vec_c.x < 0) ang = 2*Math.PI - ang;

        let clockwise = true;
        if ((ang > this.alpha && ang-this.alpha < Math.PI)
            || (this.alpha > ang && this.alpha - ang > Math.PI)) clockwise = false;
        return clockwise;
    }

    draw(ctx, center) {
        let clockwise = this.process_cohesion(center);
        this.rotate(clockwise);

        this.move(ctx);

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
    }
}

export default Boid;
