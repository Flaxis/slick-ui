SlickUI.namespace('Keyboard');

/**
 * Textual input control in games
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Keyboard.Keyboard = function(plugin, font, fontSize, initialize) {
    this.group = plugin.game.add.group();
    this.keyGroupLower = plugin.game.make.group();
    this.keyGroupUpper = plugin.game.make.group();
    this.keyGroupCurrent = this.keyGroupLower;
    this.keyGroupUpper.visible = false;
    this.group.fixedToCamera = true;
    this.font = font;
    this.plugin = plugin;
    this.fontSize = fontSize;
    this.height = 160;
    this.events = {
        onKeyPress: new Phaser.Signal(),
        onOK: new Phaser.Signal()
    };

    if(typeof fontSize == 'undefined') {
        this.fontSize = 16;
    }

    if(false !== initialize) {
        this.create();
    }
};

/**
 * Creates the keyboard and all of its keys
 *
 * @returns SlickUI.Container.Container
 */
SlickUI.Keyboard.Keyboard.prototype.create = function() {
    var base = this.plugin.getRenderer('keyboard').render(this.height);
    this.group.add(base);
    this.group.add(this.keyGroupLower);
    this.group.add(this.keyGroupUpper);
    var keyboardWidth = 440;
    var offsetX = Math.round(this.plugin.game.width / 2 - keyboardWidth / 2);

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 16, 32, 32, this.font, this.fontSize, '1'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 16, 32, 32, this.font, this.fontSize, '2'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 16, 32, 32, this.font, this.fontSize, '3'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 16, 32, 32, this.font, this.fontSize, '4'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 16, 32, 32, this.font, this.fontSize, '5'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 16, 32, 32, this.font, this.fontSize, '6'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 16, 32, 32, this.font, this.fontSize, '7'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 16, 32, 32, this.font, this.fontSize, '8'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 16, 32, 32, this.font, this.fontSize, '9'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 16, 32, 32, this.font, this.fontSize, '0'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 360, 16, 64, 32, this.font, this.fontSize, 'DEL'), this.group);

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 52, 32, 32, this.font, this.fontSize, 'q'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 52, 32, 32, this.font, this.fontSize, 'w'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 52, 32, 32, this.font, this.fontSize, 'e'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 52, 32, 32, this.font, this.fontSize, 'r'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 52, 32, 32, this.font, this.fontSize, 't'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 52, 32, 32, this.font, this.fontSize, 'y'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 52, 32, 32, this.font, this.fontSize, 'u'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 52, 32, 32, this.font, this.fontSize, 'i'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 52, 32, 32, this.font, this.fontSize, 'o'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 52, 32, 32, this.font, this.fontSize, 'p'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 360, 52, 32, 32, this.font, this.fontSize, '!'), this.group);

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 88, 32, 32, this.font, this.fontSize, 'a'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 88, 32, 32, this.font, this.fontSize, 's'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 88, 32, 32, this.font, this.fontSize, 'd'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 88, 32, 32, this.font, this.fontSize, 'f'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 88, 32, 32, this.font, this.fontSize, 'g'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 88, 32, 32, this.font, this.fontSize, 'h'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 88, 32, 32, this.font, this.fontSize, 'j'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 88, 32, 32, this.font, this.fontSize, 'k'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 88, 32, 32, this.font, this.fontSize, 'l'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 88, 80, 32, this.font, this.fontSize, 'UPPER'));

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX - 40, 124, 36, 32, this.font, this.fontSize, 'OK'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 124, 32, 32, this.font, this.fontSize, 'z'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 124, 32, 32, this.font, this.fontSize, 'x'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 124, 32, 32, this.font, this.fontSize, 'c'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 124, 32, 32, this.font, this.fontSize, 'v'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 124, 32, 32, this.font, this.fontSize, 'b'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 124, 32, 32, this.font, this.fontSize, 'n'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 124, 32, 32, this.font, this.fontSize, 'm'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 124, 32, 32, this.font, this.fontSize, ','), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 124, 32, 32, this.font, this.fontSize, '.'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 124, 32, 32, this.font, this.fontSize, ' '), this.group);


    offsetX -= 32;

    this.keyGroupCurrent = this.keyGroupUpper;
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 52, 32, 32, this.font, this.fontSize, 'Q'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 52, 32, 32, this.font, this.fontSize, 'W'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 52, 32, 32, this.font, this.fontSize, 'E'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 52, 32, 32, this.font, this.fontSize, 'R'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 52, 32, 32, this.font, this.fontSize, 'T'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 52, 32, 32, this.font, this.fontSize, 'Y'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 52, 32, 32, this.font, this.fontSize, 'U'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 52, 32, 32, this.font, this.fontSize, 'I'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 52, 32, 32, this.font, this.fontSize, 'O'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 52, 32, 32, this.font, this.fontSize, 'P'));

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 88, 32, 32, this.font, this.fontSize, 'A'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 88, 32, 32, this.font, this.fontSize, 'S'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 88, 32, 32, this.font, this.fontSize, 'D'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 88, 32, 32, this.font, this.fontSize, 'F'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 88, 32, 32, this.font, this.fontSize, 'G'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 88, 32, 32, this.font, this.fontSize, 'H'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 88, 32, 32, this.font, this.fontSize, 'J'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 88, 32, 32, this.font, this.fontSize, 'K'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 88, 32, 32, this.font, this.fontSize, 'L'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 88, 80, 32, this.font, this.fontSize, 'lower'));

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 124, 32, 32, this.font, this.fontSize, 'Z'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 124, 32, 32, this.font, this.fontSize, 'X'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 124, 32, 32, this.font, this.fontSize, 'C'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 124, 32, 32, this.font, this.fontSize, 'V'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 124, 32, 32, this.font, this.fontSize, 'B'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 124, 32, 32, this.font, this.fontSize, 'N'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 124, 32, 32, this.font, this.fontSize, 'M'));
};

/**
 * Creates the keyboard and all of its keys
 *
 * @returns SlickUI.Container.Container
 */
SlickUI.Keyboard.Keyboard.prototype.addKey = function(key, group) {
    key.init();
    if(typeof group == 'undefined') {
        group = this.keyGroupCurrent;
    }
    group.add(key.group);

    key.events.onInputUp.add(function () {
        if(key.text == 'UPPER' || key.text == 'lower') {
            this.toggleMode();
            return;
        }
        if(key.text == 'OK') {
            this.events.onOK.dispatch();
            return;
        }
        this.events.onKeyPress.dispatch(key.text);
    }, this);
};

SlickUI.Keyboard.Keyboard.prototype.toggleMode = function() {
    this.keyGroupUpper.visible = !this.keyGroupUpper.visible;
    this.keyGroupLower.visible = !this.keyGroupLower.visible;
};