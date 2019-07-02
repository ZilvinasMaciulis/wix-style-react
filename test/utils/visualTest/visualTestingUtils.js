import React, { PureComponent } from 'react';
import { node } from 'prop-types';

export const createVisualTests = ({ propName, propValues }) => {
  variablesValidation({ propName, propValues });

  const its = { its: [] };

  Object.keys(propValues).forEach(propValue => {
    its.its.push(createTestScenario({ propName, propValue }));
  });

  return its;
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

export const renderChildrenNodes = ({ its }, componentToRender) =>
  its.map(({ props }, i) => (
    <VisualTestComponent key={i}>
      {React.cloneElement(componentToRender, props)}
    </VisualTestComponent>
  ));

class VisualTestComponent extends PureComponent {
  static propTypes = {
    child: node,
  };

  render() {
    return <div style={{ margin: '5px 0' }}>{this.props.children}</div>;
  }
}
