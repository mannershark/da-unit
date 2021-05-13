declare const PowerSym: unique symbol;
declare const EnergySym: unique symbol;
declare const TimeSym: unique symbol;
declare abstract class Unit<T extends Symbol> {
    protected readonly type: T;
    value: number;
    constructor(type: T, value: number);
    plus(other: Unit<T>): void;
    minus(other: Unit<T>): void;
    mul(other: Unit<T>): void;
    div(other: Unit<T>): void;
}
declare type EnergyUnits = keyof typeof Energy.units;
export declare class Energy extends Unit<typeof EnergySym> {
    static units: {
        J: number;
        kJ: number;
        MJ: number;
        GJ: number;
        Wh: number;
        kWh: number;
        MWh: number;
    };
    constructor(value: number, unit?: EnergyUnits);
    get(unit: EnergyUnits): number;
    toPower(time: Time): Power;
}
declare type PowerUnits = keyof typeof Power.units;
export declare class Power extends Unit<typeof PowerSym> {
    static units: {
        W: number;
        kW: number;
        MW: number;
        GW: number;
    };
    constructor(value: number, unit?: PowerUnits);
    get(unit: PowerUnits): number;
    toEnergy(time: Time): Energy;
}
declare type TimeUnits = keyof typeof Time.units;
export declare class Time extends Unit<typeof TimeSym> {
    static units: {
        ms: number;
        millisecond: number;
        s: number;
        second: number;
        min: number;
        '\'': number;
        minute: number;
        h: number;
        '"': number;
        hour: number;
        d: number;
        day: number;
        week: number;
        year: number;
    };
    constructor(value: number, unit: TimeUnits);
    get(unit: TimeUnits): number;
}
export {};
