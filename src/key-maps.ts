// Copyright (c) Andrew J. Peterson. All Rights Reserved.
import { MoveOp } from './stepper'

export type KeyToMoveOpMap = { [k: string]: MoveOp }


// https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids
export const NAV_AND_ARROW_MAP: KeyToMoveOpMap = {
  'ArrowLeft':   'prev',
  'ArrowRight':  'next',
  'ArrowUp':     'up',
  'ArrowDown':   'down',
  'PageDown':    'pageDown',
  'PageUp':      'pageUp',
  'Home':        'startOfLine',
  'End':         'endOfLine',
  'Ctrl + Home': 'first',
  'Ctrl + End':  'last'
}

// Confirmed here: https://github.com/getgauge/taiko/blob/master/lib/data/USKeyboardLayout.js
export const NUMPAD_MAP: KeyToMoveOpMap = {
  'Numpad1':        'endOfLine',
  'Numpad2':        'down',
  'Numpad3':        'pageDown',
  'Numpad4':        'left',
  'Numpad6':        'right',
  'Numpad7':        'startOfLine',
  'Numpad8':        'up',
  'Numpad9':        'pageUp',
  'Ctrl + Numpad7': 'first',
  'Ctrl + Numpad1': 'last'
}

export const VI_MAP: KeyToMoveOpMap = {
  'Comma':          'first',// M-<
  'Digit4':         'last', // M-$
  'H':              'left',
  'J':              'down',
  'K':              'up',
  'Key$':           'endOfLine',
  'L':              'right',
  'O':              'startOfLine',
  'Shift + Comma':  'first',// M-<
  'Shift + Digit4': 'endOfLine',
  'Shift + Digit6': 'startOfLine',
  'Shift + G':      'last',
  'Shift + H':      'first',
  'Shift + L':      'last',
  'Ctrl + B':       'pageUp',
  'Ctrl + F':       'pageDown'
}

export const EMACS_MAP: KeyToMoveOpMap = {
  'A':        'startOfLine',
  'B':        'prev',
  'E':        'endOfLine',
  'F':        'next',
  'N':        'down',
  'P':        'up',
  'Ctrl + A': 'startOfLine',
  'Ctrl + B': 'prev',
  'Ctrl + E': 'endOfLine',
  'Ctrl + F': 'next',
  'Ctrl + N': 'down',
  'Ctrl + P': 'up'
}

export const CONSOLIDATED_MAP: KeyToMoveOpMap = {
  ...EMACS_MAP,
  ...VI_MAP,
  ...NUMPAD_MAP,
  ...NAV_AND_ARROW_MAP
}

