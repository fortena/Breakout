function Level (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

var g_level = [],
	g_currentLevel = 0,
	g_numOfBlocks = 50,
	g_numCol = 10,
	g_numRows = 5,
	g_blockWidth = 60,
	g_blockHeight = 20,
	g_nextRowY = 40,
	g_nextReward = 10,
	g_nextPenalty = 100;

Level.prototype.render = function(ctx) {
	var style = "bold 20px Courier";
	var color = "#FFFFEE";
		writeText(ctx, style, "Level " + g_currentLevel, 15, g_canvas.height-2, color);
		writeText(ctx, style, "Penalty: " + this.penalty + "$", 200, g_canvas.height-2, color);
		writeText(ctx, style, "Reward: " + this.reward + "$", 400, g_canvas.height-2, color);

}

function createLevel() {
	g_currentLevel++;
	console.log(g_nextReward + " " + g_nextPenalty);
	g_level[g_currentLevel] = new Level({
		numCol : g_numCol,
		numRows : g_numRows,
		blockWidth : g_blockWidth,
		blockHeight : g_blockHeight,
		firstRowY : g_nextRowY,
		reward : g_nextReward,
		penalty : g_nextPenalty
	});
	g_nextReward *=2;
	g_nextPenalty *=3;
	g_nextRowY +=10;
}

function areBallsOutOfRange() {
	for (var i = 0; i < g_ballsAlive; i++) {
		if (!(g_ball[i].cy + g_level[g_currentLevel].blockHeight <
            g_level[g_currentLevel].firstRowY ||
            g_ball[i].cy - g_level[g_currentLevel].blockHeight > (g_level[g_currentLevel].firstRowY +
            g_level[g_currentLevel].blockHeight * g_level[g_currentLevel].numRows))) {
			return false;
		}
	}
	return true;
}

function areBulletsOutOfRange() {
	for (var i = 0; i < g_bulletsAlive; i++) {
		if (movingItemInBlockArea(g_bullet[i].cy)) return false;
	}
	return true;
}

function nextLevel() {
    if (g_hasGameStarted) {
    	if (areAllBlocksDead() && areBulletsOutOfRange() && areBallsOutOfRange()){
    		createLevel();
        	createBlocks();
    	}
    }
    
}