# da-unit

Da-unit provides statically typed units for Energy, Power and Time,
so you will never mix up MW with MWh again.

**Installation**

```
npm install da-unit
```

**Example** 

```
import { Power, Time } from 'da-unit';

const peakDemand = new Power(100, 'MW');
const averageDemand = peakDemand.div(10);
const yearlyEnergyUse = averageDemand.toEnergy(new Time(1, 'year'));

console.log(yearlyEnergyUse.get('MWh')); // 87600
```