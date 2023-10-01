import {gridWalker} from './grid-walker'
import test, {describe} from 'node:test'
import assert from 'node:assert/strict'

describe('gridWalker', () => {
  const subject = gridWalker({
    cellCount:   8,
    columnCount: 3,
    pageSize:    5
  })

  test('navigates', () => {
    const actual = subject('next', 1)
    assert.deepEqual(actual, 2)
    assert.deepEqual(subject('next', 2), 3)
    assert.deepEqual(subject('next', 3), 4)
  })

  test('navigates by row', () => {
    const actual = subject('down', 1)
    assert.deepEqual(actual, 4)
  })

  test('navigates by page', () => {
    const actual = subject('pageDown', 1)
    assert.deepEqual(actual, 7)
  })
})
