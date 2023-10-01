import * as subjects from './stepper'

import specify, {describe} from 'node:test'
import assert from 'node:assert/strict'

describe('Stepper', () => {
  describe('empty stepper', () => {
    const subject = new subjects.Stepper(0, 1, 3)
    specify('next', () => assert.deepEqual(subject.next(0), 0))
    specify('prev', () => assert.deepEqual(subject.prev(0), 0))
    specify('up', () => assert.deepEqual(subject.up(0), 0))
    specify('down', () => assert.deepEqual(subject.down(0), 0))
    specify('left', () => assert.deepEqual(subject.left(0), 0))
    specify('right', () => assert.deepEqual(subject.right(0), 0))
    specify('first', () => assert.deepEqual(subject.first(), 0))
    specify('last', () => assert.deepEqual(subject.last(), 0))
    specify('endOfLine', () => assert.deepEqual(subject.endOfLine(0), 0))
    specify('startOfLine', () => assert.deepEqual(subject.startOfLine(0), 0))
    specify('pageUp', () => assert.deepEqual(subject.pageUp(0), 0))
    specify('pageDown', () => assert.deepEqual(subject.pageDown(0), 0))

    specify('zero row length', () => assert.throws(() => new subjects.Stepper(0, 0, 3),{ message: '`rowLength` must be positive'}))
  })

  describe('1 element stepper', () => {
    const subject = new subjects.Stepper(1, 1, 3)
    specify('next', () => assert.deepEqual(subject.next(0), 0))
    specify('prev', () => assert.deepEqual(subject.prev(0), 0))
    specify('up', () => assert.deepEqual(subject.up(0), 0))
    specify('down', () => assert.deepEqual(subject.down(0), 0))
    specify('left', () => assert.deepEqual(subject.left(0), 0))
    specify('right', () => assert.deepEqual(subject.right(0), 0))
    specify('first', () => assert.deepEqual(subject.first(), 0))
    specify('last', () => assert.deepEqual(subject.last(), 0))
    specify('endOfLine', () => assert.deepEqual(subject.endOfLine(0), 0))
    specify('startOfLine', () => assert.deepEqual(subject.startOfLine(0), 0))
    specify('pageUp', () => assert.deepEqual(subject.pageUp(0), 0))
    specify('pageDown', () => assert.deepEqual(subject.pageDown(0), 0))

    specify('zero row length', () => assert.throws(() => new subjects.Stepper(0, 0, 3),{message: '`rowLength` must be positive'}))
    specify('zero page size', () => assert.throws(() => new subjects.Stepper(0, 3, 0), {message: '`pageSize` must be positive'}))
  })

  describe('regular stepper', () => {

    const subject = new subjects.Stepper(8, 3, 2)

    specify('next', () => assert.deepEqual(subject.next(0), 1))
    specify('next @ end', () => assert.deepEqual(subject.next(7), 0))

    specify('prev @ start', () => assert.deepEqual(subject.prev(0), 7))
    specify('prev', () => assert.deepEqual(subject.prev(3), 2))
    specify('up', () => assert.deepEqual(subject.up(0), 0))
    specify('up from below', () => assert.deepEqual(subject.up(4), 1))
    specify('down', () => assert.deepEqual(subject.down(0), 3))
    specify('down', () => assert.deepEqual(subject.down(3), 6))
    specify('down', () => assert.deepEqual(subject.down(6), 7))
    specify('down', () => assert.deepEqual(subject.down(7), 7))
    specify('left', () => assert.deepEqual(subject.left(1), 0))
    specify('left', () => assert.deepEqual(subject.left(0), 0))
    specify('right', () => assert.deepEqual(subject.right(0), 1))
    specify('right @ right', () => assert.deepEqual(subject.right(2), 2))
    specify('right @ end', () => assert.deepEqual(subject.right(7), 7))
    specify('first', () => assert.deepEqual(subject.first(), 0))
    specify('last', () => assert.deepEqual(subject.last(), 7))
    specify('endOfLine', () => assert.deepEqual(subject.endOfLine(0), 2))
    specify('endOfLine partial line', () => assert.deepEqual(subject.endOfLine(6), 7))
    specify('startOfLine', () => assert.deepEqual(subject.startOfLine(0), 0))

    specify('pageUp', () => assert.deepEqual(subject.pageUp(7), 1))
    specify('pageDown', () => assert.deepEqual(subject.pageDown(0), 6))
  })

})


describe('isMoveOp', () => {

  specify('next', () => assert.deepEqual(subjects.isMoveOp('next'), true))
  specify('up', () => assert.deepEqual(subjects.isMoveOp('up'), true))
  specify('down', () => assert.deepEqual(subjects.isMoveOp('down'), true))
  specify('first', () => assert.deepEqual(subjects.isMoveOp('first'), true))
  specify('pageDown', () => assert.deepEqual(subjects.isMoveOp('pageDown'), true))

  specify('string that not a direction', () => assert.deepEqual(subjects.isMoveOp('sideways'), false))
  specify('number', () => assert.deepEqual(subjects.isMoveOp(7), false))

  specify('lastIndex is not a MoveOp', () => assert.deepEqual(subjects.isMoveOp('lastIndex'), false))
  specify('rowLength is not a MoveOp', () => assert.deepEqual(subjects.isMoveOp('rowLength'), false))
  specify('size is not a MoveOp', () => assert.deepEqual(subjects.isMoveOp('size'), false))
  specify('pageSize is not a MoveOp', () => assert.deepEqual(subjects.isMoveOp('pageSize'), false))

})

