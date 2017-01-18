[![Gitter](https://badges.gitter.im/slick-ui/Lobby.svg)](https://gitter.im/slick-ui/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Released as public domain - feel free to do anything to the library code you like. (this excludes the assets and the Phaser game engine)

# SlickUI
![SlickUI](http://slick-ui.com/img/portfolio/thumbnails/1.jpg)

SlickUI beats the challenge of creating user interfaces easily in an object oriented way.

### Try out some previews
* [Sliding menu](http://slick-ui.com/preview/menu.html)
* [Slider controller](http://slick-ui.com/preview/slider.html)
* [Text input field](http://slick-ui.com/preview/text-field.html)

### Getting started
Install using git:
```sh
git clone https://github.com/Flaxis/slick-ui.git
```
Install using bower:
```sh
bower install slick-ui
```

Make sure you have the [Default Kenney theme] in your project assets and ready to load.

Add the following to the bottom of your preload function:
```javascript
// You can use your own methods of making the plugin publicly available. Setting it as a global variable is the easiest solution.
slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
slickUI.load('assets/ui/kenney/kenney.json'); // Use the path to your kenney.json. This is the file that defines your theme.
```

That's it! You're ready to start UI-ing!

### Usage

To start using the UI manager, find a nice spot in your create() function and get started:

#### Adding a panel
**Assuming you're using the variable slickUI for the plugin object**

```javascript
var panel;
slickUI.add(panel = new SlickUI.Element.Panel(8, 8, 150, game.height - 16));
```
This tells the UI manager to add a new panel at X and Y = 8, width of 150 pixels and as high as the game minus 16 pixels.

We can now use the panel's container to add new elements to it.

#### Adding a button
Let's say we wanted to add a button to the panel we just created:
```javascript
var button;
panel.add(button = new SlickUI.Element.Button(0,0, 140, 80));
button.events.onInputUp.add(function () {console.log('Clicked button');});
button.add(new SlickUI.Element.Text(0,0, "My button")).center();
```
We now added a button to the panel with the label 'My button'. When we click on it, the console will output 'Clicked Button'.

So what if we wanted to use SlickUI to be a bit more generic? We can also add DisplayObjects to the user interface in the same way.

#### Adding a DisplayObject
We'll assume we have a sprite cached as 'menu-button'
```javascript
var menuButton;
slickUI.add(menuButton = new SlickUI.Element.DisplayObject(8, 8, game.make.sprite(0, 0, 'menu-button')));
```
That's it! You might be thinking, why would you add a DisplayObject using the UI manager if we can do that just by using phaser's built in tools?

The answer is, because UI elements are cascading and they take care of that themselves by using containers. When adding a Panel, Button or DisplayObject, the UI manager puts it in a container and adds a Phaser group to keep the descending elements organized so you can manipulate entire containers.

#### Adding a Checkbox
Checkboxes can be added using 3 sprites: checkbox, radio and cross. This is how you add a checkbox:
```javascript
var cb;
panel.add(cb = new SlickUI.Element.Checkbox(0,10, SlickUI.Element.Checkbox.TYPE_RADIO));
cb.events.onInputDown.add(function () {
    console.log(cb.checked ? 'Checked' : 'Unchecked');
}, this);
```
If you don't provide a type using the last parameter, the default type will be used. You can choose between the following types:
* SlickUI.Element.Checkbox.TYPE_CHECKBOX (default type, no need to specify)
* SlickUI.Element.Checkbox.TYPE_RADIO
* SlickUI.Element.Checkbox.TYPE_CROSS

#### Adding a Slider
Sliders are used to give the illusion of analog control over an object's property. For example, the game's music volume.
```javascript
var slider;
panel.add(slider = new SlickUI.Element.Slider(16,100, panel.width - 32));
/*
 * To create a slider rendered vertically:
 * new SlickUI.Element.Slider(game.width - 64,130, game.height - 178, 0.5, true); <- The last parameter indicates we want a vertical slider.
 */
slider.onDrag.add(function (value) {
    // This will log the slider's value on a scale of 100 every time the user moves the drag handle
    console.log(Math.round(value * 100) + '%');
});
slider.onDragStart.add(function (value) {
    // This will be logged when the user clicks on the drag handle
    console.log('Start dragging at ' + Math.round(value * 100) + '%');
});
slider.onDragStop.add(function (value) {
    // This will be logged when the user releases the drag handle
    console.log('Stop dragging at ' + Math.round(value * 100) + '%');
});
```

#### Adding a text input field
Text input fields are very useful for asking the name of the player. They use canvas embedded virtual keyboards.
```javascript
// The last argument is used to determine the maximum amount of characters the input field can have. Defaults to 7 if kept empty.
var textField = panel.add(new SlickUI.Element.TextField(10,58, panel.width - 20, 40, 7));
textField.events.onOK.add(function () {
    alert('Your name is: ' + textField.value);
});
textField.events.onToggle.add(function (open) {
    console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
});
textField.events.onKeyPress.add(function(key) {
    console.log('You pressed: ' + key);
});
```
As you can see, there are three events you can listen to: onOK, onToggle and onKeyPress
* onOK gets dispatched when the user clicks the 'OK' key to confirm their input
* onToggle gets dispatched when the virtual keyboard opens or closes. A boolean parameter is provided telling whether the keyboard is opened (true) or closed (false)
* onKeyPress gets dispatched whenever the user enters a key in the virtual keyboard. Note that the DEL key gets spelled out entirely in when accessing the key in the first parameter.

[Default Kenney theme]: <http://slick-ui.com/kenney-theme.zip>
