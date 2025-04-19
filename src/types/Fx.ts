import { AutoFilter, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Distortion, FeedbackDelay, Freeverb, FrequencyShifter, JCReverb, Phaser, PingPongDelay, PitchShift, Reverb, StereoWidener, Tremolo, Vibrato } from "tone";

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
    Vibrato
)


export type StateFx = {
    name: string;
    settings: (
        AutoFilterSettings | 
        BitCrusherSettings |
        DistortionSettings |
        FrequencyShifterSettings |
        PingPongDelaySettings |
        StereoWidenerSettings
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