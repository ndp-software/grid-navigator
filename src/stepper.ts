// Copyright (c) Andrew J. Peterson. All Rights Reserved.


import {NonUnderscored, PickKeyByType} from './base-types'

/**
 * An object of this class knows how to "step", or "move" to a different
 * location on a grid. The language should be pretty intuitive, but
 * check the code below if not.
 *
 * Create a grid with these parameters:
 * - size: number of elements
 * - rowLength: how long each row is, assumed to be full rows
 * - pageSize: number of rows to move in the page* operations
 *
 * It does NOT know the current location. You always provide that to
 * the given function. It just steps form a give place to another.
 */
export class Stepper {
  private readonly _lastIndex: number

  constructor(private readonly _size: number,
              private readonly _rowLength: number,
              private readonly _pageSize: number) {
    if (_rowLength <= 0) throw new Error('`rowLength` must be positive')
    if (_pageSize <= 0) throw new Error('`pageSize` must be positive')
    this._lastIndex = Math.max(0, _size - 1)
  }

  prev(i: number) { return (i - 1 + this._size) % this._size || 0}
  next(i: number) { return (i + 1) % this._size || 0}
  first() { return 0 }
  last() { return this._lastIndex }
  down(i: number) { return Math.min(this._lastIndex, i + this._rowLength) }
  up(i: number) { return Math.max(0, i - this._rowLength) }
  left(i: number) { return ((i % this._rowLength) > 0) ? (i - 1) : i }
  right(i: number) {
    return Math.min(
      this._lastIndex,
      ((i % this._rowLength) !== (this._rowLength - 1)) ? (i + 1) : i)
  }
  startOfLine(i: number) { return i - (i % this._rowLength) }
  endOfLine(i: number) {
    return Math.min(this._lastIndex, i - (i % this._rowLength) + this._rowLength - 1)
  }
  pageUp(i: number) { return Math.max(0, i - this._pageSize * this._rowLength) }
  pageDown(i: number) { return Math.min(this._lastIndex, i + this._pageSize * this._rowLength) }
}

// Properties that are functions returning numbers that don't start with underscore.
// type MoveOp = "prev" | "next" | "first" | "last" | "down" | "up" | "left" | "right" | "startOfLine" | "endOfLine" | "pageUp" | ...
export type MoveOp = NonUnderscored<PickKeyByType<Stepper, () => number>>

const MOVE_OPS: string[] = Object.getOwnPropertyNames(Stepper.prototype)
                                 .filter((p) => p[0] !== '_')
                                 .filter((p) => p !== 'constructor')

export function isMoveOp(d: unknown): d is MoveOp {
  return MOVE_OPS.indexOf(d as string) !== -1
}

