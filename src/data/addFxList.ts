import { AutoFilter, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Compressor, Distortion, EQ3, FeedbackDelay, Filter, Freeverb, FrequencyShifter, Gate, JCReverb, Limiter, Phaser, PingPongDelay, PitchShift, Reverb, StereoWidener, Tremolo, Vibrato } from "tone";
import { assertsAutoFilter, assertsFeedbackDelay, ToneFx, type AddFxType } from "../types/Fx";
import { v4 as uuidv4 } from "uuid"

const addFxList: AddFxType[] = [
    {
        name: 'AutoFilter',
        description: 'AutoFilter is a Tone.Filter with a Tone.LFO connected to the filter cutoff frequency. Setting the LFO rate and depth allows for control over the filter modulation rate and depth.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getParams: () => {
                    return []
                },
                setParam: (param, value) => {
                    console.log(param)
                    console.log(value)
                },
                fx: new AutoFilter({
                    depth: 0.5,
                    frequency: 4,
                    wet: 1,
                    baseFrequency: 1,
                    octaves: 3,
                }).start()
            }
        },
        createStateFx: (id: string) => {

            return {
                id,
                name: 'AutoFilter'
            }
            
            
            // return (
            //     {name: 'AutoFilter',
            //         params: [
            //         {name: 'depth', min: 0, max: 1, value: 0.5, setter: (value: number) => {fx.set({depth: value})}},
            //         {name: 'frequency', min: 0, max: 20000, value: 4, setter: (value: number) => {fx.frequency.value = value}},
            //         {name: 'wet', min: 0, max: 1, value: 1, setter: (value: number) => {fx.wet.value = value}},
            //         {name: 'baseFrequency', min: 0, max: 20000, value: 1, setter: (value: number) => {fx.set({baseFrequency: value})}},
            //         {name: 'octaves', min: 1, max: 8, value: 3, setter: (value: number) => {fx.set({octaves: value})}},
            //     ]})
        },
    },
    // {
    //     name: 'AutoPanner',
    //     description: 'AutoPanner is a Panner with an LFO connected to the pan amount.',
    //     createToneFx: () => (new AutoPanner({
    //         depth: 0.5,
    //         frequency: 2,
    //         wet: 1,
    //     }).start()),
    //     createStateFx: () => ({
    //         name: 'AutoPanner', 
    //         settings: {
    //             depth: 0.5,
    //             frequency: 2,
    //             wet: 1,
    //             baseFrequency: 1,
    //             octaves: 3,
    //         },
    //         minValues: {
    //             depth: 0,
    //             frequency: 0,
    //             wet: 0,
    //             baseFrequency: 0,
    //             octaves: 1,
    //         },
    //         maxValues: {
    //             depth: 1,
    //             frequency: 1000,
    //             wet: 1,
    //             baseFrequency: 1000,
    //             octaves: 8,
    //         },
    //     }),
    // },
    // {
    //     name: 'AutoWah',
    //     description: 'AutoWah connects a Follower to a Filter. The frequency of the filter, follows the input amplitude curve. Inspiration from Tuna.js.',
    //     createToneFx: () => (new AutoWah({
    //         baseFrequency: 50,
    //         octaves: 6,
    //         sensitivity: -30
    //     })),
    //     createStateFx: () => ({
    //         name: 'AutoPanner',
    //         settings: {
    //             Q: 0.5,
    //             gain: 1,
    //             wet: 1,
    //             baseFrequency: 50,
    //             octaves: 6,
    //             sensitivity: -30
    //         },
    //         minValues: {
    //             Q: 0,
    //             gain: 0,
    //             wet: 0,
    //             baseFrequency: 0,
    //             octaves: 1,
    //             sensitivity: -100
    //         },
    //         maxValues: {
    //             Q: 1,
    //             gain: 1,
    //             wet: 1,
    //             baseFrequency: 1000,
    //             octaves: 8,
    //             sensitivity: 6
    //         },
    //     }),
    // },
    // {
    //     name: 'BitCrusher',
    //     description: 'BitCrusher down-samples the incoming signal to a different bit depth. Lowering the bit depth of the signal creates distortion.',
    //     createToneFx: () => (new BitCrusher(4)),
    //     createStateFx: () => ({
    //         name: 'BitCrusher',
    //         settings: {
    //             bits: 4,
    //             wet: 0.5,
    //         },
    //         minValues: {
    //             bits: 0,
    //             wet: 0,
    //         },
    //         maxValues: {
    //             bits: 32,
    //             wet: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'Chebyshev',
    //     description: 'Chebyshev is a waveshaper which is good for making different types of distortion sounds. Note that odd orders sound very different from even ones, and order = 1 is no change.',
    //     createToneFx: () => (new Chebyshev(50)),
    //     createStateFx: () => ({
    //         name: 'Chebyshev',
    //         settings: {
    //             order: 50,
    //             wet: 0.5
    //         },
    //         minValues: {
    //             order: 1,
    //             wet: 0
    //         },
    //         maxValues: {
    //             order: 100,
    //             wet: 1
    //         },
    //     }),
    // },
    // {
    //     name: 'Chorus',
    //     description: 'Chorus is a stereo chorus effect composed of a left and right delay with an LFO applied to the delayTime of each channel. When feedback is set to a value larger than 0, you also get Flanger-type effects. Inspiration from Tuna.js.',
    //     createToneFx: () => (new Chorus(4, 2.5, 0.5).start()),
    //     createStateFx: () => ({
    //         name: 'Chorus',
    //         settings: {
    //             frequency: 4,
    //             delayTime: 2.5,
    //             depth: 0.5,
    //             wet: 1,
    //             feedback: 0,
    //         },
    //         minValues: {
    //             frequency: 0,
    //             delayTime: 0,
    //             depth: 0,
    //             wet: 0,
    //             feedback: 0,
    //         },
    //         maxValues: {
    //             frequency: 20000,
    //             delayTime: 20,
    //             depth: 1,
    //             wet: 1,
    //             feedback: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'Compressor',
    //     description: 'Compressor is a thin wrapper around the Web Audio DynamicsCompressorNode. Compression reduces the volume of loud sounds or amplifies quiet sounds by narrowing or "compressing" an audio signals dynamic range.',
    //     createToneFx: () => (new Compressor({
    //         attack: 0.1,
    //         threshold: -30,
    //         knee: 1,
    //         ratio: 3,
    //         release: 0.5,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Compressor',
    //         settings: {
    //             attack: 0.1,
    //             threshold: -30,
    //             knee: 1,
    //             ratio: 3,
    //             release: 0.5,
    //         },
    //         minValues: {
    //             attack: 0,
    //             threshold: -60,
    //             knee: 0,
    //             ratio: 0,
    //             release: 0,
    //         },
    //         maxValues: {
    //             attack: 1,
    //             threshold: 6,
    //             knee: 1,
    //             ratio: 10,
    //             release: 10,
    //         },
    //     }),
    // },
    // {
    //     name: 'Distortion',
    //     description: 'A simple distortion effect using Tone.WaveShaper.',
    //     createToneFx: () => (new Distortion({wet: 0.5, distortion: 0.8})),
    //     createStateFx: () => ({
    //         name: 'Distortion',
    //         settings: {
    //             wet: 0.5,
    //             distortion: 0.8,
    //         },
    //         minValues: {
    //             wet: 0,
    //             distortion: 0,
    //         },
    //         maxValues: {
    //             wet: 1,
    //             distortion: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'EQ3',
    //     description: 'EQ3 provides 3 equalizer bins: Low/Mid/High.',
    //     createToneFx: () => (new EQ3({
    //         high: 0,
    //         low: 0,
    //         highFrequency: 600,
    //         lowFrequency: 100,
    //         mid: 0,
    //     })),
    //     createStateFx: () => ({
    //         name: 'EQ3',
    //         settings: {
    //             high: 0,
    //             low: 0,
    //             highFrequency: 600,
    //             lowFrequency: 100,
    //             mid: 0,
    //         },
    //         minValues: {
    //             high: -60,
    //             low: -60,
    //             highFrequency: 0,
    //             lowFrequency: 0,
    //             mid: -60,
    //         },
    //         maxValues: {
    //             high: 6,
    //             low: 6,
    //             highFrequency: 20000,
    //             lowFrequency: 20000,
    //             mid: 6,
    //         },
    //     }),
    // },
    {
        name: 'FeedbackDelay',
        description: 'FeedbackDelay is a DelayNode in which part of output signal is fed back into the delay.',
        createToneFx: () => {
            return {
                id: uuidv4(),
                getParams: () => {
                    return []
                },
                setParam: (param, value) => {
                    console.log(param)
                    console.log(value)
                },
                fx: new FeedbackDelay({
                    feedback: 0.4,
                    wet: 0.5,
                    delayTime: 100,
                })
            }
        },
        createStateFx: (id: string) => {

            return {
                id,
                name: 'AutoFilter'
            }
            
            // return (
            //     {name: 'FeedbackDelay',
            //         params: [
            //         {name: 'wet', min: 0, max: 1, value: 1, setter: (value: number) => {fx.wet.value = value}},
            //         {name: 'feedback', min: 0, max: 1, value: 0.4, setter: (value: number) => {fx.feedback.value = value}},
            //         {name: 'delayTime', min: 0, max: 100, value: 100, setter: (value: number) => {fx.delayTime.value = value}},
            //     ]})
        },
    },
    // {
    //     name: 'Filter',
    //     description: 'Tone.Filter is a filter which allows for all of the same native methods as the BiquadFilterNode. Tone.Filter has the added ability to set the filter rolloff at -12 (default), -24 and -48.',
    //     createToneFx: () => (new Filter({
    //         Q: 0,
    //         detune: 0,
    //         frequency: 400,
    //         gain: 1,
    //         type: 'highpass',
    //     })),
    //     createStateFx: () => ({
    //         name: 'Filter',
    //         settings: {
    //             Q: 0,
    //             detune: 0,
    //             frequency: 400,
    //             gain: 1,
    //             type: 'highpass',
    //         },
    //         minValues: {
    //             Q: 0,
    //             detune: 0,
    //             frequency: 0,
    //             gain: 1,
    //             type: 'lowpass',
    //         },
    //         maxValues: {
    //             Q: 1,
    //             detune: 1,
    //             frequency: 20000,
    //             gain: 1,
    //             type: 'highpass',
    //         },
    //     }),
    // },
    // {
    //     name: 'Freeverb',
    //     description: 'Freeverb is a reverb.',
    //     createToneFx: () => (new Freeverb({
    //         wet: 0.4,
    //         roomSize: 0.5,
    //         dampening: 1000,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Freeverb',
    //         settings: {
    //             wet: 0.4,
    //             roomSize: 0.5,
    //             dampening: 1000,
    //         },
    //         minValues: {
    //             wet: 0,
    //             roomSize: 0,
    //             dampening: 0,
    //         },
    //         maxValues: {
    //             wet: 1,
    //             roomSize: 1,
    //             dampening: 20000,
    //         },
    //     }),
    // },
    // {
    //     name: 'FrequencyShifter',
    //     description: 'FrequencyShifter can be used to shift all frequencies of a signal by a fixed amount. The amount can be changed at audio rate and the effect is applied in real time. The frequency shifting is implemented with a technique called single side band modulation using a ring modulator. Note: Contrary to pitch shifting, all frequencies are shifted by the same amount, destroying the harmonic relationship between them. This leads to the classic ring modulator timbre distortion. The algorithm will produces some aliasing towards the high end, especially if your source material contains a lot of high frequencies. Unfortunatelly the webaudio API does not support resampling buffers in real time, so it is not possible to fix it properly. Depending on the use case it might be an option to low pass filter your input before frequency shifting it to get ride of the aliasing.',
    //     createToneFx: () => (new FrequencyShifter({
    //         wet: 1,
    //         frequency: 340,
    //     })),
    //     createStateFx: () => ({
    //         name: 'FrequencyShifter',
    //         settings: {
    //             wet: 1,
    //             frequency: 340,
    //         },
    //         minValues: {
    //             wet: 0,
    //             frequency: 0,
    //         },
    //         maxValues: {
    //             wet: 1,
    //             frequency: 20000,
    //         },
    //     }),
    // },
    // {
    //     name: 'Gate',
    //     description: 'Gate only passes a signal through when the incoming signal exceeds a specified threshold. It uses Follower to follow the ampltiude of the incoming signal and compares it to the threshold value using GreaterThan.',
    //     createToneFx: () => (new Gate({
    //         threshold: -35,
    //         smoothing: 0.2,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Gate',
    //         settings: {
    //             threshold: -35,
    //             smoothing: 0.2,
    //         },
    //         minValues: {
    //             threshold: -60,
    //             smoothing: 0,
    //         },
    //         maxValues: {
    //             threshold: 6,
    //             smoothing: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'JCReverb',
    //     description: 'JCReverb is a simple Schroeder Reverberator tuned by John Chowning in 1970. It is made up of three allpass filters and four FeedbackCombFilter. JCReverb is now implemented with an AudioWorkletNode which may result on performance degradation on some platforms.',
    //     createToneFx: () => (new JCReverb({
    //         wet: 0.4,
    //         roomSize: 0.5,
    //     })),
    //     createStateFx: () => ({
    //         name: 'JCReverb',
    //         settings: {
    //             wet: 0.4,
    //             roomSize: 0.5,
    //         },
    //         minValues: {
    //             wet: 0,
    //             roomSize: 0,
    //         },
    //         maxValues: {
    //             wet: 1,
    //             roomSize: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'Limiter',
    //     description: 'Limiter will limit the loudness of an incoming signal. Under the hood its composed of a Compressor with a fast attack and release and max compression ratio.',
    //     createToneFx: () => (new Limiter({
    //         threshold: -20,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Limiter',
    //         settings: {
    //             threshold: -20,
    //         },
    //         minValues: {
    //             threshold: -60,
    //         },
    //         maxValues: {
    //             threshold: 6,
    //         },
    //     }),
    // },
    // {
    //     name: 'Phaser',
    //     description: 'Phaser is a phaser effect. Phasers work by changing the phase of different frequency components of an incoming signal.',
    //     createToneFx: () => (new Phaser({
    //         Q: 0.5,
    //         frequency: 15,
    //         octaves: 5,
    //         baseFrequency: 1000,
    //         wet: 0.5,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Phaser',
    //         settings: {
    //             Q: 0.5,
    //             frequency: 15,
    //             octaves: 5,
    //             baseFrequency: 1000,
    //             wet: 0.5,
    //         },
    //         minValues: {
    //             Q: 0,
    //             frequency: 0,
    //             octaves: 1,
    //             baseFrequency: 1,
    //             wet: 0,
    //         },
    //         maxValues: {
    //             Q: 1,
    //             frequency: 20000,
    //             octaves: 8,
    //             baseFrequency: 20000,
    //             wet: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'PingPongDelay',
    //     description: 'PingPongDelay is a feedback delay effect where the echo is heard first in one channel and next in the opposite channel. In a stereo system these are the right and left channels. PingPongDelay in more simplified terms is two Tone.FeedbackDelays with independent delay values. Each delay is routed to one channel (left or right), and the channel triggered second will always trigger at the same interval after the first.',
    //     createToneFx: () => (new PingPongDelay({
    //         feedback: 0.5,
    //         wet: 0.4,
    //         delayTime: 60,
    //     })),
    //     createStateFx: () => ({
    //         name: 'PingPongDelay',
    //         settings: {
    //             feedback: 0.5,
    //             wet: 0.4,
    //             delayTime: 60,
    //         },
    //         minValues: {
    //             feedback: 0,
    //             wet: 0,
    //             delayTime: 1,
    //         },
    //         maxValues: {
    //             feedback: 1,
    //             wet: 1,
    //             delayTime: 10000,
    //         },
    //     }),
    // },
    // {
    //     name: 'PitchShift',
    //     description: 'PitchShift does near-realtime pitch shifting to the incoming signal. The effect is achieved by speeding up or slowing down the delayTime of a DelayNode using a sawtooth wave.',
    //     createToneFx: () => (new PitchShift({
    //         feedback: 0,
    //         wet: 1,
    //         delayTime: 0,
    //         pitch: -3,
    //     })),
    //     createStateFx: () => ({
    //         name: 'PitchShift',
    //         settings: {
    //             feedback: 0,
    //             wet: 1,
    //             delayTime: 0,
    //             pitch: -3,
    //         },
    //         minValues: {
    //             feedback: 0,
    //             wet: 0,
    //             delayTime: 0,
    //             pitch: -12,
    //         },
    //         maxValues: {
    //             feedback: 1,
    //             wet: 1,
    //             delayTime: 10000,
    //             pitch: 12,
    //         },
    //     }),
    // },
    // {
    //     name: 'Reverb',
    //     description: 'Simple convolution created with decaying noise. Generates an Impulse Response Buffer with Tone.Offline then feeds the IR into ConvolverNode.',
    //     createToneFx: () => (new Reverb({
    //         wet: 0.4,
    //         decay: 4,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Reverb',
    //         settings: {
    //             wet: 0.4,
    //             decay: 4,
    //         },
    //         minValues: {
    //             wet: 0,
    //             decay: 0,
    //         },
    //         maxValues: {
    //             wet: 1,
    //             decay: 10000,
    //         },
    //     }),
    // },
    // {
    //     name: 'StereoWidener',
    //     description: 'Applies a width factor to the mid/side seperation. 0 is all mid and 1 is all side.',
    //     createToneFx: () => (new StereoWidener({
    //         width: 0.5,
    //         wet: 1,
    //     })),
    //     createStateFx: () => ({
    //         name: 'StereoWidener',
    //         settings: {
    //             width: 0.5,
    //             wet: 1,
    //         },
    //         minValues: {
    //             width: 0,
    //             wet: 0,
    //         },
    //         maxValues: {
    //             width: 1,
    //             wet: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'Tremolo',
    //     description: 'Tremolo modulates the amplitude of an incoming signal using an LFO. The effect is a stereo effect where the modulation phase is inverted in each channel.',
    //     createToneFx: () => (new Tremolo({
    //         frequency: 9,
    //         wet: 0.75,
    //         depth: 0.75,
    //     }).start()),
    //     createStateFx: () => ({
    //         name: 'Tremolo',
    //         settings: {
    //             frequency: 9,
    //             wet: 0.75,
    //             depth: 0.75,
    //         },
    //         minValues: {
    //             frequency: 0,
    //             wet: 0,
    //             depth: 0,
    //         },
    //         maxValues: {
    //             frequency: 20000,
    //             wet: 1,
    //             depth: 1,
    //         },
    //     }),
    // },
    // {
    //     name: 'Vibrato',
    //     description: 'A Vibrato effect composed of a Tone.Delay and a Tone.LFO. The LFO modulates the delayTime of the delay, causing the pitch to rise and fall.',
    //     createToneFx: () => (new Vibrato({
    //         frequency: 9,
    //         wet: 0.75,
    //         depth: 0.75,
    //     })),
    //     createStateFx: () => ({
    //         name: 'Vibrato',
    //         settings: {
    //             frequency: 9,
    //             wet: 0.75,
    //             depth: 0.75,
    //         },
    //         minValues: {
    //             frequency: 0,
    //             wet: 0,
    //             depth: 0,
    //         },
    //         maxValues: {
    //             frequency: 20000,
    //             wet: 1,
    //             depth: 1,
    //         },
    //     }),
    // },
    
]

export default addFxList