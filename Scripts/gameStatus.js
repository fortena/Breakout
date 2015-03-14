function startScreen (ctx) {
	var style = "bold 60px Courier",
		content = " Welcome!",
		color = "black";
		PosX = 20,
		PosY = 200;
    writeText(ctx, style, content, PosX, PosY, color);

	style = "bold 24px Courier",
	content = "To start the game press the S Key",
	PosX = 40,
	PosY = 300;
    writeText(ctx, style, content, PosX, PosY, color);
}

function pauseScreen (ctx) {
	var style = "bold 30px Courier",
		color = "black";
		content = "Game paused",
		PosX = 200,
		PosY = 300;
    writeText(ctx, style, content, PosX, PosY);
	style = "bold 20px Courier",
	content = "Finish your coffee. I want to play!",
	PosX = 200,
	PosY = 400;
    writeText(ctx, style, content, PosX, PosY, color);
}

function gameOverScreen (ctx) {
	var style = "bold 60px Courier",
	color = "black";
	content = "You're broke...",
	PosX = 40,
	PosY = 200;
    writeText(ctx, style, content, PosX, PosY, color);

	style = "bold 28px Courier",
	content = "...but once had " + g_maxValue + "$.",
	PosX = 40,
	PosY = 300;
	writeText(ctx, style, content, PosX, PosY, color);

	style = "bold 24px Courier",
	content = "To start a new game press the S Key",
	PosX = 40,
	PosY = 400;
    writeText(ctx, style, content, PosX, PosY, color);
}