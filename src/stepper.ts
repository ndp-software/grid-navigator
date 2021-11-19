// Copyright (c) Andrew J. Peterson. All Rights Reserved.

type PickByType<T, U> = keyof { [P in keyof T]: T[P] extends U ? P : never };

// Pull out all properties that are functions returning numbers
// type MoveOp = 'prev' | 'next' | 'first' | 'last' | 'up' | 'down' | 'left' ...
export type MoveOp = PickByType<Stepper, () => number>


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
export class Stepper {
  private readonly _lastIndex: number

  // GRRR... make sure any properties here are reflected in `NonMoveOpProps`

  constructor (private readonly _size: number,
               private readonly _rowLength: number,
               private readonly _pageSize: number) {
    if (_rowLength <= 0) throw '`rowLength` must be positive'
    if (_pageSize <= 0) throw '`pageSize` must be positive'
    this._lastIndex = Math.max(0, _size - 1)
  }

  prev  = (i: number) => (i - 1 + this._size) % this._size || 0
  next  = (i: number) => (i + 1) % this._size || 0
  first = () => 0
  last  = () => this._lastIndex

  down = (i: number) => Math.min(this._lastIndex, i + this._rowLength)
  up   = (i: number) => Math.max(0, i - this._rowLength)

  left  = (i: number) => ((i % this._rowLength) > 0) ? (i - 1) : i
  right = (i: number) => Math.min(this._lastIndex, ((i % this._rowLength) !== (this._rowLength - 1)) ? (i + 1) : i)

  startOfLine = (i: number) => i - (i % this._rowLength)
  endOfLine   = (i: number) => Math.min(this._lastIndex, i - (i % this._rowLength) + this._rowLength - 1)

  pageUp   = (i: number) => Math.max(0, i - this._pageSize * this._rowLength)
  pageDown = (i: number) => Math.min(this._lastIndex, i + this._pageSize * this._rowLength)
}

function propsOfObject (obj: any): string[] {
  return Object.keys(obj)
               .filter((p) => p[0] !== '_')
}

const MOVE_OPS: string[] = propsOfObject(new Stepper(1, 1, 1))

export function isMoveOp (d: any): d is MoveOp {
  return MOVE_OPS.indexOf(d) !== -1
}

