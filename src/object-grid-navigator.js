"use strict";
exports.__esModule = true;
exports.objectGridNavigator = exports.indexOf = void 0;
// Copyright (c) Andrew J. Peterson. All Rights Reserved.
var stepper_1 = require("./stepper");
var grid_walker_1 = require("./grid-walker");
// My own version of `indexOf` for typescript and DOM NodeLists shortcomings.
function indexOf(a, el, notFoundIndex) {
    if (notFoundIndex === void 0) { notFoundIndex = -1; }
    for (var i = 0; i < a.length; i++)
        if (a[i] === el)
            return i;
    return notFoundIndex;
}
exports.indexOf = indexOf;
/**
 * Given a list of objects, `objs`, a `columnCount` and `pageSize`,
 * returns a function that readily navigates around a grid based
 * on "commands" of type `MoveOp`.
 *
 * This function can be called in 3 ways:
 * - if given no parameters, returns the "current" object
 * - if given a `MoveOp`, navigates a grid
 * - if given an object in the list, navigates to the specific object
 *
 * @param objs a list of objects, such as DOM nodes.
 * @param columnCount width of the grid, eg. 3
 * @param pageSize size of a vertical page, measured in "objs"
 * @param onSelectCallback a callback function when the "current"
 *        selected object changes.
 * @param initialNode (optional) initial object. If not provided, the first
 *        object is initially selected.
 */
function objectGridNavigator(objs, columnCount, pageSize, onSelectCallback, initialNode) {
    if (initialNode === void 0) { initialNode = null; }
    var prevIndex = indexOf(objs, initialNode, 0);
    var walker = (0, grid_walker_1.gridWalker)({
        cellCount: objs.length,
        columnCount: columnCount,
        pageSize: pageSize
    });
    return function (dirOrNode) {
        // Return where we are now?
        if (dirOrNode == undefined)
            return objs[prevIndex];
        // Move the needle...
        var index = (0, stepper_1.isMoveOp)(dirOrNode)
            ? walker(dirOrNode, prevIndex)
            : indexOf(objs, dirOrNode, -1);
        if (index < 0)
            throw "Invalid dirOrNode (".concat(JSON.stringify(dirOrNode), ")");
        onSelectCallback(objs[index], objs[prevIndex]);
        prevIndex = index;
        return objs[prevIndex];
    };
}
exports.objectGridNavigator = objectGridNavigator;
