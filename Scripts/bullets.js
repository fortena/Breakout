function Bullet (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

var g_bullet = [],
	g_bulletsAlive = 0,
	g_gunAllowed = false,
	g_gunInterval = 1000;


function fireGun(cx, cy) {
	createBullets(cx, cy);
}



function createBullets(p_cx, p_cy) {
	// Left bullet
	g_bullet[g_bulletsAlive] = new Bullet ({
		alive : true,
		id : g_bulletsAlive,
		cx : p_cx-10,
		cy : p_cy,
		radius : 5,
		color : "black",
		yVel : 8
	});
	g_bulletsAlive++;
	// Right bullet
	g_bullet[g_bulletsAlive] = new Bullet ({
		alive : true,
		id : g_bulletsAlive,
		cx : p_cx+10,
		cy : p_cy,
		radius : 5,
		color : "black",
		yVel : 8
	});
	g_bulletsAlive++;
}

Bullet.prototype.killBullet = function () {
	var temp = g_bullet[g_bulletsAlive-1];
        g_bullet[g_bulletsAlive-1] = g_bullet[this.id];
        g_bullet[this.id] = temp;
        this.alive = false;
        g_bulletsAlive--;
}

Bullet.prototype.update = function(du) {
	this.cy -= this.yVel*du;
	this.blockCollision();
}

Bullet.prototype.render = function(ctx) {
	fillEllipse(ctx, this.cx, this.cy, this.radius/2, this.radius, 0, this.color);
}

Bullet.prototype.blockCollision = function () {
	if (movingItemInBlockArea(this.cy)) {
		var blockNum = blockInArea(this.cx, this.cy);
		if (g_block[blockNum].value) {
            if (this.alive) g_block[blockNum].killBlock(this.cx, this.cy);
            this.killBullet();
        }
	}
};