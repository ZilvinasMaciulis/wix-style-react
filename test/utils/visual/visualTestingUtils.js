import React, { PureComponent } from 'react';
import { node } from 'prop-types';

export const createVisualTestsByProp = ({ propName, propValues }) => {
  variablesValidation({ propName, propValues });

  const describe = { its: [] };

  Object.keys(propValues).forEach(propValue => {
    describe.its.push(createTestScenario({ propName, propValue }));
  });

  return describe;
};

const createTestScenario = ({ propName, propValue }) => {
  return { it: propValue, props: { [propName]: propValue } };
};

const variablesValidation = ({ propName, propValues }) => {
  const propNameError = 'invalid prop name';
  const propValuesError = 'invalid prop values';

  if (!propName) {
    throw new Error(propNameError);
  }

  if (!propValues || !Object.keys(propValues).length) {
    throw new Error(propValuesError);
  }
};

export const renderTestComponents = ({ its }, componentToRender) =>
  its.map(({ props }, i) => (
    <VisualTestComponent key={i}>
      {React.cloneElement(componentToRender, props)}
    </VisualTestComponent>
  ));

class VisualTestComponent extends PureComponent {
  static propTypes = {
    children: node,
  };

  render() {
    return <div style={{ margin: '5px 0' }}>{this.props.children}</div>;
  }
}
