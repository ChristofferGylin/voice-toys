import signalToDb from "./signalToDb"

describe('signalToDb scales values correctly', () => {
    it('scales the input 0 to output -60', () => {
        expect(signalToDb(0)).toBe(-60)
    })

    it('scales the input 0.5 to output -11.13606249337991', () => {
        expect(signalToDb(0.5)).toBe(-11.13606249337991)
    })

    it('scales the input 1 to output 6', () => {
        expect(signalToDb(1)).toBe(6)
    })
})