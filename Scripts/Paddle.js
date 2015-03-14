
// ============
// PADDLE STUFF
// ============


// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = 50;
Paddle.prototype.halfHeight = 10;


Paddle.prototype.update = function (du) {
    if (eatKey(this.SHOOT_GUN) && g_gunAllowed) {
        console.log("SHOOT_GUN");
        fireGun(this.cx, this.cy);
    }
    if (g_keys[this.GO_LEFT]) {
        this.cx -= this.xVel * du;
    } if (g_keys[this.GO_RIGHT]) {
        this.cx+= this.xVel * du;
    }
    if (this.cx < this.halfWidth) this.cx = this.halfWidth;
    if (this.cx > (g_canvas.width - this.halfWidth)) this.cx = (g_canvas.width - this.halfWidth);
};

Paddle.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    fillBox(ctx, this.cx - this.halfWidth,
            this.cy - this.halfHeight,
            this.halfWidth * 2,
            this.halfHeight * 2,
            this.color)

    var style = "bold 20px Courier",
        color = "black";
        content = this.money +"$",
        scorePosX = 15;
        scorePosY = 25;
    writeText(ctx, style, content, scorePosX, scorePosY, color);
};

Paddle.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var paddleEdge = this.cy;
    // Check Y coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check X coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};