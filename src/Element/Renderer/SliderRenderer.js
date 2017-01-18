SlickUI.namespace('Element.Renderer');

/**
 * Default slider renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.SliderRenderer = function(game) { this.game = game };

/**
 * Renders the slider and returns it's components as an array
 *
 * @returns Array (0: base; 1: handle off; 2: handle on)
 */
SlickUI.Element.Renderer.SliderRenderer.prototype.render = function(size, vertical) {
    var theme = this.game.cache.getJSON('slick-ui-theme');

    var sprite_base = this.game.make.sprite(0, 0, 'slick-ui-slider_base');
    var sprite_end = this.game.make.sprite(0, 0, 'slick-ui-slider_end');

    var bmd = this.game.add.bitmapData(size, sprite_end.height);
    bmd.copy(
        sprite_base,
        0,
        0,
        1,
        sprite_base.height,
        0,
        Math.round(sprite_end.height/4),
        size,
        sprite_base.height
    );
    bmd.copy(
        sprite_end,
        0,
        0,
        sprite_end.width,
        sprite_end.height,
        0,
        0,
        sprite_end.width,
        sprite_end.height
    );
    bmd.copy(
        sprite_end,
        0,
        0,
        sprite_end.width,
        sprite_end.height,
        size - sprite_end.width,
        0,
        sprite_end.width,
        sprite_end.height
    );

    var handle_off = this.game.make.sprite(0, 0, 'slick-ui-slider_handle_off');
    var handle_on = this.game.make.sprite(0, 0, 'slick-ui-slider_handle_on');

    sprite_base = this.game.make.sprite(0, 0, bmd);

    if(vertical) {
        sprite_base.angle = 90;
    }

    return [sprite_base, handle_off, handle_on];
};