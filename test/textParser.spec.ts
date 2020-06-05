import {parseReadingsFromGoogleText} from '../src/parser'
import {expect} from 'chai'

describe('text parser', () => {

  it('should correctly parse readings from google results', () => {
    const input = 'IL\n' +
      'maddalena\n' +
      'CE OUTROMAAT MERE EE NEL\n' +
      'M15\n' +
      '0 0 2 7:3:3\n' +
      'TL15\n' +
      'm3\n' +
      'MVM\n' +
      '1383\n' +
      '9\n' +
      '03=4.0 m/h\n' +
      'R=160\n' +
      'MAP 16 bar\n' +
      'T50,0000\n' +
      'AP83\n' +
      '* 0.000\n' +
      '6 5\n'

    // Act
    const output= parseReadingsFromGoogleText(input)

    // Assert
    expect(output.ok).to.be.true;
    expect(output.value).to.equal(273);
  });
})
