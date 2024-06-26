import { CNP } from '../index'
import { describe, expect, test } from '@jest/globals'

Date.now = () => new Date("2024-05-13T12:33:37.000Z").getTime();

describe.each([
  // cnp, isValid, birthDate, yy, birthPlace, gender, ageInYears, hasIdentityCard, serialNumber, cnpOut
  ['123', false, 'Invalid date', 'Invalid date', null, '', null, false, '', 'Invalid CNP'],
  ['x5110102441483', false, 'Invalid date', 'Invalid date', null, '', null, false, '', 'Invalid CNP'],
  ['511010244x1483', false, 'Invalid date', 'Invalid date', null, '', null, false, '', 'Invalid CNP'],
  ['5110102441483', true, '2011-01-02', '11', 'București - Sector 4', 'male', 13, false, '148', '5110102441483'],
  ['6140101070075', true, '2014-01-01', '14', 'Botoșani', 'female', 10, false, '007', '6140101070075'],
  ['3970908055828', true, '1897-09-08', '97', 'Bihor', 'male', 126, true, '582', '3970908055828'],
  ['2970702435244', true, '1997-07-02', '97', 'București - Sector 3', 'female', 26, true, '524', '2970702435244'],
  // he was not born
  ['6990504015905', true, '2099-05-04', '99', 'Alba', 'female', -75, false, '590', '6990504015905'],
  // resident
  ['9990504015919', true, '1999-05-04', '99', 'Alba', '', 25, true, '591', '9990504015919'],
  // check sum
  ['1850611212751', true, '1985-06-11', '85', 'Ialomița', 'male', 38, true, '275', '1850611212751'],
])(
  '.try to validate CNP %s',
  (cnp, isValid, birthDate, yy, birthPlace, gender, ageInYears, hasIdentityCard, serialNumber, cnpOut) => {
    const cnpObj = new CNP(cnp)

    test(`isValid() method return '${isValid}'`, () => {
      expect(cnpObj.isValid()).toBe(isValid)
    })

    test(`getBirthDate() method return '${birthDate}'`, () => {
      expect(cnpObj.getBirthDate()).toBe(birthDate)
    })

    test(`getBirthPlace() method return '${birthPlace}'`, () => {
      expect(cnpObj.getBirthPlace()).toBe(birthPlace)
    })

    test(`getGender() method return '${gender}'`, () => {
      expect(cnpObj.getGender()).toBe(gender)
    })

    test(`getAgeInYears() method return '${ageInYears}'`, () => {
      expect(cnpObj.getAgeInYears()).toBe(ageInYears)
    })

    test(`hasIdentityCard() method return '${hasIdentityCard}'`, () => {
      expect(cnpObj.hasIdentityCard()).toBe(hasIdentityCard)
    })

    test(`getSerialNumberFromCNP() method return '${serialNumber}'`, () => {
      expect(cnpObj.getSerialNumberFromCNP()).toBe(serialNumber)
    })

    test(`cnp getter method return '${cnp}'`, () => {
      expect(cnpObj.cnp).toBe(cnpOut)
    })

    cnpObj.cnp = cnp
    test(`after using set isValid() method return '${isValid}'`, () => {
      expect(cnpObj.isValid()).toBe(isValid)
    })

    test(`after using set getBirthDate('YY') method return '${yy}'`, () => {
      expect(cnpObj.getBirthDate('YY')).toBe(yy)
    })
  },
)
