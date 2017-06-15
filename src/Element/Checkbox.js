SlickUI.namespace('Element');

/**
 * Checkboxes can be toggled on/off. Use the third
 * parameter to specify whether to use a checkbox,
 * radio or cross sprite. Use the defined constants
 * to do so.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param type
 * @constructor
 */
SlickUI.Element.Checkbox = function (x, y, type) {
    this._x = x;
    this._y = y;
    this.container = null;
    this._checked = false;
    this.type = type

    if(typeof type == 'undefined') {
        this.type = SlickUI.Element.Checkbox.TYPE_CHECKBOX;
    }
};

SlickUI.Element.Checkbox.TYPE_CHECKBOX = 0;
SlickUI.Element.Checkbox.TYPE_RADIO = 1;
SlickUI.Element.Checkbox.TYPE_CROSS = 2;

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.Checkbox.prototype.setContainer = function (container) {
    this.container = container;
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Checkbox.prototype.unsetContainer = function() {
    this.container.removeParent();
};

/**
 * Initializer
 */
SlickUI.Element.Checkbox.prototype.init = function() {
    var x = this.container.x + this._x;
    var y = this.container.y + this._y;

    var key;
    switch(this.type) {
        case SlickUI.Element.Checkbox.TYPE_RADIO:
            key = 'radio';
            break;
        case SlickUI.Element.Checkbox.TYPE_CROSS:
            key = 'cross';
            break;
        default:
            key = 'check';
            break;
    }
    var sprites = this.container.root.getRenderer('checkbox').render(key);
    this.sprite = this.container.root.game.make.sprite(0,0,sprites[0].texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this._spriteOff = sprites[0];
    this._spriteOn = sprites[1];
    this.displayGroup = this.container.root.game.add.group();
    this.displayGroup.add(this.sprite);
    this.container.displayGroup.add(this.displayGroup);
    this.sprite.inputEnabled = true;
    this.sprite.fixedToCamera = true;
    this.input.useHandCursor = true;

    this.events.onInputDown.add(function () {
        this.checked = !this.checked;
    }, this);
};

/**
 * Destroys the current checkbox
 */
SlickUI.Element.Checkbox.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'x', {
    get: function() {
        return this.displayGroup.x + this._x;
    },
    set: function(value) {
        this.displayGroup.x = value - this._x;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'y', {
    get: function() {
        return this.displayGroup.y + this._y;
    },
    set: function(value) {
        this.displayGroup.y = value - this._y;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'checked', {
    get: function() {
        return this._checked;
    },
    set: function(value) {
        this._checked = value;
        if(value) {
            this.sprite.loadTexture(this._spriteOn.texture);
        } else {
            this.sprite.loadTexture(this._spriteOff.texture);
        }
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'visible', {
    get: function() {
        return this.sprite.visible;
    },
    set: function(value) {
        this.sprite.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'alpha', {
    get: function() {
        return this.sprite.alpha;
    },
    set: function(value) {
        this.sprite.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'events', {
    get: function() {
        return this.sprite.events;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'input', {
    get: function() {
        return this.sprite.input;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'width', {
    get: function() {
        return this.sprite.width;
    },
    set: function(value) {
        this.sprite.width = value;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'height', {
    get: function() {
        return this.sprite.height;
    },
    set: function(value) {
        this.sprite.height = value;
    }
});