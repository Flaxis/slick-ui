SlickUI.namespace('Element.Renderer');

/**
 * Default key renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.KeyRenderer = function(game) { this.game = game };

/**
 * Renders the states of the key and returns them as an array
 *
 * @returns Array (0: sprite for up state; 1: sprite for down state)
 */
SlickUI.Element.Renderer.KeyRenderer.prototype.render = function(width, height) {
    var graphicsUp = this.game.make.graphics(0, 0);
    graphicsUp.beginFill(0xcfcfcf);
    graphicsUp.drawRoundedRect(0,0,width, height, 5);
    graphicsUp.beginFill(0xffffff);
    graphicsUp.drawRoundedRect(1,1,width - 2, height - 2, 5);

    var graphicsDown = this.game.make.graphics(0, 0);
    graphicsDown.beginFill(0x178ab8);
    graphicsDown.drawRoundedRect(0,0,width, height, 5);
    graphicsDown.beginFill(0x1fa7e1);
    graphicsDown.drawRoundedRect(1,1,width - 2, height - 2, 5);

    var keyUp = this.game.make.sprite(0, 0, graphicsUp.generateTexture());
    var keyDown = this.game.make.sprite(0, 0, graphicsDown.generateTexture());

    return [keyUp, keyDown]
};