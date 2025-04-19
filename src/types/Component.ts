export type FilterSettings = {
    Q: number;
    detune: number;
    frequency: number;
    gain: number;
    type: string;
}

export type GateSettings = {
    threshold: number;
}

export type CompressorSettings = {
    attack: number;
    threshold: number;
    knee: number;
    ratio: number;
}

export type LimiterSettings = {
    threshold: number;
}

export type EQ3Settings = {
    Q: number;
    high: number;
    low: number;
    highFrequency: number;
    lowFrequency: number;
    mid: number;
}