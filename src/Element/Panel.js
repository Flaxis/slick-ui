SlickUI.Element = SlickUI.Element ? SlickUI.Element : { };

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
 * Initialisation slices the panel's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.Panel.prototype.init = function() {
    var theme = game.cache.getJSON('slick-ui-theme');
    var panel = game.make.sprite(0, 0, 'slick-ui-panel');
    var bmd = game.add.bitmapData(game.width, game.height);

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.panel['border-x'] / 2);
    this.container.y += Math.round(theme.panel['border-y'] / 2);
    this.container.width -= theme.panel['border-x'];
    this.container.height -= theme.panel['border-y'];

    bmd.copyRect(panel,new Phaser.Rectangle(0,0,theme.panel['border-x'],theme.panel['border-y'])); // Left corner
    bmd.copy(
        panel,
        theme.panel['border-x'] + 1,
        0,
        1,
        theme.panel['border-y'],
        theme.panel['border-x'],
        0,
        width - theme.panel['border-x'] * 2,
        theme.panel['border-y']
    ); // Top border

    bmd.copyRect(panel,new Phaser.Rectangle(panel.width - theme.panel['border-x'],0,theme.panel['border-x'],theme.panel['border-y']), width - theme.panel['border-x']); // Right corner

    bmd.copy(
        panel,
        0,
        theme.panel['border-y'] + 1,
        theme.panel['border-x'],
        1,
        0,
        theme.panel['border-y'],
        theme.panel['border-x'],
        height - theme.panel['border-y'] * 2
    ); // Left border

    bmd.copy(
        panel,
        panel.width - theme.panel['border-x'],
        theme.panel['border-y'] + 1,
        theme.panel['border-x'],
        1,
        width - theme.panel['border-x'],
        theme.panel['border-y'],
        theme.panel['border-x'],
        height - theme.panel['border-y'] * 2
    ); // Right border

    bmd.copyRect(panel,new Phaser.Rectangle(0,panel.height - theme.panel['border-y'],theme.panel['border-x'],theme.panel['border-y']), 0, height - theme.panel['border-y']); // Left bottom corner
    bmd.copyRect(panel,new Phaser.Rectangle(panel.width - theme.panel['border-x'],panel.height - theme.panel['border-y'],theme.panel['border-x'],theme.panel['border-y']), width - theme.panel['border-x'], height - theme.panel['border-y']); // Right bottom corner
    bmd.copy(
        panel,
        theme.panel['border-x'] + 1,
        panel.height - theme.panel['border-y'],
        1,
        theme.panel['border-y'],
        theme.panel['border-x'],
        height - theme.panel['border-y'],
        width - theme.panel['border-x'] * 2,
        theme.panel['border-y']
    ); // Bottom border

    bmd.copy(
        panel,
        theme.panel['border-x'],
        theme.panel['border-y'],
        1,
        1,
        theme.panel['border-x'],
        theme.panel['border-y'],
        width - theme.panel['border-x'] * 2,
        height - theme.panel['border-y'] * 2
    ); // Body

    this._sprite = this.container.displayGroup.create(x, y, bmd);
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
        var theme = game.cache.getJSON('slick-ui-theme');
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
        var theme = game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.panel['border-y']);
        this._sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this._sprite);
    }
});