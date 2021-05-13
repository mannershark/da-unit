const PowerSym = Symbol('Power');
const EnergySym = Symbol('Energy');
const TimeSym = Symbol('Time');

abstract class Unit<T extends Symbol> {
    constructor(
        protected readonly type: T,
        public value: number
    ) { }

    plus(other: Unit<T>) {
        this.value += other.value;
    }

    minus(other: Unit<T>) {
        this.value -= other.value;
    }

    mul(other: Unit<T>) {
        this.value *= other.value;
    }

    div(other: Unit<T>) {
        this.value /= other.value;
    }

}

type EnergyUnits = keyof typeof Energy.units;

export class Energy extends Unit<typeof EnergySym> {

    public static units = {
        J: 1,
        kJ: 1e3,
        MJ: 1e6,
        GJ: 1e9,
        Wh: 3.6e3,
        kWh: 3.6e6,
        MWh: 3.6e9,
    };

    constructor(value: number, unit: EnergyUnits = 'J') {
        super(EnergySym, value * Energy.units[unit]);
    }

    get(unit: EnergyUnits) {
        return this.value / Energy.units[unit];
    }

    toPower(time: Time) {
        return new Power(this.value / time.value)
    }
}

type PowerUnits = keyof typeof Power.units;

export class Power extends Unit<typeof PowerSym> {

    public static units = {
        W: 1,
        kW: 1e3,
        MW: 1e6,
        GW: 1e9,
    };

    constructor(value: number, unit: PowerUnits = 'W') {
        super(PowerSym, value * Power.units[unit]);
    }

    get(unit: PowerUnits) {
        return this.value / Power.units[unit];
    }

    toEnergy(time: Time) {
        return new Energy(this.value * time.value);
    }
}

type TimeUnits = keyof typeof Time.units;

export class Time extends Unit<typeof TimeSym> {

    public static units = {
        ms: 1e-3,
        millisecond: 1e-3,
        s: 1,
        second: 1,
        min: 60,
        '\'': 60,
        minute: 60,
        h: 3600,
        '\"': 3600,
        hour: 3600,
        d: 24 * 3600,
        day: 24 * 3600,
        week: 168 * 3600,
        year: 8766 * 3600
    }

    constructor(value: number, unit: TimeUnits) {
        super(TimeSym, value * Time.units[unit]);
    }

    get(unit: TimeUnits) {
        return this.value / Time.units[unit];
    }
}