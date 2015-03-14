// GENERIC UPDATE LOGIC

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
//
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
//
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
//
var g_isUpdateOdd = false;


function update(dt) {

    startGame();
    nextLevel();
    maxValue();
    gameOver();

    // Get out if skipping (e.g. due to pause-mode)
    //
    if (shouldSkipUpdate()) return;

    

    // Remember this for later
    //
    var original_dt = dt;
    
    // Warn about very large dt values -- they may lead to error
    //
    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }
    
    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    //
    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    updateSimulation(du);
    
    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;
    
    g_isUpdateOdd = !g_isUpdateOdd;
}

// Togglable Pause Mode
//
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);
var KEY_START  = 'S'.charCodeAt(0);

var g_isUpdatePaused = false;
var g_hasGameStarted = false;
var g_isGameOver = false;
var g_maxValue = 0;

function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE)) {
        g_isUpdatePaused = !g_isUpdatePaused;
    }
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}

function startGame() {
    if (eatKey(KEY_START) && (!g_hasGameStarted || g_isGameOver)) {
        g_currentLevel = 0;
        g_nextRowY = 40;
        g_nextReward = 10;
        g_nextPenalty = 100;
        createLevel();
        createBlocks();
        g_hasGameStarted = true;
        g_isGameOver = false;
        g_paddle.money = 0;
        g_maxValue = 0;
        killAllBalls();
        createBall();
    }    
}

function gameOver() {
    if (g_paddle.money < 0) {
        g_isGameOver = true;
    }    
}

function maxValue() {
    if (g_paddle.money > g_maxValue) {g_maxValue = g_paddle.money};
}