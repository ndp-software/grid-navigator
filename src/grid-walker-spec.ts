import * as subjects from './grid-walker'
import { expect }    from 'chai'

describe('gridWalker', () => {
  const subject = subjects.gridWalker({
    cellCount:   8,
    columnCount: 3,
    pageSize:    5
  })

  specify('navigates', () => {
    const actual = subject('next', 1)
    expect(actual).to.eq(2)
    expect(subject('next', 2)).to.eq(3)
    expect(subject('next', 3)).to.eq(4)
  })
  specify('navigates by row', () => {
    const actual = subject('down', 1)
    expect(actual).to.eq(4)
  })
  specify('navigates by page', () => {
    const actual = subject('pageDown', 1)
    expect(actual).to.eq(7)
  })
})
