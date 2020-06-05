import {DataPoint} from './models/dataPoint'
import fetch from 'node-fetch';

interface SensorRequest {
  remoteId: string;
  remoteName: string;
  metric: 'drinkingWaterImport';
  unit: 'l';
  readingType: string;
  data: [string, number][]
}

/**
 * Example:
 *
 * {
    "remoteId": "elec-sensor-arduino-03",
    "remoteName": "Electricity",
    "metric": "electricityImport",
    "unit": "kWh",
    "readingType": "counter",
    "data": [
    ["2019-10-17T08:00+0200", 60989.564],
    ["2019-10-18T08:00+0200", 61005.238]
  ]
  }
 * @param dataPoints
 */
const createSensorRequest = (dataPoints: DataPoint[]): SensorRequest => {
  return {
    remoteId: "test-script-1",
    remoteName: 'Water-Automatisch',
    metric: 'drinkingWaterImport',
    unit: 'l',
    readingType: 'counter',
    data: dataPoints.map(p => p.toArray)
  }
}

export const sendSensorValue = async (dataPoint: DataPoint): Promise<void> => {
  const request = createSensorRequest([dataPoint]);
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("No webhook url specified.")
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Something went wrong during sending api request: ${response.statusText}`);
  }
}
