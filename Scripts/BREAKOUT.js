// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/



// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) { 
    
    // No updates if the game hasn't started or it the game is over
    if (g_hasGameStarted && !g_isGameOver) {

        // Update balls
        for (var i = 0; i < g_ballsAlive; i++) {
            g_ball[i].update(du);
        }
        
        g_paddle.update(du);

        // update items
        for (var i = 0; i < g_itemCount; i++) {
            if (g_item[i].relevant) g_item[i].update(du);
        }

        // update bullets
        for (var i = 0; i < g_bulletsAlive; i++) {
            g_bullet[i].update(du);
        }
    }


}
// PADDLE 1


var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_W = 'W'.charCodeAt(0);

var g_paddle = new Paddle({
    cx : g_canvas.width/2,
    cy : g_canvas.height - 30,
    color : "black",

    money : 0,
    xVel : 5,
    
    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D,
    SHOOT_GUN : KEY_W

});


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if (!g_hasGameStarted) startScreen(ctx);
    if (g_isGameOver) gameOverScreen (ctx);

    if (g_hasGameStarted && !g_isGameOver) {
        // render balls
        for (var i = 0; i < g_ballsAlive; i++) {
            g_ball[i].render(ctx);
        }

        // render paddle
        g_paddle.render(ctx);

        // render Level stats
        g_level[g_currentLevel].render(ctx);

        // render blocks
        for (var i = 0; i < g_block.length ; i++) {
            if (g_block[i].value) {
                g_block[i].render (ctx, i);
            }
        }

        // render items
        for (var i = 0; i < g_itemCount; i++) {
            if (g_item[i].relevant) g_item[i].render(ctx);
        }

        // render bullets
        for (var i = 0; i < g_bulletsAlive; i++) {
            if (g_bullet[i].alive) g_bullet[i].render(ctx);
        }
    }
}

// Kick it off
g_main.init();