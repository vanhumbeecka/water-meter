const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

export const textDetection = async (filePath: string): Promise<string> => {
  const [result] = await client.documentTextDetection(filePath);
  const fullTextAnnotation = result.fullTextAnnotation;

  return fullTextAnnotation ? fullTextAnnotation.text : "";
}
