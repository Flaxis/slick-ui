var SlickUI = {};

/**
 * Construct the plugin
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param game
 * @param parent
 * @constructor
 */
Phaser.Plugin.SlickUI = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);
};

Phaser.Plugin.SlickUI.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.SlickUI.prototype.constructor = Phaser.Plugin.SamplePlugin;

/**
 * Call this method at the very bottom of your game's preloader method.
 *
 * @param theme
 */
Phaser.Plugin.SlickUI.prototype.load = function(theme) {
    this.container = new SlickUI.Container.Container(null);

    var themePath = theme.replace(/\/[^\/]+$/, '/');
    game.load.json('slick-ui-theme', theme);
    game.load.resetLocked = true;
    game.load.start();
    var isQueued = false;
    var queueAssets = function () {
        if(!game.cache.checkJSONKey('slick-ui-theme') || isQueued) {
            return;
        }
        var theme = game.cache.getJSON('slick-ui-theme');
        for(var k in theme.images) {
            game.load.image('slick-ui-' + k, themePath + theme.images[k]);
        }
        for(k in theme.fonts) {
            game.load.bitmapFont(k, themePath + theme.fonts[k][0], themePath + theme.fonts[k][1]);
        }
        isQueued = true;
        game.load.onFileComplete.remove(queueAssets);
    };
    game.load.onFileComplete.add(queueAssets, this);
};

/**
 * Short-hand method for ui.container.add
 *
 * @param element
 */
Phaser.Plugin.SlickUI.prototype.add = function (element) {
    return this.container.add(element);
};