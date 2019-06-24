import { createDescribeObject } from './visualTestingUtils';

describe('Utils: visual testing', () => {
  describe('createDescribeObject', () => {
    const describeName = 'describeName';
    const propName = 'propName';
    const propValues = {
      propValue1: 'propValue1',
      propValue2: 'propValue2',
    };

    const { propValue1, propValue2 } = propValues;

    const describeObject = {
      describe: describeName,
      its: [
        {
          it: propValue1,
          props: { [propName]: propValue1 },
        },
        {
          it: propValue2,
          props: { [propName]: propValue2 },
        },
      ],
    };

    describe('return value', () => {
      it('should be similar to "describeObject" object', () => {
        const describeToReturn = createDescribeObject({
          propName,
          propValues,
          describeName,
        });
        expect(describeToReturn).toEqual(describeObject);
      });
    });

    describe('arguments', () => {
      it('should throw an error when propName is an empty string', () => {
        const propNameError = 'in valid prop name';

        const describeToReturn = () =>
          createDescribeObject({ propName: '', propValues, describeName });
        expect(describeToReturn).toThrow(propNameError);
      });

      it('should throw an error when propValues is an empty object', () => {
        const propValuesError = 'in valid prop values';

        const describeToReturn = () =>
          createDescribeObject({ propName, propValues: {}, describeName });
        expect(describeToReturn).toThrow(propValuesError);
      });

      it('should throw an error when describeName is an empty string', () => {
        const describeNameError = 'in valid describe name';

        const describeToReturn = () =>
          createDescribeObject({ propName, propValues, describeName: '' });
        expect(describeToReturn).toThrow(describeNameError);
      });
    });
  });
});
