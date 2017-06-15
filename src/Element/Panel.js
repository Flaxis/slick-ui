SlickUI.namespace('Element');

/**
 * Panels are useful for adding several individual elements to
 * in an organized way
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.Panel = function (x, y, width, height) {
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
SlickUI.Element.Panel.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Panel.prototype.unsetContainer = function() {
    this.container.removeParent();
};

/**
 * Initialisation slices the panel's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.Panel.prototype.init = function() {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.panel['border-x'] / 2);
    this.container.y += Math.round(theme.panel['border-y'] / 2);
    this.container.width -= theme.panel['border-x'];
    this.container.height -= theme.panel['border-y'];

    this._sprite = this.container.displayGroup.add(this.container.root.getRenderer('panel').render(width,height));
    this._sprite.x = x;
    this._sprite.y = y;
    this._sprite.fixedToCamera = true;
    this._offsetX = x;
    this._offsetY = y;
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.Panel.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Removes an element from the container
 *
 * @param element
 */
SlickUI.Element.Panel.prototype.remove = function(element) {
    this.container.remove(element);
};

/**
 * Destroys the panel, removing from world.
 */
SlickUI.Element.Panel.prototype.destroy = function() {

    this.container.displayGroup.removeAll(true);
    this.container.displayGroup.destroy();
    this.container.children = [];
    this.container = undefined;
    this.sprite = undefined;
};


/* ------------------------------- */


/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Panel.prototype, 'x', {
    get: function() {
        return this._x - this.container.parent.x;
    },
    set: function(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'y', {
    get: function() {
        return this._y - this.container.parent.y;
    },
    set: function(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'visible', {
    get: function() {
        return this.container.displayGroup.visible;
    },
    set: function(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'alpha', {
    get: function() {
        return this.container.displayGroup.alpha;
    },
    set: function(value) {
        this.container.displayGroup.alpha = value;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.Panel.prototype, 'width', {
    get: function() {
        return this.container.width
    },
    set: function(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._width = Math.round(value + theme.panel['border-x']);
        this._sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this._sprite);
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'height', {
    get: function() {
        return this.container.height
    },
    set: function(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.panel['border-y']);
        this._sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this._sprite);
    }
});