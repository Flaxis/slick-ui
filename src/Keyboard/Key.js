SlickUI.Keyboard = SlickUI.Keyboard ? SlickUI.Keyboard : { };

/**
 * A key on the keyboard
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Keyboard.Key = function(x, y, width, height, font, fontSize, text) {
    this.group = game.add.group();
    this.font = font;
    this._x = x;
    this._y = y;
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
    var graphicsUp = game.make.graphics(0, 0);
    graphicsUp.beginFill(0xcfcfcf);
    graphicsUp.drawRoundedRect(0,0,this._width, this._height, 5);
    graphicsUp.beginFill(0xffffff);
    graphicsUp.drawRoundedRect(1,1,this._width - 2, this._height - 2, 5);

    var graphicsDown = game.make.graphics(0, 0);
    graphicsDown.beginFill(0x178ab8);
    graphicsDown.drawRoundedRect(0,0,this._width, this._height, 5);
    graphicsDown.beginFill(0x1fa7e1);
    graphicsDown.drawRoundedRect(1,1,this._width - 2, this._height - 2, 5);

    var keyUp = game.make.sprite(this._x, this._y, graphicsUp.generateTexture());
    var keyDown = game.make.sprite(this._x, this._y, graphicsDown.generateTexture());

    var base = game.make.sprite(this._x, this._y, keyUp.texture);
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

    var text = game.make.bitmapText(this._x, this._y, this.font, this.text, this.fontSize);
    text.x += this._width / 2 - text.width / 2;
    text.y += this._height / 2 - this.fontSize / 2 - 4;

    this.group.add(base);
    this.group.add(text);

    this.events = base.events;
};