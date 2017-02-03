SlickUI.namespace('Keyboard');

/**
 * A key on the keyboard
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Keyboard.Key = function(plugin, x, y, width, height, font, fontSize, text) {
    this.group = plugin.game.add.group();
    this.font = font;
    this._x = x;
    this._y = y;
    this.plugin = plugin;
    this._width = width;
    this._height = height;
    this.fontSize = fontSize;
    this.text = text;
};

/**
 * Creates the keyboard and all of its keys
 *
 * @returns SlickUI.Container.Container
 */
SlickUI.Keyboard.Key.prototype.init = function() {
    var sprites = this.plugin.getRenderer('key').render(this._width, this._height);

    var keyUp = sprites[0];
    var keyDown = sprites[1];

    var base = this.plugin.game.make.sprite(this._x, this._y, keyUp.texture);
    var hover = false;
    base.inputEnabled = true;
    base.input.useHandCursor = true;
    base.events.onInputDown.add(function () {
        base.loadTexture(keyDown.texture);
    });
    base.events.onInputUp.add(function () {
        base.loadTexture(keyUp.texture);
        if(!hover) {
            base.events.onInputUp.halt();
        }
    });
    base.events.onInputOver.add(function() {hover = true}, this);
    base.events.onInputOut.add(function() {hover = false}, this);

    var text = this.plugin.game.make.bitmapText(this._x, this._y, this.font, this.text, this.fontSize);
    text.x += this._width / 2 - text.width / 2;
    text.y += this._height / 2 - this.fontSize / 2 - 4;

    this.group.add(base);
    this.group.add(text);

    this.events = base.events;
};