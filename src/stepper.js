"use strict";
// Copyright (c) Andrew J. Peterson. All Rights Reserved.
exports.__esModule = true;
exports.isMoveOp = exports.Stepper = void 0;
/**
 * This class knows how to "step", or "move" to a different
 * location on a grid. The language should be pretty intuitive,
 * (it makes sense to me!).
 *
 * It knows how big the grid is:
 * - size: number of elements
 * - rowLength: how long each row is, assumed to be full rows
 * - pageSize: number of rows to move in the page* operations
 *
 * It does NOT know the current location. You always provide that to
 * the given function. It just steps form a give place to another.
 */
var Stepper = /** @class */ (function () {
    // GRRR... make sure any properties here are reflected in `NonMoveOpProps`
    function Stepper(_size, _rowLength, _pageSize) {
        var _this = this;
        this._size = _size;
        this._rowLength = _rowLength;
        this._pageSize = _pageSize;
        this.prev = function (i) { return (i - 1 + _this._size) % _this._size || 0; };
        this.next = function (i) { return (i + 1) % _this._size || 0; };
        this.first = function () { return 0; };
        this.last = function () { return _this._lastIndex; };
        this.down = function (i) { return Math.min(_this._lastIndex, i + _this._rowLength); };
        this.up = function (i) { return Math.max(0, i - _this._rowLength); };
        this.left = function (i) { return ((i % _this._rowLength) > 0) ? (i - 1) : i; };
        this.right = function (i) { return Math.min(_this._lastIndex, ((i % _this._rowLength) !== (_this._rowLength - 1)) ? (i + 1) : i); };
        this.startOfLine = function (i) { return i - (i % _this._rowLength); };
        this.endOfLine = function (i) { return Math.min(_this._lastIndex, i - (i % _this._rowLength) + _this._rowLength - 1); };
        this.pageUp = function (i) { return Math.max(0, i - _this._pageSize * _this._rowLength); };
        this.pageDown = function (i) { return Math.min(_this._lastIndex, i + _this._pageSize * _this._rowLength); };
        if (_rowLength <= 0)
            throw '`rowLength` must be positive';
        if (_pageSize <= 0)
            throw '`pageSize` must be positive';
        this._lastIndex = Math.max(0, _size - 1);
    }
    return Stepper;
}());
exports.Stepper = Stepper;
function propsOfObject(obj) {
    return Object.keys(obj)
        .filter(function (p) { return p[0] !== '_'; });
}
var MOVE_OPS = propsOfObject(new Stepper(1, 1, 1));
function isMoveOp(d) {
    return MOVE_OPS.indexOf(d) !== -1;
}
exports.isMoveOp = isMoveOp;
