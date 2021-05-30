class Boid {
    constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;

        // Constants
        this.speed = 1;
        this.angspeed = 1;
        // Keep these as even numbers
        this.length = 20;
        this.width = 10;
    }

    move() {
        // TODO
    }

    rotate(clockwise) {
        if (clockwise) {
            this.alpha += this.angspeed;
        } else {
            this.alpha -= this.angspeed;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y-this.length/2);
        ctx.lineTo(this.x-this.width/2,this.y+this.length/2);
        ctx.lineTo(this.x+this.width/2,this.y+this.length/2);
        //
        //ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        //ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
        ctx.fill();
    }
}

export default Boid;
