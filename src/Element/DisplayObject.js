SlickUI.namespace('Element');

/**
 * Add any display object to the parent container. These will not
 * be sliced or resized. The width and height parameters are used
 * merely to define the size of the descending container.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param displayObject
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.DisplayObject = function (x, y, displayObject, width, height) {
    this._x = x;
    this._y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.displayObject = displayObject;
    this.container = null;
    this._width = width;
    this._height = height;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.DisplayObject.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);

    if(typeof this._width == 'undefined') {
        this._width = this.container.root.game.width;
    }
    if(typeof this._height == 'undefined') {
        this._height = this.container.root.game.height;
    }
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.DisplayObject.prototype.unsetContainer = function() {
    this.container.removeParent();
};

/**
 * Initializer
 */
SlickUI.Element.DisplayObject.prototype.init = function() {
    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    this.container.height = Math.min(this.container.parent.height - this._y, this._height);

    if(!this.displayObject instanceof Phaser.Sprite) {
        this.sprite = this.container.root.game.make.sprite(x, y, this.displayObject);
    }
    else {
        this.sprite = this.displayObject;
    }
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.sprite.fixedToCamera = true;
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.DisplayObject.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Destroys the current DisplayObject
 */
SlickUI.Element.DisplayObject.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'x', {
    get: function() {
        return this._x - this.container.parent.x;
    },
    set: function(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'y', {
    get: function() {
        return this._y - this.container.parent.y;
    },
    set: function(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'visible', {
    get: function() {
        return this.container.displayGroup.visible;
    },
    set: function(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'alpha', {
    get: function() {
        return this.container.displayGroup.alpha;
    },
    set: function(value) {
        this.container.displayGroup.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'inputEnabled', {
    get: function() {
        return this.sprite.inputEnabled;
    },
    set: function(value) {
        this.sprite.inputEnabled = value;
        if(value) {
            this.input = this.sprite.input
        } else {
            this.input = null;
        }
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'events', {
    get: function() {
        return this.sprite.events;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'width', {
    get: function() {
        return this.container.width
    },
    set: function(value) {
        this._width = value;
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'height', {
    get: function() {
        return this.container.height
    },
    set: function(value) {
        this._height = value;
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});