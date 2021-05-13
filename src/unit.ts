const PowerSym = Symbol('Power');
const EnergySym = Symbol('Energy');
const TimeSym = Symbol('Time');

function clone<T>(orig: T): T {
    return Object.assign(Object.create(Object.getPrototypeOf(orig)), orig)
}

abstract class Unit<T extends Symbol, U> {

    public value: number;

    constructor(
        protected readonly type: T,
        value: number,
        public unit: U
    ) {
        this.value = value * this.constructor['units'][unit];
    }

    plus(other: this) {
        const result = clone(this);
        result.value += other.value;
        return result;
    }

    minus(other: this) {
        const result = clone(this);
        result.value -= other.value;
        return result;
    }

    mul(value: number) {
        const result = clone(this);
        result.value *= value;
        return result;
    }

    div(value: number) {
        const result = clone(this);
        result.value /= value;
        return result;
    }

    /**
     * Retrieve value as specific unit
     */
    get(unit: U) {
        return this.value / this.constructor['units'][unit];
    }

    toString(unit = this.unit) {
        return `${this.get(unit)} ${unit}`;
    }
}

type EnergyUnits = keyof typeof Energy.units;

export class Energy extends Unit<typeof EnergySym, EnergyUnits> {

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
        super(EnergySym, value, unit);
    }

    toPower(time: Time) {
        return new Power(this.value / time.value);
    }
}

type PowerUnits = keyof typeof Power.units;

export class Power extends Unit<typeof PowerSym, PowerUnits> {

    public static units = {
        W: 1,
        kW: 1e3,
        MW: 1e6,
        GW: 1e9,
    };

    constructor(value: number, unit: PowerUnits = 'W') {
        super(PowerSym, value, unit);
    }

    toEnergy(time: Time) {
        return new Energy(this.value * time.value);
    }
}

type TimeUnits = keyof typeof Time.units;

export class Time extends Unit<typeof TimeSym, TimeUnits> {

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
        year: 8760 * 3600
    }

    constructor(value: number, unit: TimeUnits) {
        super(TimeSym, value, unit);
    }
}
