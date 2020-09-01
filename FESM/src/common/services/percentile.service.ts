import { GreasyPercentilesValues } from '../percentiles/greasy';
import { MeasurePercentiles, AgeRange, Percentile } from '../model';


const PercentileService = {
  getGreasyPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = GreasyPercentilesValues
      .find((percentile: MeasurePercentiles) => percentile.gender === gender);

    const ageRangePercentiles = genderPercentiles?.ageRange
      .find((ageRange: AgeRange) => age >= ageRange.lower && age <= ageRange.higher);

    let minValue: number;
    let result: number = 0;

    ageRangePercentiles?.percentiles
      .forEach((percentile: Percentile) => {
        const minDiff = value - percentile.value;
        const modMinDif = (minDiff < 0) ? (minDiff * -1) : minDiff;

        if (minValue) {
          if (modMinDif < minValue) {
            minValue = modMinDif;
            result = percentile.percentile;
          }
        } else {
          minValue = modMinDif;
          result = percentile.percentile;
        }
      }
    );

    return result;
  }
}

export default PercentileService;