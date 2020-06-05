import {textDetection} from './vision'
import {parseReadingsFromGoogleText} from './parser'
// @ts-ignore
import moment from 'moment'
import * as api from './api'
import {DataPoint} from './models/dataPoint'
import {bucketName, removeFileFromBucket} from './storage'

/**
 * Entry point for Google Function
 */
export const mainHandler = async (data: any, context: any) => {
  const fileName = data.name
  const googleText = await textDetection(`gs://${bucketName}/${fileName}`)
  const reading = parseReadingsFromGoogleText(googleText)
  if (!reading.ok) {
    console.log(`Could not get a proper reading of image '${fileName}'. Value inferred: '${reading.value}'`)
    return
  }
  console.log('Reading value is: ' + reading.value)

  const dataPoint = new DataPoint(moment(), reading.value)

  try {
    await api.sendSensorValue(dataPoint)
    console.log('Sensor data sent.')
  } catch (e) {
    console.error(`Could not send data: ${e.message}`)
  }

  await removeFileFromBucket(fileName);
}





