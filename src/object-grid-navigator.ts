// Copyright (c) Andrew J. Peterson. All Rights Reserved.
import { MoveOp, isMoveOp } from './stepper'
import { gridWalker } from './grid-walker'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Objectish {
}

// Trimmed down definition of an Array. No pop, push, etc.
// Compatible with NodeList<>
// kinda type Arrayish<T extends Objectish> = Array<T> | NodeList
type Arrayish<T> = {
  length: number
  [n: number]: T
}

// Function exported from this module. Navigate a list
// of objects that are layed out as a grid.
export type ObjectGridNavigator<O extends Objectish> =
  (dirOrNode?: MoveOp | O) => O

// My own version of `indexOf` for typescript and DOM NodeLists shortcomings.
export function indexOf<T>(
  a: Arrayish<T>,
  el: T | null,
  notFoundIndex = -1): number{
  for (let i = 0; i < a.length; i++)
    if (a[i] === el) return i
  return notFoundIndex
}

/**
 * Stateful function tracking a moveable selection within a grid.
 *
 * Given a list of objects, `objs`, a `columnCount` and `pageSize`,
 * returns a function that readily navigates around a grid based
 * on "commands" of type `MoveOp`.
 *
 * This function can be called in 3 ways:
 * - if given no parameters, returns the "current" object
 * - if given a `MoveOp`, navigates a grid
 * - if given an object in the list, navigates to that specific object
 *
 * @param objs a list of objects, such as DOM nodes.
 * @param columnCount width of the grid, eg. 3
 * @param pageSize size of a vertical page, measured in "objs"
 * @param onSelectCallback a callback function when the "current"
 *        selected object changes.
 * @param initialNode (optional) initial object. If not provided, the first
 *        object is initially selected.
 */
export function objectGridNavigator<O extends Objectish>(
  objs: Arrayish<O>,
  columnCount: number,
  pageSize: number,
  onSelectCallback: (node: O, prevNode: O | null) => void,
  initialNode: O | null = null
): ObjectGridNavigator<O>{

  /*
  This function is primarily responsible for:
  - mapping from the objects to the numeric indices that
    `gridWalker` understands, and back again.
  - maintaining the "current" selection, kept in `prevIndex`
   */

  let prevIndex = indexOf(objs, initialNode, 0)

  const walker = gridWalker({
    cellCount: objs.length, columnCount, pageSize
  })

  return (dirOrNode?: MoveOp | O) => {

    // Are we trying to move?
    if (dirOrNode !== undefined) {

      // Move the needle...
      const newIndex = isMoveOp(dirOrNode)
        ? walker(dirOrNode, prevIndex)
        : indexOf(objs, dirOrNode, -1)

      if (newIndex < 0)
        throw new Error(`Invalid dirOrNode (${JSON.stringify(dirOrNode)})`)

      // side effect:
      onSelectCallback(objs[newIndex], objs[prevIndex])

      prevIndex = newIndex
    }

    return objs[prevIndex]
  }
}




