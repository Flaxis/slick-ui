SlickUI.namespace('Element');

/**
 * Create a slider to control defined values
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param size
 * @constructor
 */
SlickUI.Element.Slider = function (x, y, size, value) {
    this._x = x;
    this._y = y;
    this._width = size;
    this._value = value;
    this.container = null;
    if(typeof value == 'undefined') {
        this._value = 1;
    }
};

/**
 * Internal Container handling.
 * 
 * @param container
 */
SlickUI.Element.Slider.prototype.setContainer = function (container) {
    this.container = container;
};

/**
 * Adds the slider and makes it interactable
 */
SlickUI.Element.Slider.prototype.init = function() {
    var theme = game.cache.getJSON('slick-ui-theme');
    this.onDragStart = new Phaser.Signal();
    this.onDrag = new Phaser.Signal();
    this.onDragStop = new Phaser.Signal();

    var x = this.container.x + this._x;
    var y = this.container.y + this._y;
    var width = Math.min(this.container.width - this._x, this._width);
    var initialPosition = Math.min(1,Math.max(0,this._value)) * width + x;

    var renderedSprites = this.container.root.getRenderer('slider').render(width);
    var sprite_base = renderedSprites[0];
    var handle_off = renderedSprites[1];
    var handle_on = renderedSprites[2];
    sprite_base.x = x;
    sprite_base.y = y;

    sprite_handle = game.make.sprite(initialPosition, y, handle_off.texture);
    sprite_handle.anchor.setTo(0.5);

    sprite_handle.inputEnabled = true;
    sprite_handle.input.useHandCursor = true;
    var dragging = false;

    sprite_handle.events.onInputDown.add(function () {
        sprite_handle.loadTexture(handle_on.texture);
        dragging = true;
        this.onDragStart.dispatch((sprite_handle.x - x) / width);
    }, this);
    sprite_handle.events.onInputUp.add(function () {
        sprite_handle.loadTexture(handle_off.texture);
        dragging = false;
        this.onDragStop.dispatch((sprite_handle.x - x) / width);
    }, this);
    
    game.input.addMoveCallback(function (pointer, pointer_x) {
        if(!dragging) {
            return;
        }
        sprite_handle.x = Math.min(x + width, Math.max(x, pointer_x - this.container.displayGroup.x));
        this.onDrag.dispatch((sprite_handle.x - x) / width);
    }, this);

    this.container.displayGroup.add(sprite_base);
    this.container.displayGroup.add(sprite_handle);
};