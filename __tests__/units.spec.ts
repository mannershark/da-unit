import { Power, Time } from '../src/unit';

test('Converting power to energy', () => {
    const peakDemand = new Power(100, 'MW');
    const averageDemand = peakDemand.div(10);
    const yearlyEnergyUse = averageDemand.toEnergy(new Time(1, 'year'));

    expect(yearlyEnergyUse.get('MWh')).toEqual(87600);
    expect(peakDemand.get('MW')).toEqual(100);
})
