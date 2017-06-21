SlickUI.namespace('Element');

/**
 * Create an interactable button. After initialisation,
 * you can use Button.events to add mouse events to the button.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.Button = function (x, y, width, height) {
    this._x = x;
    this._y = y;
    this._offsetX = x;
    this._offsetY = y;
    this._width = width;
    this._height = height;
    this.container = null;
};

/**
 * Internal Container handling.
 * 
 * @param container
 */
SlickUI.Element.Button.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Button.prototype.unsetContainer = function() {
    this.container.removeParent();
};

/**
 * Initialisation slices the button's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.Button.prototype.init = function() {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.button['border-x'] / 2);
    this.container.y += Math.round(theme.button['border-y'] / 2);
    this.container.width -= theme.button['border-x'];
    this.container.height -= theme.button['border-y'];

    var renderedSprites = this.container.root.getRenderer('button').render(width, height);
    this.spriteOff = renderedSprites[0];
    this.spriteOn = renderedSprites[1];

    this.sprite = this.container.root.game.make.button(x, y);
    this.sprite.loadTexture(this.spriteOff.texture);
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.sprite.fixedToCamera = true;

    var hover = false;
    this.sprite.events.onInputOver.add(function() {hover = true}, this);
    this.sprite.events.onInputOut.add(function() {hover = false}, this);

    this.sprite.events.onInputDown.add(function () {
        this.sprite.loadTexture(this.spriteOn.texture);
    }, this);

    this.sprite.events.onInputUp.add(function () {
        this.sprite.loadTexture(this.spriteOff.texture);
        if(!hover) {
            this.sprite.events.onInputUp.halt();
        }
    }, this);

    this.events = this.sprite.events;
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.Button.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Destroys the current button
 */
SlickUI.Element.Button.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Button.prototype, 'x', {
    get: function() {
        return this._x - this.container.parent.x;
    },
    set: function(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'y', {
    get: function() {
        return this._y - this.container.parent.y;
    },
    set: function(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'visible', {
    get: function() {
        return this.container.displayGroup.visible;
    },
    set: function(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'alpha', {
    get: function() {
        return this.container.displayGroup.alpha;
    },
    set: function(value) {
        this.container.displayGroup.alpha = value;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.Button.prototype, 'width', {
    get: function() {
        return this.container.width
    },
    set: function(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._width = Math.round(value + theme.button['border-x']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'height', {
    get: function() {
        return this.container.height
    },
    set: function(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.button['border-y']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});