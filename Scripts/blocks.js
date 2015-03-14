function Block (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


var g_block = [];


function createBlocks() {
	for (var i = 0; i < g_numOfBlocks; i++) {
		g_block[i] = new Block({
		value : true,
		item : false
		});
	}
};

function movingItemInBlockArea (cy) {
	var blockAreaMin = g_level[g_currentLevel].firstRowY,
        blockAreaMax = g_level[g_currentLevel].firstRowY +
                        g_level[g_currentLevel].blockHeight *
                        g_level[g_currentLevel].numRows;

    return ((blockAreaMin < cy) && (blockAreaMax > cy));
}

function blockInArea (cx, cy) {
	var blockCol = Math.floor(cx / g_level[g_currentLevel].blockWidth),
        blockRow = Math.floor((cy - g_level[g_currentLevel].firstRowY)/
                                    g_level[g_currentLevel].blockHeight);
    return (blockRow * g_level[g_currentLevel].numCol + blockCol);
}

function areAllBlocksDead() {
    for (var i = 0; i < g_numOfBlocks; i++) {
        if (g_block[i].value) return false;
    }
    return true;
}

Block.prototype.killBlock = function (cx, cy) {
	this.value = false;
	g_paddle.money += g_level[g_currentLevel].reward;
	if(Math.floor(5*Math.random())===0) createItem(cx, cy);
};

Block.prototype.render = function (ctx, i) {
	//var colX = this.halfWidth * (2 * i%(g_canvas.width / this.halfWidth));
	var colX = g_level[g_currentLevel].blockWidth *
				(i%(g_canvas.width / g_level[g_currentLevel].blockWidth));
	var row = Math.floor(i/(g_canvas.width / (g_level[g_currentLevel].blockWidth)));
	var rowY = g_level[g_currentLevel].firstRowY  +
				g_level[g_currentLevel].blockHeight * row;
	var style = "#B21F35";
	fillBox(ctx, colX, rowY,
		g_level[g_currentLevel].blockWidth-3,
		g_level[g_currentLevel].blockHeight-3, style);
};