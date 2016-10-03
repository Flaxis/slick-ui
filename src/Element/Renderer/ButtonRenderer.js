SlickUI.namespace('Element.Renderer');

/**
 * Default button renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.ButtonRenderer = function(game) { this.game = game };

/**
 * Renders the states of the button and returns them as an array
 *
 * @returns Array (0: sprite for off state; 1: sprite for on state)
 */
SlickUI.Element.Renderer.ButtonRenderer.prototype.render = function(width, height) {
    var theme = this.game.cache.getJSON('slick-ui-theme');

    var context = this;
    var cutSprite = function(button) {
        var bmd = context.game.add.bitmapData(width, height);

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
        return context.game.make.sprite(0, 0, bmd);
    };
    var off = cutSprite(this.game.make.sprite(0, 0, 'slick-ui-button_off'));
    var on  = cutSprite(this.game.make.sprite(0, 0, 'slick-ui-button_on'));

    return [off,on];
};