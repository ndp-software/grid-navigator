import {ObjectGridNavigator} from './object-grid-navigator'
import {objectGridNavigator} from './object-grid-navigator'
import specify, {describe, beforeEach, mock} from 'node:test'

import assert from 'node:assert/strict'


describe('ObjectGridNavigator', () => {
  const a = [{k: 'a'},
    {k: 'b'},
    {k: 'c'},
    {k: 'd'},
    {k: 'e'}
  ]
  let subject: ObjectGridNavigator<typeof a[number]>
  let spy

  beforeEach(() => {
    spy = mock.fn()
    subject = objectGridNavigator(a, 2, 3, spy, a[0])
    assert.deepEqual(subject(), a[0])
  })

  specify('given no parameters', () => {
    const subject = objectGridNavigator(a, 2, 3, spy, a[2])

    assert.deepEqual(subject(), a[2])
  })

  specify('navigating with direction', () => {

    assert.deepEqual(subject('next'), a[1])
    assert.deepEqual(spy.mock.callCount(), 1)
    assert.deepEqual(spy.mock.calls[0].arguments, [a[1], a[0]])

    assert.deepEqual(subject('next'), a[2])
    assert.deepEqual(subject('next'), a[3])
    assert.deepEqual(subject('next'), a[4])
    assert.deepEqual(subject('next'), a[0])
    assert.deepEqual(subject('next'), a[1])
  })

  specify('given an object in the list', () => {

    const subject = objectGridNavigator(a, 2, 3, spy, a[0])

    assert.deepEqual(subject(a[3]), a[3])

    assert.deepEqual(spy.mock.callCount(), 1)
    assert.deepEqual(spy.mock.calls[0].arguments, [a[3], a[0]])

    assert.deepEqual(subject(a[1]), a[1])
  })

  specify('given an object not the list raises exception and maintains state', () => {
    const subject = objectGridNavigator(a, 2, 3, spy, a[1])
    assert.throws(() => subject({k: 'foobar'}), { message: 'Invalid dirOrNode ({"k":"foobar"})'})
    assert.deepEqual(subject(), a[1])
  })

  specify('given an unknown command raises exception and maintains state', () => {
    const subject = objectGridNavigator(a, 2, 3, spy, a[2])

    assert.throws(() => subject('go west' as 'next'), {message: 'Invalid dirOrNode ("go west")'})

    assert.deepEqual(subject(), a[2])
  })
})

