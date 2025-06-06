import { scaleValue } from "./scaleValue"

test('scaleValue scales the value correctly', () => {
    expect(scaleValue({value: 0.5, fromScale: {start: 0, end: 1}, toScale: {start: 0, end: 100}})).toBe(50)
})