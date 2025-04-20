import { AutoFilter, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Distortion, FeedbackDelay, Freeverb, FrequencyShifter, JCReverb, Phaser, PingPongDelay, PitchShift, Reverb, StereoWidener, Tremolo, Vibrato } from "tone";
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
            frequency: 2,
            wet: 1,
        }).start()),
        createStateFx: () => ({name: 'AutoPanner', settings: {
            depth: 0.5,
            frequency: 2,
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
    {
        name: 'Freeverb',
        description: 'Freeverb is a reverb.',
        createToneFx: () => (new Freeverb({
            wet: 0.4,
            roomSize: 0.5,
            dampening: 1000,
        })),
        createStateFx: () => ({name: 'Freeverb', settings: {
            wet: 0.4,
            roomSize: 0.5,
            dampening: 1000,
        }}),
    },
    {
        name: 'FrequencyShifter',
        description: 'FrequencyShifter can be used to shift all frequencies of a signal by a fixed amount. The amount can be changed at audio rate and the effect is applied in real time. The frequency shifting is implemented with a technique called single side band modulation using a ring modulator. Note: Contrary to pitch shifting, all frequencies are shifted by the same amount, destroying the harmonic relationship between them. This leads to the classic ring modulator timbre distortion. The algorithm will produces some aliasing towards the high end, especially if your source material contains a lot of high frequencies. Unfortunatelly the webaudio API does not support resampling buffers in real time, so it is not possible to fix it properly. Depending on the use case it might be an option to low pass filter your input before frequency shifting it to get ride of the aliasing.',
        createToneFx: () => (new FrequencyShifter({
            wet: 1,
            frequency: 340,
        })),
        createStateFx: () => ({name: 'FrequencyShifter', settings: {
            wet: 1,
            frequency: 340,
        }}),
    },
    {
        name: 'JCReverb',
        description: 'JCReverb is a simple Schroeder Reverberator tuned by John Chowning in 1970. It is made up of three allpass filters and four FeedbackCombFilter. JCReverb is now implemented with an AudioWorkletNode which may result on performance degradation on some platforms.',
        createToneFx: () => (new JCReverb({
            wet: 0.4,
            roomSize: 0.5,
        })),
        createStateFx: () => ({name: 'JCReverb', settings: {
            wet: 0.4,
            roomSize: 0.5,
        }}),
    },
    {
        name: 'Phaser',
        description: 'Phaser is a phaser effect. Phasers work by changing the phase of different frequency components of an incoming signal.',
        createToneFx: () => (new Phaser({
            Q: 0.5,
            frequency: 15,
            octaves: 5,
            baseFrequency: 1000,
            wet: 0.5,
        })),
        createStateFx: () => ({name: 'Phaser', settings: {
            Q: 0.5,
            frequency: 15,
            octaves: 5,
            baseFrequency: 1000,
            wet: 0.5,
        }}),
    },
    {
        name: 'PingPongDelay',
        description: 'PingPongDelay is a feedback delay effect where the echo is heard first in one channel and next in the opposite channel. In a stereo system these are the right and left channels. PingPongDelay in more simplified terms is two Tone.FeedbackDelays with independent delay values. Each delay is routed to one channel (left or right), and the channel triggered second will always trigger at the same interval after the first.',
        createToneFx: () => (new PingPongDelay({
            feedback: 0.5,
            wet: 0.4,
            delayTime: 60,
        })),
        createStateFx: () => ({name: 'PingPongDelay', settings: {
            feedback: 0.5,
            wet: 0.4,
            delayTime: 60,
        }}),
    },
    {
        name: 'PitchShift',
        description: 'PitchShift does near-realtime pitch shifting to the incoming signal. The effect is achieved by speeding up or slowing down the delayTime of a DelayNode using a sawtooth wave.',
        createToneFx: () => (new PitchShift({
            feedback: 0,
            wet: 1,
            delayTime: 0,
            pitch: -3,
        })),
        createStateFx: () => ({name: 'PitchShift', settings: {
            feedback: 0,
            wet: 1,
            delayTime: 0,
            pitch: -3,
        }}),
    },
    {
        name: 'Reverb',
        description: 'Simple convolution created with decaying noise. Generates an Impulse Response Buffer with Tone.Offline then feeds the IR into ConvolverNode.',
        createToneFx: () => (new Reverb({
            wet: 0.4,
            decay: 4,
        })),
        createStateFx: () => ({name: 'Reverb', settings: {
            wet: 0.4,
            decay: 4,
        }}),
    },
    {
        name: 'StereoWidener',
        description: 'Applies a width factor to the mid/side seperation. 0 is all mid and 1 is all side.',
        createToneFx: () => (new StereoWidener({
            width: 0.5,
            wet: 1,
        })),
        createStateFx: () => ({name: 'StereoWidener', settings: {
            width: 0.5,
            wet: 1,
        }}),
    },
    {
        name: 'Tremolo',
        description: 'Tremolo modulates the amplitude of an incoming signal using an LFO. The effect is a stereo effect where the modulation phase is inverted in each channel.',
        createToneFx: () => (new Tremolo({
            frequency: 9,
            wet: 0.75,
            depth: 0.75,
        }).start()),
        createStateFx: () => ({name: 'Tremolo', settings: {
            frequency: 9,
            wet: 0.75,
            depth: 0.75,
        }}),
    },
    {
        name: 'Vibrato',
        description: 'A Vibrato effect composed of a Tone.Delay and a Tone.LFO. The LFO modulates the delayTime of the delay, causing the pitch to rise and fall.',
        createToneFx: () => (new Vibrato({
            frequency: 9,
            wet: 0.75,
            depth: 0.75,
        })),
        createStateFx: () => ({name: 'Vibrato', settings: {
            frequency: 9,
            wet: 0.75,
            depth: 0.75,
        }}),
    },
]

export default addFxList