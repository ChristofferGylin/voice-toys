import { AutoFilter, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Compressor, Distortion, EQ3, FeedbackDelay, Filter, Freeverb, FrequencyShifter, Gate, JCReverb, Limiter, Phaser, PingPongDelay, PitchShift, Reverb, StereoWidener, Tremolo, Vibrato } from "tone";
// import { CompressorSettings, EQ3Settings, FilterSettings, GateSettings, LimiterSettings } from "./Component";

export function assertsAutoFilter (fxInstance: any): asserts fxInstance is AutoFilter {
    if (fxInstance.name !== 'AutoFilter') {
        throw new TypeError('Fx is not an instance of AutoFilter')
    }
}

export function assertsAutoWah (fxInstance: any): asserts fxInstance is AutoWah {
    if (fxInstance.name !== 'AutoWah') {
        throw new TypeError(`Fx is not an instance of AutoWah`)
    }
}

export function assertsFeedbackDelay (fxInstance: any): asserts fxInstance is FeedbackDelay {
    if (fxInstance.name !== 'FeedbackDelay') {
        throw new TypeError('Fx is not an instance of FeedbackDelay')
    }
}

export function assertsBitCrusher (fxInstance: any): asserts fxInstance is BitCrusher {
    if (fxInstance.name !== 'BitCrusher') {
        throw new TypeError('Fx is not an instance of BitCrusher')
    }
}

export function assertsChebyshev (fxInstance: any): asserts fxInstance is Chebyshev {
    if (fxInstance.name !== 'Chebyshev') {
        throw new TypeError('Fx is not an instance of Chebyshev')
    }
}

export function assertsChorus (fxInstance: any): asserts fxInstance is Chorus {
    if (fxInstance.name !== 'Chorus') {
        throw new TypeError('Fx is not an instance of Chorus')
    }
}

export function assertsCompressor (fxInstance: any): asserts fxInstance is Compressor {
    if (fxInstance.name !== 'Compressor') {
        throw new TypeError('Fx is not an instance of Compressor')
    }
}

export function assertsDistortion (fxInstance: any): asserts fxInstance is Distortion {
    if (fxInstance.name !== 'Distortion') {
        throw new TypeError('Fx is not an instance of Distortion')
    }
}

export function assertsEQ3 (fxInstance: any): asserts fxInstance is EQ3 {
    if (fxInstance.name !== 'EQ3') {
        throw new TypeError('Fx is not an instance of EQ3')
    }
}

export function assertsFilter (fxInstance: any): asserts fxInstance is Filter {
    if (fxInstance.name !== 'Filter') {
        throw new TypeError('Fx is not an instance of Filter')
    }
}

export function assertsFreeverb (fxInstance: any): asserts fxInstance is Freeverb {
    if (fxInstance.name !== 'Freeverb') {
        throw new TypeError('Fx is not an instance of Freeverb')
    }
}

export type AddFxType = {
    name: string;
    description: string;
    createToneFx: () => ToneFx;
    createStateFx: (tnFx: ToneFx) => StateFx;
}

export type StateParams = {
    name: string;
    min: number;
    max: number;
    value: number;
}

export type ToneFx = {
    id: string;
    fx: (
        AutoFilter |
        BitCrusher |
        Distortion |
        FrequencyShifter |
        PingPongDelay |
        StereoWidener |
        AutoPanner |
        Chebyshev |
        FeedbackDelay |
        JCReverb |
        PitchShift |
        Tremolo |
        AutoWah |
        Chorus |
        Freeverb |
        Phaser |
        Reverb |
        Vibrato |
        Filter |
        Gate |
        Compressor |
        Limiter |
        EQ3
    );
    getSetters: () => ((value: number) => void)[];
    getParams: () => StateParams[];
}

export type StateFx = {
    name: 'AutoFilter' |
    'BitCrusher' |
    'Distortion' |
    'FrequencyShifter' |
    'PingPongDelay' |
    'StereoWidener' |
    'AutoPanner' |
    'Chebyshev' |
    'FeedbackDelay' |
    'JCReverb' |
    'PitchShift' |
    'Tremolo' |
    'AutoWah' |
    'Chorus' |
    'Freeverb' |
    'Phaser' |
    'Reverb' |
    'Vibrato' |
    'Filter' |
    'Gate' |
    'Compressor' |
    'Limiter' |
    'EQ3'
    id: string;
}

export type AutoFilterSettings = {
    depth: number;
    frequency: number;
    wet: number;
    baseFrequency: number;
    octaves: number;
}

export type  BitCrusherSettings = {
    bits: number;
    wet: number;
}

export type DistortionSettings = {
    wet: number;
    distortion: number;
}

export type FrequencyShifterSettings = {
    wet: number;
    frequency: number;
}

export type PingPongDelaySettings = {
    feedback: number;
    wet: number;
    delayTime: number;
}

export type StereoWidenerSettings = {
    width: number;
    wet: number;
}

export type AutoPannerSettings = {
    depth: number;
    frequency: number;
    wet: number;
}

export type ChebyshevSettings = {
    wet: number;
    order: number;
}

export type FeedbackDelaySettings = {
    feedback: number;
    wet: number;
    delayTime: number;
}

export type JCReverbSettings = {
    wet: number;
    roomSize: number;
}

export type PitchShiftSettings = {
    feedback: number;
    wet: number;
    delayTime: number;
    pitch: number;
}

export type TremoloSettings = {
    frequency: number;
    wet: number;
    depth: number;
}

export type AutoWahSettings = {
    Q: number;
    gain: number;
    wet: number;
    baseFrequency: number,
    octaves: number,
    sensitivity: number
}

export type ChorusSettings = {
    frequency: number;
    delayTime: number;
    depth: number;
    wet: number;
    feedback: number;
}

export type FreeverbSettings = {
    wet: number;
    roomSize: number;
    dampening: number;
}

export type PhaserSettings = {
    Q: number;
    frequency: number;
    octaves: number;
    baseFrequency: number;
    wet: number;
}

export type ReverbSettings = {
    wet: number;
    decay: number;
}

export type VibratoSettings = {
    frequency: number;
    wet: number;
    depth: number;
}