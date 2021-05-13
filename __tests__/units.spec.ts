import { Power, Time } from '../src/unit';

test('Converting power to energy', () => {
    const peakDemand = new Power(100, 'MW');
    const averageDemand = peakDemand.div(10);
    const yearlyEnergyUse = averageDemand.toEnergy(new Time(1, 'year'));

    expect(peakDemand.toString()).toEqual('100 MW');
    expect(yearlyEnergyUse.get('MWh')).toEqual(87600);
    expect(yearlyEnergyUse.toString('MWh')).toEqual('87600 MWh');
})
