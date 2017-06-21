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
    if(parent) {
        this.root = parent.root;
        this.displayGroup = this.root.game.add.group();
        parent.displayGroup.add(this.displayGroup);
        this.x = parent.x;
        this.y = parent.y;
        this.width = parent.width;
        this.height = parent.height;
    }
    else {
        this.displayGroup = this.root.game.add.group();
        this.x = 0;
        this.y = 0;
        this.width = this.root.game.width;
        this.height = this.root.game.height;
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
    this.root.game.world.bringToTop(this.displayGroup);
    this.children.push(element);

    return element; // Allows chaining
};

/**
 * Removes an element from the container
 *
 * @param element
 * @returns SlickUI.Container.Container
 */
SlickUI.Container.Container.prototype.remove = function(element) {
    element.unsetContainer();

    var index = this.children.indexOf(element);
    if (index > -1) {
        this.children.splice(index, 1);
    }

    element.destroy();
};

/**
 * Removes the parent reference from the container
 */
SlickUI.Container.Container.prototype.removeParent = function() {

    if (this.parent) {
        this.parent.displayGroup.remove(this.displayGroup);
    } else {
        //Only remove if root is defined (has a parent?)
        if (this.root) {
            this.root.game.world.remove(this.displayGroup);
        }
    }

    this.root = undefined;
    this.parent = undefined;

};

/**
 * Destroys the container
 */
SlickUI.Container.Container.prototype.destroy = function() {

    this.removeParent();
    this.displayGroup.destroy();

};

