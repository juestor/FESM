export interface MeasurePercentiles {
  gender: string,
  ageRange: AgeRange[]
}

export interface AgeRange {
  lower: number,
  higher: number,
  percentiles: Percentile[]
}

export interface Percentile {
  percentile: number,
  value: number
}