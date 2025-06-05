import { cubeCurve } from "./cubeCurve"

describe('cubeCurve scales values correctly', () => {
    it('scales the input 0 to output 0', () => {
        expect(cubeCurve(0)).toBe(0)
    })

    it('scales the input 1 to output 0.0000010000000000000002', () => {
        expect(cubeCurve(1)).toBe(0.0000010000000000000002)
    })

    it('scales the input 10 to output 0.001', () => {
        expect(cubeCurve(10)).toBe(0.001)
    })
})