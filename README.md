# Grid Navigator

A no-fuss accessible keyboard navigation handling for a flexible grid component. This is _not_ a spreadsheet-like grid or table,
but provides keyboard navigation appropriate for one. If you have a grid (as in a CSS grid) that the user will want to
navigate between items, this provides a simple way to provide keyboard navigation following W3C recommendations.

- Provides "standard" W3C keyboard navigation
- Simple integration with any App, including React; it requires a single delegation of keydown events.
- Responsive. Handles row size changes automatically
- Dynamic. Handles dynamic lists of elements efficiently
- Rigorously tested
- Customizable

For our users' sake, it's convenient and recommended for *data grids* to have keyboard navigation. The
W3 [recommends certain behaviors](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids), but
these aren't built in to HTML-- nor are they easily obtainable. You have to write Javascript and `switch` statements.
Once you start writing this, you realize the code gets complicated-- or at least tedious. With any sort of responsive
layout, moving the the "next row" is a dynamic calculation, not just an addition, as is finding the first or last
element of the row.

This package handles all that with a simple TypeScript package.

## Demo

A proper demo will come, but in the meantime, see [https://amp-what.com](https://amp-what.com)

## Steps to integrate

[![Node.js CI](https://github.com/ndp-software/grid-navigator/actions/workflows/node.js.yml/badge.svg)](https://github.com/ndp-software/grid-navigator/actions/workflows/node.js.yml)

If you have a grid of elements, images or tiles, and you'd like to add keyboard navigation, the process is just a few
steps:

#### 1. Include the package in your project, eg.

   ```shell
   npm add --save grid-navigator
   ```

(Yarn and Typescript also work.)

#### 2. Create an "elements provider".

Your code must provide a function to tell the navigation grid which elements the user is navigating. This is specified
as a function (rather than a static list of elements) so that it can be dynamic-- although if it never changes, there's
no performance penalty. Here is a simple example function:

  ```typescript
  const elementsProvider = () => document.getElementsByTagName('li')
  ```

This will be called lazily as it is needed.

#### 3. Create a "select callback".

This is a function that shows the user the "selected" or "focused"  element. W3C recommends using `tabIndex`
values of '-1' and '0' to keep track of this, but it's up to you. This callback function receives two arguments: the element, and a boolean about
whether it's being selected or not. As the user moves from one element to the next, this will function will be called
twice-- once for leaving the old element, and once for entering the new one:

```typescript
const selectCallback = (e, selectNow) => {
  if (selectNow)
    e.tabindex = 0
  else
    e.tabindex = -1
}
```

This may also need some accompanying CSS, such as:

```css
[role="grid"] [tabindex="0"]:focus {
  outline: #005a9c;
  outline-style: dotted;
  outline-width: 3px;
}
 ```

#### 4. Create a navigator:

```typescript
import { GridNavigator } from 'grid-navigator'

const myNav = new GridNavigator({ elementProvider, selectCallback })
```

#### 5. Call the handler

From the keydown handler of your grid container, you need to add a keydown handler:

```typescript

const grid = document.getElementById('grid')

grid.addEventHandler('keydown', (e) => {
  if (myNav.onKeyDown(e)) return

  // do you normal stuff
...
})
```

This keydown handler will look for applicable keys, and if present, call the `selectCallback` appropriately. It
returns `true` if it handles the keyboard event, and `false` otherwise.

#### 6. Handle dynamic lists (Optional)

The code uses the `elementProvider` you give it to calculate the elements that are being navigated. Once they are
calculated, it assumes they are stable unless you tell it otherwise. To tell it, if the elements change, simply
call `myNav.markStale()`, and `elementProvider` will be called again when needed.

### React Component

Here's a sketch of a hook:

```typescript
const useGridNavigator = (gridRef, selectCallback) => {
  const [gridNav, setGridNav] = useState()
  useEffect(() => {
    if (gridRef.current) {
      const elementProvider = () => gridRef.current.getElementsByTagName('li')
      setGridNav(new GridNavigator({ elementProvider, selectCallback }))
      gridRef.current.addEventHandler('keydown', (e) => {
        if (gridNav.onKeyDown(e)) e.stopImmediatePropagation()
      })
    }
  }, [gridRef])
  
  useEffect(() => gridNav?.markStale())
}
...
const selectCallback = ...
useGridNavigator(myGridRef, selectCallback)
```

## Key Bindings

The default key bindings are those suggested
by [the w3 documentation](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids). These are
specified within grid-navigator using a Javascript object, interpreted as a map:

```typescript
export const DEFAULT_STANDARD: KeyToMoveOpMap = {
  'ArrowLeft':   'prev',
  'ArrowRight':  'next',
  'ArrowUp':     'up',
  'ArrowDown':   'down',
  'PageDown':    'pageDown',
  'PageUp':      'pageUp',
  'Home':        'startOfLine',
  'End':         'endOfLine',
  'Ctrl + Home': 'first',
  'Ctrl + End':  'last',
}
```

#### Supplementary Keyboard Map

You can amend this map with any of your own.

For convenience, a few supplementary key bindings are provided:

* `VI`-ish
* `EMACS`-ish
* `NUMPAD`, for navigation using a numeric keypad. This is outside the standard recommendation, but convenient for some
  users.

To use any of these, import them and pass them in to the `GridNavigator` constructor:

```typescript
import { KeyMaps } from 'grid-navigator'

myKeyMaps = [...KeyMaps.DEFAULT_STANDARD, ...KeyMaps.VI, KeyMaps.EMACS]

const myNav = new GridNavigator({
                                  keyMap: myKeyMaps,
                                  elementProvider,
                                  selectCallback
                                })
```

#### Overriding

The grid navigator accepts a `keyMap` property to so that you can control in fine detail how keystrokes are handled. As
described above, this is a Javascript object used as a map from a key value to a "moveOp".

* The keyboard value is provided by [keyboard-event-to-string](https://www.npmjs.com/package/keyboard-event-to-string).
* The "move" is encapsulated by the `MoveOp` type.

## License

Contact me for licensing or consulting.

## Development

See `package.json`.

To release, `yarn publish`

## Credits

* [Build A Library With esbuild](https://medium.com/geekculture/build-a-library-with-esbuild-23235712f3c)

Copyright (c) 2021–2022 Andrew J. Peterson, NDP Software. All Rights Reserved.
