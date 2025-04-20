export type CompressorSettings = {
    attack: number;
    threshold: number;
    knee: number;
    ratio: number;
    release: number;
}

export type EQ3Settings = {
    high: number;
    low: number;
    highFrequency: number;
    lowFrequency: number;
    mid: number;
}

export type FilterSettings = {
    Q: number;
    detune: number;
    frequency: number;
    gain: number;
    type: string;
}

export type GateSettings = {
    threshold: number;
    smoothing: number;
}

export type LimiterSettings = {
    threshold: number;
}