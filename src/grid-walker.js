"use strict";
exports.__esModule = true;
exports.gridWalker = void 0;
// Copyright (c) Andrew J. Peterson. All Rights Reserved.
var stepper_1 = require("./stepper");
/**
 * Returns a function that accepts a direction `dir` and a current location,
 * and provides the next location, based on `dir`.
 * @param cellCount total number of items
 * @param columnCount the size of a row, if applicable. If not provided, then "up" and "down" revert to prev and next, respectively.
 * @param pageSize the vertical size of a "page" for the pageUp and down operations
 */
function gridWalker(_a) {
    var cellCount = _a.cellCount, columnCount = _a.columnCount, pageSize = _a.pageSize;
    var walker = new stepper_1.Stepper(cellCount, columnCount, pageSize);
    return function (dir, value) { return walker[dir](value); };
}
exports.gridWalker = gridWalker;
