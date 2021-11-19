"use strict";
exports.__esModule = true;
exports.GridNavigator = void 0;
// Copyright (c) Andrew J. Peterson. All Rights Reserved.
var key_maps_1 = require("./key-maps");
var object_grid_navigator_1 = require("./object-grid-navigator");
var keyboard_event_to_string_1 = require("keyboard-event-to-string");
(0, keyboard_event_to_string_1.setOptions)({ hideKey: 'alphanumeric' });
/**
 * Provides keyboard navigation for a responsive CSS grid component.
 *
 * To use,
 * ```
 *   myNav = new GridNavigator(
 *     elementsProvider: () => document.getElementsByTagName('li'),
 *     selectCallback:   (e, selectNow) => // show or hide the selection in the interface
 *   )
 * ```
 *  You will need to "wire up" they keyboard handling too:
 *  ```
 *  document.addEventHandler('keydown', (e) => if !(myNav.onKeyDown(e)) // do you normal stuff )
 *  ```
 *  If your elements change, let your nav know: `myNav.markStale()`
 */
var GridNavigator = /** @class */ (function () {
    function GridNavigator(_a) {
        var _this = this;
        var elementsProvider = _a.elementsProvider, selectCallback = _a.selectCallback, _b = _a.keyMap, keyMap = _b === void 0 ? key_maps_1.NAV_AND_ARROW_MAP : _b;
        this.elemsProviderFn = elementsProvider;
        this.selectCallback = selectCallback;
        this.elements = null;
        this.navigateToFn = null;
        this.keyMap = keyMap;
        // TODO: figure out when this listener should be removed
        window.addEventListener('resize', function () {
            return _this.navigateToFn = null;
        });
    }
    /**
     * Call when the the elements have changed.
     * This will force a recalculation of the elements
     * using the `elementsProvider`.
     */
    GridNavigator.prototype.markStale = function () {
        this.elements = null;
        this.navigateToFn = null;
    };
    /**
     * Handle the keyboard navigation.
     * @param e the keydown event
     * @returns true if the keystroke was handled, false otherwise.
     */
    GridNavigator.prototype.onKeyDown = function (e) {
        // Deal with empty grid (don't call selectCallback with null)
        if (this.elems().length < 1)
            return false;
        // https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids
        var mappedOp = this.keyMap[(0, keyboard_event_to_string_1.toString)(e)];
        if (!mappedOp)
            return false;
        e.preventDefault();
        e.stopPropagation();
        this.navigateTo(mappedOp);
        return true;
    };
    GridNavigator.prototype.navigateTo = function (dirOrNode) {
        if (this.navigateToFn === null)
            this.navigateToFn = this.buildNavigateTo();
        return this.navigateToFn(dirOrNode);
    };
    GridNavigator.prototype.elems = function () {
        if (this.elements === null)
            this.elements = this.elemsProviderFn();
        return this.elements;
    };
    GridNavigator.prototype.buildNavigateTo = function () {
        var _this = this;
        // Preserve the current (prev), if it's in the new `elems` list.
        var prev = this.navigateToFn ? this.navigateToFn() : this.elems()[0];
        var current = (0, object_grid_navigator_1.indexOf)(this.elems(), prev) !== -1 ? prev : this.elems()[0];
        return (0, object_grid_navigator_1.objectGridNavigator)(this.elems(), this.rowHt(), 3, (function (newEl, prevEl) {
            if (prevEl)
                _this.selectCallback(prevEl, false);
            _this.selectCallback(newEl, true);
        }), current); // as unknown as ObjectGridNavigator<E>
    };
    /**
     * Calculates the number of elements in a row based on the assumption
     * that all elements are the same size, and so elements in one
     * row start at the same horizontal offset as the previous row.
     *
     * There are certainly other strategies that will do this.
     * @private
     */
    GridNavigator.prototype.rowHt = function () {
        if (this.elems().length < 4)
            return 1;
        var posx = Math.round(this.elems()[0].offsetLeft);
        for (var i = 1; i < this.elems().length; i++)
            if (Math.round(this.elems()[i].offsetLeft) == posx)
                return i;
        return 1;
    };
    return GridNavigator;
}());
exports.GridNavigator = GridNavigator;
