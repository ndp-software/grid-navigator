/* eslint-env mocha */
import {expect} from 'chai'
import sinon                 from 'sinon'
import {ObjectGridNavigator} from './object-grid-navigator'
import {objectGridNavigator} from './object-grid-navigator'

describe('ObjectGridNavigator', () => {
  const a = [{k: 'a'},
    {k: 'b'},
    {k: 'c'},
    {k: 'd'},
    {k: 'e'}
  ]
  type Value = typeof a[number]
  let spy: sinon.SinonSpy<[next: Value, prev: Value | null], void>
  let subject: ObjectGridNavigator<typeof a[number]>

  beforeEach(() => {
    spy = sinon.spy() as typeof spy
    subject = objectGridNavigator(a, 2, 3, spy, a[0])
    expect(subject()).to.eq(a[0])
  })

  specify('given no parameters', () => {
    const subject = objectGridNavigator(a, 2, 3, spy, a[2])

    expect(subject()).to.eq(a[2])
  })

  specify('navigating with direction', () => {

    expect(subject('next')).to.eq(a[1])
    expect(spy.calledOnce).to.eq(true)
    expect(spy.calledWith(a[1], a[0])).to.eq(true)

    expect(subject('next')).to.eq(a[2])
    expect(subject('next')).to.eq(a[3])
    expect(subject('next')).to.eq(a[4])
    expect(subject('next')).to.eq(a[0])
    expect(subject('next')).to.eq(a[1])
  })

  specify('given an object in the list', () => {

    const subject = objectGridNavigator(a, 2, 3, spy, a[0])

    expect(subject(a[3])).to.eq(a[3])

    expect(spy.calledOnce).to.eq(true)
    expect(spy.calledWith(a[3], a[0])).to.eq(true)

    expect(subject(a[1])).to.eq(a[1])
  })

  specify('given an object not the list raises exception and maintains state', () => {
    const subject = objectGridNavigator(a, 2, 3, spy, a[1])

    expect(() => subject({k: 'foobar'})).throws('Invalid dirOrNode ({"k":"foobar"})')
    expect(subject()).to.eq(a[1])
  })

  specify('given an unknown command raises exception and maintains state', () => {
    const subject = objectGridNavigator(a, 2, 3, spy, a[2])

    expect(() => subject('go west' as 'next')).throws('Invalid dirOrNode ("go west")')

    expect(subject()).to.eq(a[2])
  })
})

