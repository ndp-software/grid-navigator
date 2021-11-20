// Copyright (c) Andrew J. Peterson. All Rights Reserved.
import {MoveOp, Stepper} from './stepper'

/**
 * Returns a function that accepts a direction `dir` and a current location,
 * and provides the next location, based on `dir`.
 * @param cellCount total number of items
 * @param columnCount the size of a row, if applicable. If not provided, then "up" and "down" revert to prev and next, respectively.
 * @param pageSize the vertical size of a "page" for the pageUp and down operations
 */
export function gridWalker({
  cellCount,
  columnCount,
  pageSize
}: {
  cellCount: number,
  columnCount: number,
  pageSize: number
}):
  (dir: MoveOp, current: number) => number {
  const walker = new Stepper(cellCount, columnCount, pageSize)
  return (dir: MoveOp, value: number): number => walker[dir](value)
}

