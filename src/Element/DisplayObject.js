SlickUI.Element = SlickUI.Element ? SlickUI.Element : { };

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
    this.x = x;
    this.y = y;
    this.displayObject = displayObject;
    this.container = null;
    this.width = width;
    this.height = height;

    if(typeof width == 'undefined') {
        this.width = game.width;
    }
    if(typeof height == 'undefined') {
        this.height = game.height;
    }
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.DisplayObject.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);
};

/**
 * Initializer
 */
SlickUI.Element.DisplayObject.prototype.init = function() {
    var x = this.container.x = this.container.parent.x + this.x;
    var y = this.container.y = this.container.parent.y + this.y;
    this.container.width = Math.min(this.container.parent.width - this.x, this.width);
    this.container.height = Math.min(this.container.parent.height - this.y, this.height);

    if(!this.displayObject instanceof Phaser.Sprite) {
        this.sprite = game.make.sprite(x, y, this.displayObject);
    }
    else {
        this.sprite = this.displayObject;
    }
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.fixedToCamera = true;
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