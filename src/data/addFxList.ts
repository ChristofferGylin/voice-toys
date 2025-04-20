import { AutoFilter, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Distortion, FeedbackDelay } from "tone";
import { type AddFxType } from "../types/Fx";

const addFxList: AddFxType[] = [
    {
        name: 'AutoFilter',
        description: 'AutoFilter is a Tone.Filter with a Tone.LFO connected to the filter cutoff frequency. Setting the LFO rate and depth allows for control over the filter modulation rate and depth.',
        createToneFx: () => (new AutoFilter({
            depth: 0.5,
            frequency: 4,
            wet: 1,
            baseFrequency: 1,
            octaves: 3,
        }).start()),
        createStateFx: () => ({name: 'AutoFilter', settings: {
            depth: 0.5,
            frequency: 4,
            wet: 1,
            baseFrequency: 1,
            octaves: 3,
        }}),
    },
    {
        name: 'AutoPanner',
        description: 'AutoPanner is a Panner with an LFO connected to the pan amount.',
        createToneFx: () => (new AutoPanner({
            depth: 0.5,
            frequency: 4,
            wet: 1,
        }).start()),
        createStateFx: () => ({name: 'AutoPanner', settings: {
            depth: 0.5,
            frequency: 4,
            wet: 1,
            baseFrequency: 1,
            octaves: 3,
        }}),
    },
    {
        name: 'AutoWah',
        description: 'AutoWah connects a Follower to a Filter. The frequency of the filter, follows the input amplitude curve. Inspiration from Tuna.js.',
        createToneFx: () => (new AutoWah({
            baseFrequency: 50,
            octaves: 6,
            sensitivity: -30
        })),
        createStateFx: () => ({name: 'AutoPanner', settings: {
            Q: 0.5,
            gain: 1,
            wet: 1,
            baseFrequency: 50,
            octaves: 6,
            sensitivity: -30
        }}),
    },
    {
        name: 'BitCrusher',
        description: 'BitCrusher down-samples the incoming signal to a different bit depth. Lowering the bit depth of the signal creates distortion.',
        createToneFx: () => (new BitCrusher(4)),
        createStateFx: () => ({name: 'Bitcrusher', settings: {
            bits: 4,
            wet: 0.5
        }}),
    },
    {
        name: 'Chebyshev',
        description: 'Chebyshev is a waveshaper which is good for making different types of distortion sounds. Note that odd orders sound very different from even ones, and order = 1 is no change.',
        createToneFx: () => (new Chebyshev(50)),
        createStateFx: () => ({name: 'Chebyshev', settings: {
            order: 50,
            wet: 0.5
        }}),
    },
    {
        name: 'Chorus',
        description: 'Chorus is a stereo chorus effect composed of a left and right delay with an LFO applied to the delayTime of each channel. When feedback is set to a value larger than 0, you also get Flanger-type effects. Inspiration from Tuna.js.',
        createToneFx: () => (new Chorus(4, 2.5, 0.5).start()),
        createStateFx: () => ({name: 'Chorus', settings: {
            frequency: 4,
            delayTime: 2.5,
            depth: 0.5,
            wet: 1,
            feedback: 0,
        }}),
    },
    {
        name: 'Distortion',
        description: 'A simple distortion effect using Tone.WaveShaper.',
        createToneFx: () => (new Distortion({wet: 0.5, distortion: 0.8})),
        createStateFx: () => ({name: 'Distortion', settings: {
            wet: 0.5,
            distortion: 0.8,
        }}),
    },
    {
        name: 'FeedbackDelay',
        description: 'FeedbackDelay is a DelayNode in which part of output signal is fed back into the delay.',
        createToneFx: () => (new FeedbackDelay({
            feedback: 0.4,
            wet: 0.5,
            delayTime: 100,
        })),
        createStateFx: () => ({name: 'FeedbackDelay', settings: {
            feedback: 0.4,
            wet: 0.5,
            delayTime: 100,
        }}),
    },
]

export default addFxList