SlickUI.namespace('Element');

/**
 * Add text to a UI element
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param value
 * @param size
 * @param font
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.Text = function (x, y, value, size, font, width, height) {
    this._x = x;
    this._y = y;
    this._value = value;
    this.width = width;
    this.height = height;
    this.font = font;
    this.size = size;
    this.container = null;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.Text.prototype.setContainer = function (container) {
    this.container = container;

    if(typeof this.width == 'undefined') {
        this.width = this.container.root.game.width;
    }
    if(typeof this.height == 'undefined') {
        this.height = this.container.root.game.height;
    }
    if(typeof this.size == 'undefined') {
        this.size = 16;
    }
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Text.prototype.unsetContainer = function() {
    this.container.removeParent();
};

/**
 * Bitmap text objects don't work too well when moved around;
 * that's why we destroy it and re-create it.
 * Feel free to improve this code.
 *
 * @param x
 * @param y
 * @param recalculateWidth
 */
SlickUI.Element.Text.prototype.reset = function(x, y, recalculateWidth) {
    var width, height;
    width = Math.min(this.container.width - x, this.width);
    height = Math.min(this.container.height - y, this.height);
    if(typeof this.text != 'undefined') {
        if(recalculateWidth === false) {
            width = this.text.maxWidth;
            height = this.text.maxHeight;
        }
        this.text.destroy();
    }
    x += this.container.x;
    y += this.container.y;
    this.text = this.container.root.game.make.bitmapText(x, y, this.font, this._value, this.size);
    this.text.maxWidth = width;
    this.text.maxHeight = height;
    this.container.displayGroup.add(this.text);
    this.text.fixedToCamera = true;
};

/**
 * Initialize text
 */
SlickUI.Element.Text.prototype.init = function() {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    if(typeof this.font == 'undefined') {
        this.font = Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1];
    }

    this.reset(this._x,this._y);
};

/**
 * Center the text horizontally relative to parent container
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.centerHorizontally = function() {
    this.text.cameraOffset.x = this.text.maxWidth / 2 - this.text.width / 2 + this.container.x;
    return this;
};

/**
 * Center the text vertically relative to parent container
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.centerVertically = function() {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
    this.text.cameraOffset.y = this.container.height / 2 - this.text.height / 2 - Math.round(theme.button['border-y'] / 2) + this.container.y;
    return this;
};

/**
 * Center the text both horizontally and vertically
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.center = function() {
    this.centerHorizontally();
    this.centerVertically();
    return this;
};

/**
 * Destroys the current text
 */
SlickUI.Element.Text.prototype.destroy = function () {
    this.container.destroy();
};


/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Text.prototype, 'x', {
    get: function() {
        return this.text.cameraOffset.x - this.container.x;
    },
    set: function(value) {
        this.text.cameraOffset.x = value + this.container.x;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'y', {
    get: function() {
        return this.text.cameraOffset.y - this.container.y;
    },
    set: function(value) {
        this.text.cameraOffset.y = value + this.container.y;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'alpha', {
    get: function() {
        return this.text.alpha;
    },
    set: function(value) {
        this.text.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'visible', {
    get: function() {
        return this.text.visible;
    },
    set: function(value) {
        this.text.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'value', {
    get: function() {
        return this.text.text;
    },
    set: function(value) {
        this.text.text = value;
    }
});