SlickUI.Element = SlickUI.Element ? SlickUI.Element : { };

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
 * Initialisation slices the button's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.Button.prototype.init = function() {
    var theme = game.cache.getJSON('slick-ui-theme');

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.button['border-x'] / 2);
    this.container.y += Math.round(theme.button['border-y'] / 2);
    this.container.width -= theme.button['border-x'];
    this.container.height -= theme.button['border-y'];

    var cutSprite = function(button) {
        var bmd = game.add.bitmapData(width, height);

        bmd.copyRect(button,new Phaser.Rectangle(0,0,theme.button['border-x'],theme.button['border-y'])); // Left corner
        bmd.copy(
            button,
            theme.button['border-x'] + 1,
            0,
            1,
            theme.button['border-y'],
            theme.button['border-x'],
            0,
            width - theme.button['border-x'] * 2,
            theme.button['border-y']
        ); // Top border

        bmd.copyRect(button,new Phaser.Rectangle(button.width - theme.button['border-x'],0,theme.button['border-x'],theme.button['border-y']), width - theme.button['border-x']); // Right corner

        bmd.copy(
            button,
            0,
            theme.button['border-y'] + 1,
            theme.button['border-x'],
            1,
            0,
            theme.button['border-y'],
            theme.button['border-x'],
            height - theme.button['border-y'] * 2
        ); // Left border

        bmd.copy(
            button,
            button.width - theme.button['border-x'],
            theme.button['border-y'] + 1,
            theme.button['border-x'],
            1,
            width - theme.button['border-x'],
            theme.button['border-y'],
            theme.button['border-x'],
            height - theme.button['border-y'] * 2
        ); // Right border

        bmd.copyRect(button,new Phaser.Rectangle(0,button.height - theme.button['border-y'],theme.button['border-x'],theme.button['border-y']), 0, height - theme.button['border-y']); // Left bottom corner
        bmd.copyRect(button,new Phaser.Rectangle(button.width - theme.button['border-x'],button.height - theme.button['border-y'],theme.button['border-x'],theme.button['border-y']), width - theme.button['border-x'], height - theme.button['border-y']); // Right bottom corner
        bmd.copy(
            button,
            theme.button['border-x'] + 1,
            button.height - theme.button['border-y'],
            1,
            theme.button['border-y'],
            theme.button['border-x'],
            height - theme.button['border-y'],
            width - theme.button['border-x'] * 2,
            theme.button['border-y']
        ); // Bottom border

        bmd.copy(
            button,
            theme.button['border-x'],
            theme.button['border-y'],
            1,
            1,
            theme.button['border-x'],
            theme.button['border-y'],
            width - theme.button['border-x'] * 2,
            height - theme.button['border-y'] * 2
        ); // Body
        return game.make.sprite(x, y, bmd);
    };
    this.spriteOff = cutSprite(game.make.sprite(0, 0, 'slick-ui-button_off'));
    this.spriteOn = cutSprite(game.make.sprite(0, 0, 'slick-ui-button_on'));

    this.sprite = game.make.button(x, y);
    this.sprite.setTexture(this.spriteOff.generateTexture());
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.sprite.fixedToCamera = true;

    this.sprite.events.onInputDown.add(function () {
        this.sprite.setTexture(this.spriteOn.generateTexture());
    }, this);

    this.sprite.events.onInputUp.add(function () {
        this.sprite.setTexture(this.spriteOff.generateTexture());
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
        var theme = game.cache.getJSON('slick-ui-theme');
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
        var theme = game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.button['border-y']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});