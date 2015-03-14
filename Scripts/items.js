function Item (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

var g_itemList = ["guns", "paddleSpeedUp", "paddleSlowDown", "smallPaddle", "bigPaddle", "slowBall", "extraBall", "fastBall", "wrongDirections"];
//var g_itemColorList = ["'#FF6018'", "'#53B228'", "'#4C58BF'", "'#666645'", "'#FF1B18'", "'#B2B128'", "'#FF4AC6'", "'#9F6FFF'", "'#FFEA10'"];
var g_itemColorList = ["#D82735", "#FFCB35", "#06A9FC", "#16DD36", "#009E47", "#0079E7", "#BD7AF6", "#FF7435", "#7D3CB5"];
var g_item = [];
var g_itemCount = 0;
var g_itemLastFor = 20000;
var g_isSlowBall = false,
	g_isFastBall = false;

function createItem(blockCX, blockCY) {
	var randomItem = Math.floor(g_itemList.length*Math.random()),
		itemContains = g_itemList[randomItem],
		itemColor = g_itemColorList[randomItem];
	g_item[g_itemCount] = new Item ({
		relevant : true,
		contains : itemContains,
		color : itemColor,
		cx : blockCX,
		cy : blockCY,
		radius : 10,
		yVel : 3
	});
	g_itemCount++;
}

Item.prototype.update = function (du) {
	var prevX = this.cx,
		prevY = this.cy,
		nextX = this.cx,
		nextY = this.cy + this.yVel * du;
	this.cy = nextY;
	if (g_paddle.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
		if (this.contains === "guns") this.guns();
		if (this.contains === "paddleSpeedUp") this.paddleSpeedUp();
		if (this.contains === "paddleSlowDown") this.paddleSlowDown();
		if (this.contains === "smallPaddle") this.smallPaddle();
		if (this.contains === "bigPaddle") this.bigPaddle();
		if (this.contains === "slowBall") this.slowBall();
		if (this.contains === "extraBall") this.extraBall();
		if (this.contains === "fastBall") this.fastBall();
		if (this.contains === "wrongDirections") this.wrongDirections();
		g_paddle.color = this.color;
		this.relevant = false;
	}
}

Item.prototype.render = function (ctx) {
	//fillCircle(ctx, this.cx, this.cy, this.radius);
	fillEllipse(ctx, this.cx, this.cy, this.radius, this.radius/2, 0, this.color);
}

Item.prototype.whatEffect = function() {
	return "this." + this.contains + "();";
}

Item.prototype.cancelEffects = function() {
	g_paddle.color = "black";
	g_paddle.xVel = 5;
	g_paddle.halfWidth = 50;
	g_paddle.GO_LEFT = KEY_A;
	g_paddle.GO_RIGHT = KEY_D;
	g_gunAllowed = false;
	if(g_isFastBall) {
		for (var i = 0; i < g_ballsAlive; i++) {
			g_ball[i].xVel/=1.5;
			g_ball[i].yVel/=1.5;
		}
		g_isFastBall = false;
	}
	if (g_isSlowBall) {
		for (var i = 0; i < g_ballsAlive; i++) {
			g_ball[i].xVel*=1.5;
			g_ball[i].yVel*=1.5;
		}
		g_isSlowBall = false;
	}

}

Item.prototype.timeEffect = function() {
	setTimeout(this.cancelEffects, g_itemLastFor);
}

Item.prototype.guns = function() {
	this.cancelEffects();
	g_gunAllowed = true;
	this.timeEffect();
}

Item.prototype.paddleSpeedUp = function() {
	this.cancelEffects();
	g_paddle.xVel *=2;
	this.timeEffect();
}

Item.prototype.paddleSlowDown = function() {
	this.cancelEffects();
	g_paddle.xVel *=0.5;
	this.timeEffect();
}

Item.prototype.smallPaddle = function() {
	this.cancelEffects();
	g_paddle.halfWidth = 40;
	this.timeEffect();
}

Item.prototype.bigPaddle = function() {
	this.cancelEffects();
	g_paddle.halfWidth = 60;
	this.timeEffect();
}

Item.prototype.slowBall = function() {
	this.cancelEffects();
	for (var i = 0; i < g_ballsAlive; i++) {
		g_ball[i].xVel/=1.5;
		g_ball[i].yVel/=1.5;
	}
	g_isSlowBall = true;
	this.timeEffect();
}

Item.prototype.extraBall = function() {
	createBall();
}

Item.prototype.fastBall = function() {
	this.cancelEffects();
	for(var i = 0; i < g_ballsAlive; i++) {
		g_ball[i].xVel*=1.5;
		g_ball[i].yVel*=1.5;
	}
	g_isFastBall = true;
	this.timeEffect();
	
}

Item.prototype.wrongDirections = function() {
	this.cancelEffects();
	g_paddle.GO_LEFT = KEY_D;
	g_paddle.GO_RIGHT = KEY_A;
	this.timeEffect();
}