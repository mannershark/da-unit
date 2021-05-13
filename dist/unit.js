"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = exports.Power = exports.Energy = void 0;
const PowerSym = Symbol('Power');
const EnergySym = Symbol('Energy');
const TimeSym = Symbol('Time');
class Unit {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    plus(other) {
        this.value += other.value;
    }
    minus(other) {
        this.value -= other.value;
    }
    mul(other) {
        this.value *= other.value;
    }
    div(other) {
        this.value /= other.value;
    }
}
class Energy extends Unit {
    constructor(value, unit = 'J') {
        super(EnergySym, value * Energy.units[unit]);
    }
    get(unit) {
        return this.value / Energy.units[unit];
    }
    toPower(time) {
        return new Power(this.value / time.value);
    }
}
exports.Energy = Energy;
Energy.units = {
    J: 1,
    kJ: 1e3,
    MJ: 1e6,
    GJ: 1e9,
    Wh: 3.6e3,
    kWh: 3.6e6,
    MWh: 3.6e9,
};
class Power extends Unit {
    constructor(value, unit = 'W') {
        super(PowerSym, value * Power.units[unit]);
    }
    get(unit) {
        return this.value / Power.units[unit];
    }
    toEnergy(time) {
        return new Energy(this.value * time.value);
    }
}
exports.Power = Power;
Power.units = {
    W: 1,
    kW: 1e3,
    MW: 1e6,
    GW: 1e9,
};
class Time extends Unit {
    constructor(value, unit) {
        super(TimeSym, value * Time.units[unit]);
    }
    get(unit) {
        return this.value / Time.units[unit];
    }
}
exports.Time = Time;
Time.units = {
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
};
