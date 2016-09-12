SlickUI.namespace('Element.Renderer');

/**
 * Default keyboard renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.KeyboardRenderer = function() { };

/**
 * Renders the base of the keyboard
 *
 * @returns Phaser.Sprite
 */
SlickUI.Element.Renderer.KeyboardRenderer.prototype.render = function(height) {
    var bmd = game.make.bitmapData(game.width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,game.width,height);
    bmd.ctx.fillStyle = '#cccccc';
    bmd.ctx.fill();
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,2,game.width,height - 2);
    bmd.ctx.fillStyle = '#f0f0f0';
    bmd.ctx.fill();

    return game.make.sprite(0, 0, bmd);
};