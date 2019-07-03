import { createVisualTestsByProp } from './visualTestingUtils';

describe('Utils: visual testing', () => {
  describe('createVisualTestsByProp', () => {
    const propName = 'propName';
    const propValues = {
      propValue1: 'propValue1',
      propValue2: 'propValue2',
    };

    const { propValue1, propValue2 } = propValues;

    const itsObject = {
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
      it('should return all visual test scenarios', () => {
        const itsToReturn = createVisualTestsByProp({
          propName,
          propValues,
        });
        expect(itsObject).toEqual(itsToReturn);
      });
    });

    describe('arguments', () => {
      it('should throw an error when propName is invalid', () => {
        const propNameError = 'invalid prop name';

        const itsToReturn = () =>
          createVisualTestsByProp({ propName: '', propValues });
        expect(itsToReturn).toThrow(propNameError);
      });

      it('should throw an error when propValues is invalid', () => {
        const propValuesError = 'invalid prop values';

        const itsToReturn = () =>
          createVisualTestsByProp({ propName, propValues: {} });
        expect(itsToReturn).toThrow(propValuesError);
      });
    });
  });
});
