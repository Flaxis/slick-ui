var SlickUI = {};

SlickUI.namespace = function(namespace) {
    var parts = namespace.split('.');
    var context = SlickUI;
    for(var i in parts) {
        var part = parts[i];
        context = context[part] = context[part] ? context[part] : {};
    }
    return SlickUI[namespace];
};

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

    this.defaultRenderer = {
        "button": "SlickUI.Element.Renderer.ButtonRenderer",
        "checkbox": "SlickUI.Element.Renderer.CheckboxRenderer",
        "panel": "SlickUI.Element.Renderer.PanelRenderer",
        "slider": "SlickUI.Element.Renderer.SliderRenderer",
        "text_field": "SlickUI.Element.Renderer.TextFieldRenderer",
        "keyboard": "SlickUI.Element.Renderer.KeyboardRenderer",
        "key": "SlickUI.Element.Renderer.KeyRenderer"
    };

    this.renderer = {};
};

Phaser.Plugin.SlickUI.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.SlickUI.prototype.constructor = Phaser.Plugin.SamplePlugin;

/**
 * Call this method at the very bottom of your game's preloader method.
 *
 * @param theme
 */
Phaser.Plugin.SlickUI.prototype.load = function(theme) {
    this.container = new SlickUI.Container.Container(this);

    var themePath = theme.replace(/\/[^\/]+$/, '/');
    this.game.load.json('slick-ui-theme', theme);
    this.game.load.resetLocked = true;
    this.game.load.start();
    var isQueued = false;
    var queueAssets = function () {
        if(!this.game.cache.checkJSONKey('slick-ui-theme') || isQueued) {
            return;
        }
        var theme = this.game.cache.getJSON('slick-ui-theme');
        for(var k in theme.images) {
            this.game.load.image('slick-ui-' + k, themePath + theme.images[k]);
        }
        for(k in theme.fonts) {
            this.game.load.bitmapFont(k, themePath + theme.fonts[k][0], themePath + theme.fonts[k][1]);
        }
        isQueued = true;
        this.game.load.onFileComplete.remove(queueAssets);
    };
    this.game.load.onFileComplete.add(queueAssets, this);
};

/**
 * Short-hand method for ui.container.add
 *
 * @param element
 */
Phaser.Plugin.SlickUI.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Get or create a renderer
 *
 * @param name
 */
Phaser.Plugin.SlickUI.prototype.getRenderer = function (name) {
    if(typeof this.renderer[name] != 'undefined') {
        return this.renderer[name];
    }
    var theme = this.game.cache.getJSON('slick-ui-theme');
    var resolveObject = function(name) {
        var namespace = name.split('.');
        var context = window;
        for(var i in namespace) {
            context = context[namespace[i]];
        }
        return context;
    };

    if(typeof theme.renderer == 'undefined' || typeof theme.renderer[name] == 'undefined') {
        if(typeof this.defaultRenderer[name] == 'undefined') {
            throw new Error('Trying to access undefined renderer \'' + name + '\'.');
        }
        return this.renderer[name] = new (resolveObject(this.defaultRenderer[name]))(this.game);
    }
    return this.renderer[name] = new (resolveObject(theme.renderer[name]))(this.game);
};