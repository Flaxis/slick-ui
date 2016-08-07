SlickUI.Element = SlickUI.Element ? SlickUI.Element : { };

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
    this.x = x;
    this.y = y;
    this.value = value;
    this.width = width;
    this.height = height;
    this.font = font;
    this.size = size;
    if(typeof this.width == 'undefined') {
        this.width = game.width;
    }
    if(typeof this.height == 'undefined') {
        this.height = game.height;
    }
    if(typeof this.size == 'undefined') {
        this.size = 16;
    }
    this.container = null;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.Text.prototype.setContainer = function (container) {
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
    this.text = game.make.bitmapText(x, y, this.font, this.value, this.size);
    this.text.maxWidth = width;
    this.text.maxHeight = height;
    this.container.displayGroup.add(this.text);
    this.text.fixedToCamera = true;
};

/**
 * Initialize text
 */
SlickUI.Element.Text.prototype.init = function() {
    var theme = game.cache.getJSON('slick-ui-theme');

    if(typeof this.font == 'undefined') {
        this.font = Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1];
    }

    this.reset(this.x,this.y);
};

/**
 * Center the text horizontally relative to parent container
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.centerHorizontally = function() {
    this.reset(this.text.maxWidth / 2 - this.text.width / 2, this.container.y - this.text.y, false);
    return this;
};

/**
 * Center the text vertically relative to parent container
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.centerVertically = function() {
    this.reset(this.container.x - this.text.x, this.text.maxHeight / 2 - this.text.height / 1.5, false);
    return this;
};

/**
 * Center the text both horizontally and vertically
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.center = function() {
    this.reset(this.text.maxWidth / 2 - this.text.width / 2, this.text.maxHeight / 2 - this.text.height / 1.5, false);
    return this;
};