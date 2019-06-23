import { createDescribeObject } from './visualTestingUtils';

describe('Utils: visual testing', () => {
  describe('"describe" object', () => {
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

    it('should create a similar describe object to "describeObject" ', () => {
      const describeToReturn = createDescribeObject({
        propName,
        propValues,
        describeName,
      });
      expect(describeToReturn).toEqual(describeObject);
    });
  });
});
