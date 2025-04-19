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