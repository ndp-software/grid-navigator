"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.CONSOLIDATED_MAP = exports.EMACS_MAP = exports.VI_MAP = exports.NUMPAD_MAP = exports.NAV_AND_ARROW_MAP = void 0;
// https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids
exports.NAV_AND_ARROW_MAP = {
    'ArrowLeft': 'prev',
    'ArrowRight': 'next',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'PageDown': 'pageDown',
    'PageUp': 'pageUp',
    'Home': 'startOfLine',
    'End': 'endOfLine',
    'Ctrl + Home': 'first',
    'Ctrl + End': 'last'
};
// Confirmed here: https://github.com/getgauge/taiko/blob/master/lib/data/USKeyboardLayout.js
exports.NUMPAD_MAP = {
    'Numpad1': 'endOfLine',
    'Numpad2': 'down',
    'Numpad3': 'pageDown',
    'Numpad4': 'left',
    'Numpad6': 'right',
    'Numpad7': 'startOfLine',
    'Numpad8': 'up',
    'Numpad9': 'pageUp',
    'Ctrl + Numpad7': 'first',
    'Ctrl + Numpad1': 'last'
};
exports.VI_MAP = {
    'Comma': 'first',
    'Digit4': 'last',
    'H': 'left',
    'J': 'down',
    'K': 'up',
    'Key$': 'endOfLine',
    'L': 'right',
    'O': 'startOfLine',
    'Shift + Comma': 'first',
    'Shift + Digit4': 'endOfLine',
    'Shift + Digit6': 'startOfLine',
    'Shift + G': 'last',
    'Shift + H': 'first',
    'Shift + L': 'last',
    'Ctrl + B': 'pageUp',
    'Ctrl + F': 'pageDown'
};
exports.EMACS_MAP = {
    'A': 'startOfLine',
    'B': 'prev',
    'E': 'endOfLine',
    'F': 'next',
    'N': 'down',
    'P': 'up',
    'Ctrl + A': 'startOfLine',
    'Ctrl + B': 'prev',
    'Ctrl + E': 'endOfLine',
    'Ctrl + F': 'next',
    'Ctrl + N': 'down',
    'Ctrl + P': 'up'
};
exports.CONSOLIDATED_MAP = __assign(__assign(__assign(__assign({}, exports.EMACS_MAP), exports.VI_MAP), exports.NUMPAD_MAP), exports.NAV_AND_ARROW_MAP);
