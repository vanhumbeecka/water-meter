import {textDetection} from '../vision'
import {parseReadingsFromGoogleText} from '../parser'
import {DataPoint} from '../models/dataPoint'
import moment from 'moment'

const main = async () => {
  const filePath = './data/water-meter.jpg'
  const googleText = await textDetection(filePath)
  console.log(googleText);

  const reading = parseReadingsFromGoogleText(googleText)
  if (!reading.ok) {
    console.log('Could not get a proper reading of image. Value: ' + reading.value)
    return
  }

  const dataPoint = new DataPoint(moment(), reading.value)
  console.log(dataPoint)
}

main();
