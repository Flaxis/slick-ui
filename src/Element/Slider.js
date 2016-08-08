SlickUI.Element = SlickUI.Element ? SlickUI.Element : { };

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

    var sprite_base = game.make.sprite(0, 0, 'slick-ui-slider_base');
    var sprite_end = game.make.sprite(0, 0, 'slick-ui-slider_end');

    var bmd = game.add.bitmapData(width, sprite_end.height);
    bmd.copy(
        sprite_base,
        0,
        0,
        1,
        sprite_base.height,
        0,
        Math.round(sprite_end.height/4),
        width,
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
        width - sprite_end.width,
        0,
        sprite_end.width,
        sprite_end.height
    );

    var handle_off = game.make.sprite(0, 0, 'slick-ui-slider_handle_off');
    var handle_on = game.make.sprite(0, 0, 'slick-ui-slider_handle_on');

    sprite_base = game.make.sprite(x, y, bmd);
    sprite_handle = game.make.sprite(initialPosition, y, 'slick-ui-slider_handle_off');
    sprite_handle.anchor.setTo(0.5);

    sprite_handle.inputEnabled = true;
    sprite_handle.input.useHandCursor = true;
    var dragging = false;

    sprite_handle.events.onInputDown.add(function () {
        sprite_handle.setTexture(handle_on.generateTexture());
        dragging = true;
        this.onDragStart.dispatch((sprite_handle.x - x) / width);
    }, this);
    sprite_handle.events.onInputUp.add(function () {
        sprite_handle.setTexture(handle_off.generateTexture());
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