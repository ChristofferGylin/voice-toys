import { AutoFilter, AutoWah, BitCrusher, Chebyshev, Chorus, Compressor, Distortion, EQ3, FeedbackDelay, Filter, Freeverb, FrequencyShifter, Gate, JCReverb, Limiter, Phaser, PingPongDelay, PitchShift, Reverb, StereoWidener, Tremolo, Vibrato } from "tone";
import { assertsAutoFilter, assertsAutoWah, assertsBitCrusher, assertsChebyshev, assertsChorus, assertsCompressor, assertsDistortion, assertsEQ3, assertsFeedbackDelay, ToneFx, type AddFxType } from "../types/Fx";
import { v4 as uuidv4 } from "uuid"

const addFxList: AddFxType[] = [
    {
        name: 'AutoFilter',
        description: 'AutoFilter is a Tone.Filter with a Tone.LFO connected to the filter cutoff frequency. Setting the LFO rate and depth allows for control over the filter modulation rate and depth.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsAutoFilter(tnFx)
                    return [
                        (value: number) => {tnFx.set({depth: value})},
                        (value: number) => {tnFx.set({frequency: value})},
                        (value: number) => {tnFx.set({wet: value})},
                        (value: number) => {tnFx.set({baseFrequency: value})},
                        (value: number) => {tnFx.set({octaves: value})}
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx
                    assertsAutoFilter(tnFx)
                    const {depth, frequency, wet, baseFrequency, octaves} = tnFx.get()

                    return [
                        { name: 'depth', min: 0, max: 1, value: Number(depth) },
                        { name: 'frequency', min: 0.1, max: 10, value: Number(frequency) },
                        { name: 'wet', min: 0, max: 1, value: Number(wet) },
                        { name: 'baseFrequency', min: 20, max: 5000, value: Number(baseFrequency) },
                        { name: 'octaves', min: 0.1, max: 4, value: Number(octaves) },
                    ]
                },
                fx: new AutoFilter({
                    depth: 1,
                    frequency: 2,
                    wet: 1,
                    baseFrequency: 400,
                    octaves: 2,
                }).start()
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsAutoFilter(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'AutoFilter',
            }
        },
    },
    {
        name: 'AutoWah',
        description: 'AutoWah connects a Follower to a Filter. The frequency of the filter, follows the input amplitude curve. Inspiration from Tuna.js.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsAutoWah(tnFx)
                    return [
                        (value: number) => {tnFx.set({Q: value})},
                        (value: number) => {tnFx.set({gain: value})},
                        (value: number) => {tnFx.set({wet: value})},
                        (value: number) => {tnFx.set({baseFrequency: value})},
                        (value: number) => {tnFx.set({octaves: value})},
                        (value: number) => {tnFx.set({sensitivity: value})}
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsAutoWah(tnFx)

                    const {Q, gain, wet, baseFrequency, octaves, sensitivity} = tnFx.get()

                    return [
                        { name: 'Q', min: 1, max: 10, value: Number(Q) },
                        { name: 'gain', min: 0, max: 20, value: Number(gain) },
                        { name: 'wet', min: 0, max: 1, value: Number(wet) },
                        { name: 'baseFrequency', min: 50, max: 800, value: Number(baseFrequency) },
                        { name: 'octaves', min: 1, max: 4, value: Number(octaves) },
                        { name: 'sensitivity', min: -35, max: -5, value: Number(sensitivity) },
                    ]
                },
                fx: new AutoWah({
                    Q: 3,
                    gain: 5,
                    baseFrequency: 300,
                    octaves: 2,
                    sensitivity: -30
                })
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsAutoWah(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'AutoWah',
            }
        },
    },
    {
        name: 'BitCrusher',
        description: 'BitCrusher down-samples the incoming signal to a different bit depth. Lowering the bit depth of the signal creates distortion.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsBitCrusher(tnFx)
                    return [
                        (value: number) => {tnFx.set({bits: value})},
                        (value: number) => {tnFx.set({wet: value})},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsBitCrusher(tnFx)

                    const {bits, wet} = tnFx.get()

                    return [
                        { name: 'bits', min: 4, max: 12, value: Number(bits) },
                        { name: 'wet', min: 0, max: 1, value: Number(wet) },
                    ]
                },
                fx: new BitCrusher(5).set({wet: 0.5})
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsBitCrusher(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'BitCrusher',
            }
        },
    },
    {
        name: 'Chebyshev',
        description: 'Chebyshev is a waveshaper which is good for making different types of distortion sounds. Note that odd orders sound very different from even ones, and order = 1 is no change.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsChebyshev(tnFx)
                    return [
                        (value: number) => { tnFx.set({ order: Math.max(1, Math.round(value)) }) },
                        (value: number) => {tnFx.set({wet: value})},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsChebyshev(tnFx)

                    const {order, wet} = tnFx.get()

                    return [
                        { name: 'order', min: 1, max: 50, value: Number(order) },
                        { name: 'wet', min: 0, max: 1, value: Number(wet) },
                    ]
                },
                fx: new Chebyshev(50),
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsChebyshev(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'Chebyshev',
            }
        },
    },
    {
        name: 'Chorus',
        description: 'Chorus is a stereo chorus effect composed of a left and right delay with an LFO applied to the delayTime of each channel. When feedback is set to a value larger than 0, you also get Flanger-type effects. Inspiration from Tuna.js.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsChorus(tnFx)
                    return [
                        (value: number) => {tnFx.set({frequency: value})},
                        (value: number) => {tnFx.set({wet: value})},
                        (value: number) => {tnFx.set({delayTime: value})},
                        (value: number) => {tnFx.set({depth: value})},
                        (value: number) => {tnFx.set({spread: value})},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsChorus(tnFx)

                    const {frequency, wet, delayTime, depth, spread} = tnFx.get()

                    return [
                        { name: 'frequency', min: 0.3, max: 5, value: Number(frequency) },
                        { name: 'wet', min: 0, max: 1, value: Number(wet) },
                        { name: 'delayTime', min: 4, max: 15, value: Number(delayTime) },
                        { name: 'depth', min: 0, max: 1, value: Number(depth) },
                        { name: 'spread', min: 0, max: 180, value: Number(spread) },
                    ]
                },
                fx: new Chorus({
                    frequency: 1.5,
                    delayTime: 10,
                    depth: 0.5,
                    wet: 0.4,
                    spread: 90,
                  }).start(),
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsChorus(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'Chorus',
            }
        },
    },
    {
        name: 'Compressor',
        description: 'Compressor is a thin wrapper around the Web Audio DynamicsCompressorNode. Compression reduces the volume of loud sounds or amplifies quiet sounds by narrowing or "compressing" an audio signals dynamic range.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsCompressor(tnFx)
                    return [
                        (value: number) => {tnFx.set({threshold: value})},
                        (value: number) => {tnFx.set({ratio: value})},
                        (value: number) => {tnFx.set({attack: value})},
                        (value: number) => {tnFx.set({release: value})},
                        (value: number) => {tnFx.set({knee: value})},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsCompressor(tnFx)

                    const {threshold, ratio, attack, release, knee} = tnFx.get()

                    return [
                        { name: 'threshold', min: -60, max: -20, value: Number(threshold) },
                        { name: 'ratio', min: 2, max: 6, value: Number(ratio) },
                        { name: 'attack', min: 0.003, max: 0.03, value: Number(attack) },
                        { name: 'release', min: 0.1, max: 0.5, value: Number(release) },
                        { name: 'knee', min: 6, max: 12, value: Number(knee) },
                    ]
                },
                fx: new Compressor({
                    threshold: -30,
                    ratio: 3,
                    attack: 0.01,
                    release: 0.25,
                    knee: 10   
                  }),
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsCompressor(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'Compressor',
            }
        },
    },
    {
        name: 'Distortion',
        description: 'A simple distortion effect using Tone.WaveShaper.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsDistortion(tnFx)
                    return [
                        (value: number) => {tnFx.set({distortion: value})},
                        (value: number) => {tnFx.set({wet: value})},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsDistortion(tnFx)

                    const {distortion, wet} = tnFx.get()

                    return [
                        { name: 'distortion', min: 0, max: 1, value: Number(distortion) },
                        { name: 'wet', min: 0, max: 1, value: Number(wet) },
                    ]
                },
                fx: new Distortion({
                    distortion: 0.15,
                    wet: 1,   
                  }),
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsDistortion(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'Distortion',
            }
        },
    },
    {
        name: 'EQ3',
        description: 'EQ3 provides 3 equalizer bins: Low/Mid/High.',
        createToneFx: () => {
            
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsEQ3(tnFx)
                    return [
                        (value: number) => {tnFx.set({low: value})},
                        (value: number) => {tnFx.set({mid: value})},
                        (value: number) => {tnFx.set({high: value})},
                        (value: number) => {tnFx.set({lowFrequency: value})},
                        (value: number) => {tnFx.set({highFrequency: value})},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsEQ3(tnFx)

                    const {low, mid, high, lowFrequency, highFrequency} = tnFx.get()

                    return [
                        { name: 'low', min: -15, max: 6, value: Number(low) },
                        { name: 'mid', min: -12, max: 6, value: Number(mid) },
                        { name: 'high', min: -12, max: 6, value: Number(high) },
                        { name: 'lowFrequency', min: 60, max: 500, value: Number(lowFrequency) },
                        { name: 'highFrequency', min: 2000, max: 8000, value: Number(highFrequency) },
                    ]
                },
                fx: new EQ3({
                    low: 0,
                    mid: 0,
                    high: 0,
                    lowFrequency: 120,
                    highFrequency: 4000 
                  }),
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsEQ3(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'EQ3',
            }
        },
    },
    {
        name: 'FeedbackDelay',
        description: 'FeedbackDelay is a DelayNode in which part of output signal is fed back into the delay.',
        createToneFx: () => {
            return {
                id: uuidv4(),
                getSetters: function () {

                    const tnFx = this.fx

                    assertsFeedbackDelay(tnFx)

                    return [
                        (value: number) => {tnFx.wet.value = value},
                        (value: number) => {tnFx.feedback.value = value},
                        (value: number) => {tnFx.delayTime.value = value},
                    ]
                },
                getParams: function () {

                    const tnFx = this.fx

                    assertsFeedbackDelay(tnFx)

                    return [
                        { name: 'wet', min: 0, max: 1, value: Number(tnFx.wet.value) },
                        { name: 'feedback', min: 0, max: 1, value: Number(tnFx.feedback.value) },
                        { name: 'delayTime', min: 0, max: 100, value: Number(tnFx.delayTime.value) },
                    ]
                },
                fx: new FeedbackDelay({
                    feedback: 0.4,
                    wet: 0.5,
                    delayTime: 100,
                })
            }
        },
        createStateFx: (tnFx: ToneFx) => {

            assertsFeedbackDelay(tnFx.fx)

            return {
                id: tnFx.id,
                name: 'FeedbackDelay',
            }
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
    //         },
    //         minValues: {
    //             Q: 0,
    //             detune: 0,
    //             frequency: 0,
    //             gain: 1,
    //         },
    //         maxValues: {
    //             Q: 1,
    //             detune: 1,
    //             frequency: 20000,
    //             gain: 1,
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