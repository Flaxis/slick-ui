SlickUI.Element = SlickUI.Element ? SlickUI.Element : { };

/**
 * Add text to a UI element
 *
 * @author Jim Blinkhorn <jim@wrinklydoggames.com>
 * @param x
 * @param y
 * @param value
 * @param size
 * @param font
 * @param width
 * @param height 
 * @param tint 
 * @param hoverTint 
 * @param downTint
 * @constructor
 */
SlickUI.Element.TextButton = function (x, y, value, size, font, width, height, tint, hoverTint, downTint) {
    this._x = x;
    this._y = y;
    this._value = value;
    this.width = width;
    this.height = height;
    this.font = font;
    this.size = size;
    this.tint = tint;
    this.hoverTint = hoverTint;
    this.downTint = downTint;

    if(typeof this.width == 'undefined') {
        this.width = game.width;
    }
    if(typeof this.height == 'undefined') {
        this.height = game.height;
    }
    if(typeof this.size == 'undefined') {
        this.size = 16;
    }
    if(typeof this.size == 'undefined') {
        this.size = 16;
    }
    if(typeof this.tint == 'undefined') {
        this.tint = 0xffffff;
    }
    if(typeof this.hoverTint == 'undefined') {
        this.hoverTint = 0xffffff;
    }
    if(typeof this.downTint == 'undefined') {
        this.downTint = 0xffffff;
    }

    this.container = null;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.TextButton.prototype.setContainer = function (container) {
    this.container = container;
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
SlickUI.Element.TextButton.prototype.reset = function(x, y, recalculateWidth) {
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
    this.text = game.make.bitmapText(x, y, this.font, this._value, this.size);
    this.text.maxWidth = width;
    this.text.maxHeight = height;
    this.container.displayGroup.add(this.text);
    this.text.fixedToCamera = true;
    this.text.tint = this.tint;
    this.text.inputEnabled = true;
    this.text.input.useHandCursor = true;

    this.text.events.onInputOver.add(function() {
        this.text.tint = this.hoverTint;
    }, this);
    this.text.events.onInputOut.add(function() {
        this.text.tint = this.tint;
    }, this);
    this.text.events.onInputDown.add(function() {
        this.text.tint = this.downTint;
    }, this);
    this.text.events.onInputUp.add(function() {
        this.text.tint = this.tint;
    }, this);

    this.events = this.text.events;
};

/**
 * Initialize text
 */
SlickUI.Element.TextButton.prototype.init = function() {
    var theme = game.cache.getJSON('slick-ui-theme');

    if(typeof this.font == 'undefined') {
        this.font = Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1];
    }

    this.reset(this._x,this._y);
};

/**
 * Center the text horizontally relative to parent container
 *
 * @returns {SlickUI.Element.TextButton}
 */
SlickUI.Element.TextButton.prototype.centerHorizontally = function() {
    this.text.cameraOffset.x = this.text.maxWidth / 2 - this.text.width / 2 + this.container.x;
    return this;
};

/**
 * Center the text vertically relative to parent container
 *
 * @returns {SlickUI.Element.TextButton}
 */
SlickUI.Element.TextButton.prototype.centerVertically = function() {
    var theme = game.cache.getJSON('slick-ui-theme');
    this.text.cameraOffset.y = this.container.height / 2 - this.text.height / 2 - Math.round(theme.button['border-y'] / 2) + this.container.y;
    return this;
};

/**
 * Center the text both horizontally and vertically
 *
 * @returns {SlickUI.Element.TextButton}
 */
SlickUI.Element.TextButton.prototype.center = function() {
    this.centerHorizontally();
    this.centerVertically();
    return this;
};


/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.TextButton.prototype, 'x', {
    get: function() {
        return this.text.cameraOffset.x - this.container.x;
    },
    set: function(value) {
        this.text.cameraOffset.x = value + this.container.x;
    }
});

Object.defineProperty(SlickUI.Element.TextButton.prototype, 'y', {
    get: function() {
        return this.text.cameraOffset.y - this.container.y;
    },
    set: function(value) {
        this.text.cameraOffset.y = value + this.container.y;
    }
});

Object.defineProperty(SlickUI.Element.TextButton.prototype, 'value', {
    get: function() {
        return this.text.text;
    },
    set: function(value) {
        this.text.text = value;
    }
});