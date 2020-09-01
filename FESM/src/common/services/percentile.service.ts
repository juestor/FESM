import { MeasurePercentiles, AgeRange, Percentile } from '../model';

import { AbsPercentilesValues } from '../percentiles/abs';
import { GreasyPercentilesValues } from '../percentiles/greasy';
import { PushUpsPercentilesValues } from '../percentiles/push-ups';
import { SitNReachPercentilesValues } from '../percentiles/sit-n-reach';
import { ChestPressPercentilesValues } from '../percentiles/chest-press';
import { LegPressPercentilesValues } from '../percentiles/leg-press';
import { Vo2PercentilesValues } from '../percentiles/vo2';

const getGenderPercentiles = (gender: string, measurePercentiles: MeasurePercentiles[]): AgeRange[] => {
  const result = measurePercentiles
    .find((percentile: MeasurePercentiles) => percentile.gender === gender);
  return result ? result.ageRange : [];
};

const getPercentiles = (age: number, ageRanges: AgeRange[]): Percentile[] => {
  const result = ageRanges
    .find((ageRange: AgeRange) => age >= ageRange.lower && age <= ageRange.higher);
  return result ? result.percentiles : [];
}

const getPercentile = (value: number, percentiles: Percentile[]) : number=> {
  let minValue: number;
  let result: number = 0;

  percentiles
    .forEach((percentile: Percentile) => {
      const minDiff = value - percentile.value;
      const modMinDif = (minDiff < 0) ? (minDiff * -1) : minDiff;

      if (minValue !== undefined) {
        if (modMinDif <= minValue) {
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

const PercentileService = {
  getGreasyPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, GreasyPercentilesValues);
    const ageRangePercentiles = getPercentiles(age, genderPercentiles);
    console.log('gender', gender);
    console.log('age', age);
    console.log('value', value);
    console.log('ageRangePercentiles', ageRangePercentiles);
    return getPercentile(value, ageRangePercentiles);
  },
  getAbsPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, AbsPercentilesValues);

    const ageRangePercentiles = getPercentiles(age, genderPercentiles);

    return getPercentile(value, ageRangePercentiles);
  },
  getPushUpsPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, PushUpsPercentilesValues);

    const ageRangePercentiles = getPercentiles(age, genderPercentiles);

    return getPercentile(value, ageRangePercentiles);
  },
  getSitNReachPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, SitNReachPercentilesValues);

    const ageRangePercentiles = getPercentiles(age, genderPercentiles);

    return getPercentile(value, ageRangePercentiles);
  },
  getChestPressPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, ChestPressPercentilesValues);

    const ageRangePercentiles = getPercentiles(age, genderPercentiles);

    return getPercentile(value, ageRangePercentiles);
  },
  getLegPressPercentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, LegPressPercentilesValues);

    const ageRangePercentiles = getPercentiles(age, genderPercentiles);

    return getPercentile(value, ageRangePercentiles);
  },
  getVo2Percentile: (value: number, age: number, gender: string): number => {
    const genderPercentiles = getGenderPercentiles(gender, Vo2PercentilesValues);

    const ageRangePercentiles = getPercentiles(age, genderPercentiles);
    console.log('gender', gender);
    console.log('age', age);
    console.log('value', value);
    console.log('ageRangePercentiles', ageRangePercentiles);
    return getPercentile(value, ageRangePercentiles);
  },
}

export default PercentileService;