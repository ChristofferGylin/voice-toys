import { AutoFilter, AutoPanner } from "tone";
import { type AddFxType } from "../types/Fx";

const addFxList: AddFxType[] = [
    {
        name: 'AutoFilter',
        description: 'AutoFilter is a Tone.Filter with a Tone.LFO connected to the filter cutoff frequency. Setting the LFO rate and depth allows for control over the filter modulation rate and depth.',
        createToneFx: () => (new AutoFilter({
            depth: 0.5,
            frequency: 300,
            wet: 1,
            baseFrequency: 100,
            octaves: 3,
        }).start()),
        createStateFx: () => ({name: 'AutoFilter', settings: {
            depth: 0.5,
            frequency: 300,
            wet: 1,
            baseFrequency: 100,
            octaves: 3,
        }}),
    },
    {
        name: 'AutoPanner',
        description: 'AutoPanner is a Panner with an LFO connected to the pan amount.',
        createToneFx: () => (new AutoPanner({
            depth: 0.5,
            frequency: 300,
            wet: 1,
        }).start()),
        createStateFx: () => ({name: 'AutoPanner', settings: {
            depth: 0.5,
            frequency: 300,
            wet: 1,
            baseFrequency: 100,
            octaves: 3,
        }}),
    },
]

export default addFxList