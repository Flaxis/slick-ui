SlickUI.namespace('Element');

/**
 * Create a slider to control defined values
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param size
 * @param value
 * @param vertical
 * @constructor
 */
SlickUI.Element.Slider = function (x, y, size, value, vertical) {
    this._x = x;
    this._y = y;
    this._size = size;
    this._value = value;
    this._vertical = true === vertical;
    this.container = null;
    if(typeof value == 'undefined') {
        this._value = 1;
    }
    if(this._vertical) {
        this._value = Math.abs(this._value - 1);
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
 * Removes parent reference for the current element.
 */
SlickUI.Element.Slider.prototype.unsetContainer = function() {
    this.container.removeParent();
};

/**
 * Adds the slider and makes it interactable
 */
SlickUI.Element.Slider.prototype.init = function() {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
    this.onDragStart = new Phaser.Signal();
    this.onDrag = new Phaser.Signal();
    this.onDragStop = new Phaser.Signal();
    this.displayGroup = game.add.group();

    var x = this.container.x + this._x;
    var y = this.container.y + this._y;
    var position = this._vertical ? y : x;
    var modulatingVariable = this._vertical ? 'y' : 'x';
    var size = Math.min(this.container.width - this._x, this._size);
    if(this._vertical) {
        size = Math.min(this.container.height - this._y, this._size);
    }
    var initialPosition = Math.min(1,Math.max(0,this._value)) * size + position;

    var renderedSprites = this.container.root.getRenderer('slider').render(size, this._vertical);
    var sprite_base = renderedSprites[0];
    var handle_off = renderedSprites[1];
    var handle_on = renderedSprites[2];
    sprite_base.x = x;
    sprite_base.y = y;

    var sprite_handle = this.container.root.game.make.sprite(this._vertical ? x : initialPosition, this._vertical ? initialPosition : y, handle_off.texture);
    sprite_handle.anchor.setTo(0.5);

    if(this._vertical) {
        sprite_handle.angle = 270;
    }
    sprite_base.fixedToCamera = true;
    sprite_handle.fixedToCamera = true;
    sprite_handle.inputEnabled = true;
    sprite_handle.input.useHandCursor = true;
    var dragging = false;

    var getValue = function() {
        var value = (sprite_handle.cameraOffset[modulatingVariable] - position) / size;
        if(this._vertical) {
            value = Math.abs(value - 1);
        }
        return value;
    };

    sprite_handle.events.onInputDown.add(function () {
        sprite_handle.loadTexture(handle_on.texture);
        dragging = true;
        this.onDragStart.dispatch(getValue.apply(this));
    }, this);
    sprite_handle.events.onInputUp.add(function () {
        sprite_handle.loadTexture(handle_off.texture);
        dragging = false;
        this.onDragStop.dispatch(getValue.apply(this));
    }, this);

    this.container.root.game.input.addMoveCallback(function (pointer, pointer_x, pointer_y) {
        if(!dragging) {
            return;
        }
        var _pos = (this._vertical ? pointer_y : pointer_x) - this.displayGroup[modulatingVariable];
        sprite_handle.cameraOffset[modulatingVariable] = Math.min(position + size, Math.max(position, _pos - this.container.displayGroup[modulatingVariable]));
        this.onDrag.dispatch(getValue.apply(this));
    }, this);

    this.displayGroup.add(sprite_base);
    this.displayGroup.add(sprite_handle);
    this.container.displayGroup.add(this.displayGroup);
};

/**
 * Destroys the current slider
 */
SlickUI.Element.Slider.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Slider.prototype, 'x', {
    get: function() {
        return this.displayGroup.x + this._x;
    },
    set: function(value) {
        this.displayGroup.x = value - this._x;
    }
});

Object.defineProperty(SlickUI.Element.Slider.prototype, 'y', {
    get: function() {
        return this.displayGroup.y + this._y;
    },
    set: function(value) {
        this.displayGroup.y = value - this._y;
    }
});

Object.defineProperty(SlickUI.Element.Slider.prototype, 'alpha', {
    get: function() {
        return this.displayGroup.alpha;
    },
    set: function(value) {
        this.displayGroup.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.Slider.prototype, 'visible', {
    get: function() {
        return this.displayGroup.visible;
    },
    set: function(value) {
        this.displayGroup.visible = value;
    }
});