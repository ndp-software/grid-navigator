// Copyright (c) Andrew J. Peterson. All Rights Reserved.
import { KeyToMoveOpMap, DEFAULT_STANDARD } from './key-maps'
import {
  indexOf,
  objectGridNavigator,
  ObjectGridNavigator
}                                                              from './object-grid-navigator'
import {
  MoveOp
}                                           from './stepper'
import {
  toString as event2String,
  setOptions as eventSetOptions
}                                           from 'keyboard-event-to-string'

eventSetOptions({hideKey: 'alphanumeric'})

type GridNavigatorInit<E extends Node> = {
  /**
   * Function that, when called, returns all the elements
   * in the grid. It may be as simple as
   * `() => document.getElementsByClassName(...)`
   *
   * If you know that the nodes have changed, you can use
   * `markStale` to force a call of this function.
   */
  elementsProvider: () => NodeListOf<E>

  /*
   selectCallback will be called two ways:
   - selectCallback(e, true) => select it now
   - selectCallback(e, false) => de-select it now
  */
  selectCallback: (e: E, selectNow: boolean) => void

  /**
   * Optional map from a keyboard code string (as produced by
   * [keyboard-event-to-string](https://github.com/ndp-software/keyboard-event-to-string))
   * to the operation. Operations are represented by `MoveOp` types.
   *
   * The default is a liberal mixture of keystrokes from different
   * environments, and should provide good behavior. If the client code
   * is handling specific keystrokes itself, you may want to pass in
   * specific mappings here.
   */
  keyMap?: KeyToMoveOpMap

  /**
   * Optional callback function to set the number of columns currently displayed.
   * The default will look at the position of the elements on the page and make a
   * good guess, assuming a regular grid.
   */
  columnCountCalculator: (elems: NodeListOf<E>) => number
}


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
 *  If your elements change, let your nav know:
 *  ```
 *  myNav.markStale()
 *  ```
 */
export class GridNavigator<E extends HTMLElement> {

  private elements: NodeListOf<E> | null
  private readonly elemsProviderFn: () => NodeListOf<E>
  private readonly selectCallback: (e: E, selectNow: boolean) => void
  private navigateToFn: ObjectGridNavigator<E> | null
  private readonly keyMap: KeyToMoveOpMap

  constructor ({
    elementsProvider,
    selectCallback,
    keyMap = DEFAULT_STANDARD,
    columnCountCalculator
  }: GridNavigatorInit<E>
  ) {
    this.elemsProviderFn = elementsProvider
    this.selectCallback  = selectCallback
    this.elements        = null
    this.navigateToFn    = null
    this.keyMap          = keyMap

    if (columnCountCalculator)
      this.columnCountEstimator = columnCountCalculator

    // TODO: figure out when this listener should be removed
    window.addEventListener('resize', () =>
      this.navigateToFn = null)
  }

  /**
   * Handle the keyboard navigation.
   * @param e the keydown event
   * @returns true if the keystroke was handled, false otherwise.
   */
  onKeyDown (e: KeyboardEvent): boolean {

    // Deal with empty grid (don't call selectCallback with null)
    if (this.elems().length < 1) return false

    // https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids
    const mappedOp = this.keyMap[event2String(e)]

    if (!mappedOp) return false

    e.preventDefault()
    e.stopPropagation()
    this.navigateTo(mappedOp)
    return true
  }

  navigateTo (dirOrNode?: MoveOp | E): E {
    if (this.navigateToFn === null) this.navigateToFn = this.buildNavigateTo()
    return this.navigateToFn(dirOrNode)
  }

  /**
   * Call when the the elements have changed.
   * This will force a recalculation of the elements
   * using the `elementsProvider`.
   */
  markStale (): void {
    this.elements     = null
    this.navigateToFn = null
  }

  private elems () {
    if (this.elements === null)
      this.elements = this.elemsProviderFn()
    return this.elements
  }

  private buildNavigateTo (): ObjectGridNavigator<E> {
    // Preserve the current (prev), if it's in the new `elems` list.
    const prev    = this.navigateToFn ? this.navigateToFn() : this.elems()[0]
    const current = indexOf(this.elems(), prev) !== -1 ? prev : this.elems()[0]

    return objectGridNavigator(
      this.elems(),
      this.columnCount(),
      3,
      ((newEl: E, prevEl: E | null) => {
        if (prevEl)
          this.selectCallback(prevEl, false)
        this.selectCallback(newEl, true)
      }),
      current)
  }

  private columnCount(): number {
    return this.columnCountEstimator(this.elems())
  }

  /**
   * Calculates the number of elements in a row based on the assumption
   * that all elements are the same size, and so elements in one
   * row start at the same horizontal offset as the previous row.
   *
   * There are certainly other strategies that will do this.
   */
  columnCountEstimator = (elems: NodeListOf<E>) =>  {
    if (elems.length < 4) return 1
    const x = Math.round(elems[0].offsetLeft)

    for (let i = 1; i < elems.length; i++)
      if (Math.round(elems[i].offsetLeft) == x) return i
    return 1
  }
}
