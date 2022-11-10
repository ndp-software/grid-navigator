/* eslint-env mocha */
import { expect }    from 'chai'
import * as subjects from './stepper'

describe('Stepper', () => {
  describe('empty stepper', () => {
    const subject = new subjects.Stepper(0, 1, 3)
    specify('next', () => expect(subject.next(0)).to.eq(0))
    specify('prev', () => expect(subject.prev(0)).to.eq(0))
    specify('up', () => expect(subject.up(0)).to.eq(0))
    specify('down', () => expect(subject.down(0)).to.eq(0))
    specify('left', () => expect(subject.left(0)).to.eq(0))
    specify('right', () => expect(subject.right(0)).to.eq(0))
    specify('first', () => expect(subject.first()).to.eq(0))
    specify('last', () => expect(subject.last()).to.eq(0))
    specify('endOfLine', () => expect(subject.endOfLine(0)).to.eq(0))
    specify('startOfLine', () => expect(subject.startOfLine(0)).to.eq(0))
    specify('pageUp', () => expect(subject.pageUp(0)).to.eq(0))
    specify('pageDown', () => expect(subject.pageDown(0)).to.eq(0))

    specify('zero row length', () => expect(() => new subjects.Stepper(0, 0, 3)).throws('`rowLength` must be positive'))
  })

  describe('1 element stepper', () => {
    const subject = new subjects.Stepper(1, 1, 3)
    specify('next', () => expect(subject.next(0)).to.eq(0))
    specify('prev', () => expect(subject.prev(0)).to.eq(0))
    specify('up', () => expect(subject.up(0)).to.eq(0))
    specify('down', () => expect(subject.down(0)).to.eq(0))
    specify('left', () => expect(subject.left(0)).to.eq(0))
    specify('right', () => expect(subject.right(0)).to.eq(0))
    specify('first', () => expect(subject.first()).to.eq(0))
    specify('last', () => expect(subject.last()).to.eq(0))
    specify('endOfLine', () => expect(subject.endOfLine(0)).to.eq(0))
    specify('startOfLine', () => expect(subject.startOfLine(0)).to.eq(0))
    specify('pageUp', () => expect(subject.pageUp(0)).to.eq(0))
    specify('pageDown', () => expect(subject.pageDown(0)).to.eq(0))

    specify('zero row length', () => expect(() => new subjects.Stepper(0, 0, 3)).throws('`rowLength` must be positive'))
    specify('zero page size', () => expect(() => new subjects.Stepper(0, 3, 0)).throws('`pageSize` must be positive'))
  })

  describe('regular stepper', () => {

    const subject = new subjects.Stepper(8, 3, 2)

    specify('next', () => expect(subject.next(0)).to.eq(1))
    specify('next @ end', () => expect(subject.next(7)).to.eq(0))

    specify('prev @ start', () => expect(subject.prev(0)).to.eq(7))
    specify('prev', () => expect(subject.prev(3)).to.eq(2))
    specify('up', () => expect(subject.up(0)).to.eq(0))
    specify('up from below', () => expect(subject.up(4)).to.eq(1))
    specify('down', () => expect(subject.down(0)).to.eq(3))
    specify('down', () => expect(subject.down(3)).to.eq(6))
    specify('down', () => expect(subject.down(6)).to.eq(7))
    specify('down', () => expect(subject.down(7)).to.eq(7))
    specify('left', () => expect(subject.left(1)).to.eq(0))
    specify('left', () => expect(subject.left(0)).to.eq(0))
    specify('right', () => expect(subject.right(0)).to.eq(1))
    specify('right @ right', () => expect(subject.right(2)).to.eq(2))
    specify('right @ end', () => expect(subject.right(7)).to.eq(7))
    specify('first', () => expect(subject.first()).to.eq(0))
    specify('last', () => expect(subject.last()).to.eq(7))
    specify('endOfLine', () => expect(subject.endOfLine(0)).to.eq(2))
    specify('endOfLine partial line', () => expect(subject.endOfLine(6)).to.eq(7))
    specify('startOfLine', () => expect(subject.startOfLine(0)).to.eq(0))

    specify('pageUp', () => expect(subject.pageUp(7)).to.eq(1))
    specify('pageDown', () => expect(subject.pageDown(0)).to.eq(6))
  })

})


describe('isMoveOp', () => {

  specify('next', () => expect(subjects.isMoveOp('next')).to.eq(true))
  specify('up', () => expect(subjects.isMoveOp('up')).to.eq(true))
  specify('down', () => expect(subjects.isMoveOp('down')).to.eq(true))
  specify('first', () => expect(subjects.isMoveOp('first')).to.eq(true))
  specify('pageDown', () => expect(subjects.isMoveOp('pageDown')).to.eq(true))

  specify('string that not a direction', () => expect(subjects.isMoveOp('sideways')).to.eq(false))
  specify('number', () => expect(subjects.isMoveOp(7)).to.eq(false))

  specify('lastIndex is not a MoveOp', () => expect(subjects.isMoveOp('lastIndex')).to.eq(false))
  specify('rowLength is not a MoveOp', () => expect(subjects.isMoveOp('rowLength')).to.eq(false))
  specify('size is not a MoveOp', () => expect(subjects.isMoveOp('size')).to.eq(false))
  specify('pageSize is not a MoveOp', () => expect(subjects.isMoveOp('pageSize')).to.eq(false))

})

