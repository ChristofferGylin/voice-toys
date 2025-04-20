import { AutoFilter, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Compressor, Distortion, EQ3, FeedbackDelay, Filter, Freeverb, FrequencyShifter, Gate, JCReverb, Limiter, Phaser, PingPongDelay, PitchShift, Reverb, StereoWidener, Tremolo, Vibrato } from "tone";
import { CompressorSettings, EQ3Settings, FilterSettings, GateSettings, LimiterSettings } from "./Component";

export type AddFxType = {
    name: string;
    description: string;
    createToneFx: () => ToneFx;
    createStateFx: () => StateFx;
}

export type ToneFx = (
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
)


export type StateFx = {
    name: string;
    settings: (
        AutoFilterSettings | 
        BitCrusherSettings |
        DistortionSettings |
        FrequencyShifterSettings |
        PingPongDelaySettings |
        StereoWidenerSettings |
        AutoPannerSettings |
        ChebyshevSettings |
        FeedbackDelaySettings |
        JCReverbSettings |
        PitchShiftSettings |
        TremoloSettings |
        AutoWahSettings |
        ChorusSettings |
        FreeverbSettings |
        PhaserSettings |
        ReverbSettings |
        VibratoSettings |
        FilterSettings |
        GateSettings |
        CompressorSettings |
        LimiterSettings |
        EQ3Settings
    );
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
    baseFrequency: 50,
    octaves: 6,
    sensitivity: -30
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