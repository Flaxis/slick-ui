SlickUI.namespace('Element.Renderer');

/**
 * Default checkbox renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.CheckboxRenderer = function(game) { this.game = game };

/**
 * Renders the states of the checkbox and returns them as an array
 *
 * @returns Array (0: sprite for off state; 1: sprite for on state)
 */
SlickUI.Element.Renderer.CheckboxRenderer.prototype.render = function(key) {
    var off = this.game.make.sprite(0, 0, 'slick-ui-' + key + '_off');
    var on  = this.game.make.sprite(0, 0, 'slick-ui-' + key + '_on');

    return [off,on];
};