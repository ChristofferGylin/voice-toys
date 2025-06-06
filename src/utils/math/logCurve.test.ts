import { logCurve } from "./logCurve"

describe('logCurve scales values correctly', () => {
    it('scales the input 0 to output 0', () => {
        expect(logCurve(0)).toBe(0)
    })

    it('scales the input 1 to output 0.03742649794062366', () => {
        expect(logCurve(1)).toBe(0.03742649794062366)
    })

    it('scales the input 10 to output 0.2787536009528289', () => {
        expect(logCurve(10)).toBe(0.2787536009528289)
    })
})