// =====
// UTILS
// =====

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}

function writeText(ctx, style, content, x, y, color) {
    var oldColor = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.font = style;
    ctx.fillText(content, x, y);
    ctx.fillStyle = oldColor;
}

function fillEllipse(ctx, cx, cy, halfWidth, halfHeight, angle, color) {
	ctx.fillStyle = color;
    ctx.save(); // save the current ctx state, to restore later
    ctx.beginPath();
    
    // These "matrix ops" are applied in last-to-first order
    // ..which can seem a bit weird, but actually makes sense
    //
    // After modifying the ctx state like this, it's important
    // to restore it
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(halfWidth, halfHeight);
    
    // Just draw a unit circle, and let the matrices do the rest!
    ctx.arc(0, 0, 1, 0, Math.PI*2);
    ctx.fill();
    
    ctx.beginPath(); // reset to an empty path
    ctx.restore();
    ctx.fillStyle = "#B21F35";
}