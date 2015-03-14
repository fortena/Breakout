// ==========
// BALL STUFF
// ==========

// BALL STUFF

function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

var g_ballsAlive = 0,
    g_ball = [];
    g_ballSpeed = 9;

function createBall () {
    if (g_ballsAlive <= 10) {
        g_ball[g_ballsAlive] = new Ball ({
            id: g_ballsAlive,
            cx: g_paddle.cx,
            cy: g_paddle.cy - g_paddle.halfHeight,
            radius: 10,

            xVel: -5,
            yVel: -4
        });
        console.log(g_ball[g_ballsAlive].id + " " + g_ball[g_ballsAlive].cy);
        g_ballsAlive++;
    }
}

function killAllBalls() {
    for (var i = 0; i < g_ballsAlive; i++) {
        g_ball[i].cy = g_canvas.height*2;
        g_ball[i].looseBall(this.cy);
    }
}

Ball.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    this.paddleCollision(prevX, prevY, nextX, nextY);

    // Bounce of the edges
    this.edgeCollision(nextX, nextY);

    // Bottom egde case
    this.looseBall(nextY);

    // Collision with blocks
    this.blockCollision();

    
    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

Ball.prototype.blockCollision = function () {

    if (movingItemInBlockArea(this.cy)) {
        var blockNum = blockInArea (this.cx, this.cy);
        if (g_block[blockNum].value) {
            this.yVel *=-1;
            g_block[blockNum].killBlock(this.cx, this.cy);
        }
    }
};

Ball.prototype.looseBall = function (nextY) {
    // Reset if we fall off the bottom edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;
    if (nextY > g_canvas.height + margin) {
        var temp = g_ball[g_ballsAlive-1];
        g_ball[g_ballsAlive-1] = g_ball[this.id];
        g_ball[this.id] = temp;
        g_ballsAlive--;
        if (g_ballsAlive === 0) {
            createBall();
            g_paddle.money -= g_level[g_currentLevel].penalty;
        }
    }
};

Ball.prototype.edgeCollision = function (nextX, nextY) {
    // Bounce off left and right edges
    if (nextX <= 0 ||                             // left edge
        nextX >= g_canvas.width) {               // right edge
        this.xVel *= -1;
    }
    // Bounce off top edge
    if (nextY < 0) {               // top edge
        this.yVel *= -1;
    } 
};

Ball.prototype.paddleCollision = function (prevX, prevY, nextX, nextY) {
    if (g_paddle.collidesWith(prevX, prevY, nextX, nextY, this.radius))
    {
        this.yVel *=-1;
        if ((nextX > this.cx && this.cx < g_paddle.cx) || (nextX < this.cx && this.cx > g_paddle.cx)) {
            this.xVel *=-1;
        }
        
    }  
};

Ball.prototype.reset = function () {
    this.cx = g_paddle.cx;
    this.cy = g_paddle.cy - this.radius;
    this.xVel = -5;
    this.yVel = -4; 
};

Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
};