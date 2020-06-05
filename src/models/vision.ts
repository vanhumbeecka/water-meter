/**
 * Interfaces used in Google Vision API results
 */
export interface IPoint2D {
  x: number;
  y: number;
}

export interface IPoint3D {
  x: number;
  y: number;
  z: number;
}

export interface IFaceFeature {
  type: string;
  position: IPoint3D;
}

export interface IVertex2Array {
  vertices: IPoint2D[];
  normalizedVertices?: any;
}

/**
 * Not sure if this is complete
 */
type StringLikelihood = "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";

export interface IFaceAnnotation {
  landmark: IFaceFeature[];
  boundingPoly: any[];
  fdBoundingPoly: any[];
  rollAngle: number;
  panAngle: number;
  tiltAngle: number;
  detectionConfidence: number;
  landmarkingConfidence: number;
  joyLikelihood: StringLikelihood;
  sorrowLikelihood: StringLikelihood;
  angerLikelihood: StringLikelihood;
  surpriseLikelihood: StringLikelihood;
  underExposedLikelihood: StringLikelihood;
  blurredLikelihood: StringLikelihood;
  headwearLikelihood: StringLikelihood;
}

export interface ILabelAnnotations {
  locations: any[];
  properties: any[];
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly: any;
}

export interface IApiVisionResponse {
  faceAnnotations: IFaceAnnotation[];
  landmarkAnnotations: any[];
  logoAnnotations: any[];
  labelAnnotations: ILabelAnnotations[];
  textAnnotations: any[];
  localizedObjectAnnotations: any[];
  safeSearchAnnotation: any;
  imagePropertiesAnnotation: any;
  error: any;
  cropHintsAnnotation: any;
  fullTextAnnotation: any;
  webDetection: any;
  productSearchResults: any;
  context: any;
}
