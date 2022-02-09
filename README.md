# Grid Navigator

Provides no-fuss accessible keyboard navigation handling to a grid component. This is _not_ a spreadsheet-like grid, but provides keyboard navigation if you have a simple grid (think: CSS grid) that the user will want to navigate between items.

- provides the "standard" keyboard navigation
- simple integration: a single delegation of keydown events.
- handles responsive resizing of the browser (and therefore rows) automatically
- handles dynamic lists of elements efficiently, using lazy calculations
- rigorously tested
- customizable

For our users' sake, it's convenient and recommended for data grids to have keyboard navigation. The W3 [recommends certain behaviors](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids), but this isn't built in to HTML-- nor is it easily obtainable. You have to write some Javascript and messy `switch` statements. Once you start writing this, you realize the actual math of the situation is a little tricky-- or at least tedious. With any sort of responsive layout, moving the the "next row" is a dynamic calculation, not just an addition, as is finding the first or last element of the row.

This package handles all that with a simple TypeScript-compatible package.

## Demo

A proper demo will come, but in the meantime, see [https://amp-what.com](https://amp-what.com)

## Steps to integrate

[![Node.js CI](https://github.com/ndp-software/grid-navigator/actions/workflows/node.js.yml/badge.svg)](https://github.com/ndp-software/grid-navigator/actions/workflows/node.js.yml)

If you have a grid of elements, images or tiles, and you'd like to add keyboard navigation, the process is just a few steps:

### 1. Include the package in your project, eg.
   ```shell
   npm add --save grid-navigator
   ```
   (Yarn and Typescript also work.)

### 2. Create an "elements provider".
This is a function that returns the list of nodes to be navigated. eg.
  ```typescript
  const elementsProvider = () => document.getElementsByTagName('li')
  ```
   This will be called lazily as it is needed.

### 3. Create a "select callback". This is a function that shows the user the "selected" or "focused" state of elements. eg.
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

### 4. Create a navigator:

```typescript
import { GridNavigator } from 'grid-navigator'

const myNav = new GridNavigator({ elementProvider, selectCallback })
```

### 5. Call the handler from the keydown handler of your grid container.
```typescript
const grid = document.getElementById('grid')
grid.addEventHandler('keydown', (e) => {
  if (myNav.onKeyDown(e)) return

  // do you normal stuff
  ...
  })
```
This keydown handler will look for applicable hot keys, and if present, call the `selectCallback` appropriately. It returns `true` if it handles the keyboard event, and `false` otherwise.

### 6. (Optional) Handle dynamic lists

The code uses `elementProvider` to calculate the elements that are being
navigated, but once calculated, it assumes they are stable. If the elements change, simply call `myNav.markStale()`, and `elementProvider` will be called again and caches reset.


## Customization

### Keyboard Map

The grid navigator accepts a `keyMap` property to so that you can
control in fine detail which keystrokes are handled. These are a map from a named key to a "moveOp", of the type `MoveOp`. The naming scheme is provided by [keyboard-event-to-string](https://www.npmjs.com/package/keyboard-event-to-string). The defaults are those suggested by [the w3 documentation](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-for-data-grids):
```typescript
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
  'Ctrl + End':  'last',
}
```
You can amend this with any of your own. For convenience, VI-ish and EMACS-ish maps are provided:
```typescript
import { KeyMaps } from 'grid-navigator'

myKeyMaps = [...KeyMaps.NAV_AND_ARROW_MAP, ...KeyMaps.VI_MAP]

const myNav = new GridNavigator({keyMap: myKeyMaps,
                                  elementProvider, 
                                  selectCallback } )
```

## License

Contact me for licensing or consulting.

## Credits
* [Build A Library With esbuild](https://medium.com/geekculture/build-a-library-with-esbuild-23235712f3c)

Copyright (c) 2021–2022 Andrew J. Peterson, NDP Software. All Rights Reserved.
