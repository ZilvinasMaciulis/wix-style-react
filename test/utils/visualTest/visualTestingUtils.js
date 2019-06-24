export const createDescribeObject = ({
  propName = '',
  propValues = {},
  describeName = '',
}) => {
  variablesValidation({ propName, propValues, describeName });

  const describeToReturn = { describe: describeName, its: [] };

  Object.keys(propValues).map(propValue => {
    const testScenario = { it: propValue, props: { [propName]: propValue } };
    describeToReturn.its.push(testScenario);
  });

  return describeToReturn;
};

const variablesValidation = ({ propName, propValues, describeName }) => {
  const propNameError = 'in valid prop name';
  const propValuesError = 'in valid prop values';
  const describeNameError = 'in valid describe name';

  if (propName === '') {
    throw new Error(propNameError);
  }

  if (Object.keys(propValues).length === 0) {
    throw new Error(propValuesError);
  }

  if (describeName === '') {
    throw new Error(describeNameError);
  }
};
