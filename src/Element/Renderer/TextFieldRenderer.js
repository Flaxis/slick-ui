SlickUI.namespace('Element.Renderer');

/**
 * Default textField renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.TextFieldRenderer = function(game) { this.game = game };

/**
 * Renders the textField and returns it as a sprite
 *
 * @returns Phaser.Sprite
 */
SlickUI.Element.Renderer.TextFieldRenderer.prototype.render = function(width, height) {
    var theme = this.game.cache.getJSON('slick-ui-theme');
    var bmd = this.game.add.bitmapData(width, height);
    var textField = this.game.make.sprite(0, 0, 'slick-ui-text_field');

    bmd.copyRect(textField,new Phaser.Rectangle(0,0,theme.text_field['border-x'],theme.text_field['border-y'])); // Left corner
    bmd.copy(
        textField,
        theme.text_field['border-x'] + 1,
        0,
        1,
        theme.text_field['border-y'],
        theme.text_field['border-x'],
        0,
        width - theme.text_field['border-x'] * 2,
        theme.text_field['border-y']
    ); // Top border

    bmd.copyRect(textField,new Phaser.Rectangle(textField.width - theme.text_field['border-x'],0,theme.text_field['border-x'],theme.text_field['border-y']), width - theme.text_field['border-x']); // Right corner

    bmd.copy(
        textField,
        0,
        theme.text_field['border-y'] + 1,
        theme.text_field['border-x'],
        1,
        0,
        theme.text_field['border-y'],
        theme.text_field['border-x'],
        height - theme.text_field['border-y'] * 2
    ); // Left border

    bmd.copy(
        textField,
        textField.width - theme.text_field['border-x'],
        theme.text_field['border-y'] + 1,
        theme.text_field['border-x'],
        1,
        width - theme.text_field['border-x'],
        theme.text_field['border-y'],
        theme.text_field['border-x'],
        height - theme.text_field['border-y'] * 2
    ); // Right border

    bmd.copyRect(textField,new Phaser.Rectangle(0,textField.height - theme.text_field['border-y'],theme.text_field['border-x'],theme.text_field['border-y']), 0, height - theme.text_field['border-y']); // Left bottom corner
    bmd.copyRect(textField,new Phaser.Rectangle(textField.width - theme.text_field['border-x'],textField.height - theme.text_field['border-y'],theme.text_field['border-x'],theme.text_field['border-y']), width - theme.text_field['border-x'], height - theme.text_field['border-y']); // Right bottom corner
    bmd.copy(
        textField,
        theme.text_field['border-x'] + 1,
        textField.height - theme.text_field['border-y'],
        1,
        theme.text_field['border-y'],
        theme.text_field['border-x'],
        height - theme.text_field['border-y'],
        width - theme.text_field['border-x'] * 2,
        theme.text_field['border-y']
    ); // Bottom border

    bmd.copy(
        textField,
        theme.text_field['border-x'],
        theme.text_field['border-y'],
        1,
        1,
        theme.text_field['border-x'],
        theme.text_field['border-y'],
        width - theme.text_field['border-x'] * 2,
        height - theme.text_field['border-y'] * 2
    ); // Body
    return this.game.make.sprite(0, 0, bmd);
};