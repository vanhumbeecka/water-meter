import moment from "moment";

export class DataPoint {

  constructor(private date: moment.Moment,
              private value: number) {
  }

  get toArray(): [string, number] {
    // ISO 8601 format
    return [this.date.format(), this.value];
  }
}
