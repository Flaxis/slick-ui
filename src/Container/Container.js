SlickUI.namespace('Container');

/**
 * UI elements can be layered; for instance, you can layer a
 * button on top of a panel and layer that with some text to create complex
 * user interfaces using simple elements. This is done by creating tree-like
 * structures using Container objects. Every layerable object adds their own
 * Container to allow adding elements only to the container the parent
 * is located in.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param parent
 * @constructor
 */
SlickUI.Container.Container = function(parent) {
    this.root = null;
    if(!(parent instanceof SlickUI.Container.Container)) {
        this.root = parent;
        parent = null;
    }
    this.parent = parent;
    this.children = [];
    this.displayGroup = game.add.group();
    if(parent) {
        this.root = parent.root;
        parent.displayGroup.add(this.displayGroup);
        this.x = parent.x;
        this.y = parent.y;
        this.width = parent.width;
        this.height = parent.height;
    }
    else {
        this.x = 0;
        this.y = 0;
        this.width = game.width;
        this.height = game.height;
    }
};

/**
 * Add an element to the container
 *
 * @param element
 * @returns SlickUI.Container.Container
 */
SlickUI.Container.Container.prototype.add = function(element) {
    element.setContainer(this);
    if(typeof element.init == 'function') {
        element.init();
    }
    game.world.bringToTop(this.displayGroup);
    this.children.push(element);

    return element; // Allows chaining
};