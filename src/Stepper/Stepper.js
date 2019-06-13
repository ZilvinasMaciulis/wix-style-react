/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import * as Consts from './Consts';
import styles from './Stepper.st.css';

/** Stepper */
class Stepper extends React.PureComponent {
  static displayName = 'Stepper';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,
    /** Callback to be triggered on step click */
    onClick: PropTypes.func,
    /** Id of the active step */
    activeStep: PropTypes.number.isRequired,
    /** Array of steps, each step should have at least text. If no status is passed, step's status is set to default  */
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['completed', 'disabled', 'default', 'error']),
      }),
    ).isRequired,
  };

  static defaultProps = {
    onClick: () => {},
    steps: [],
  };

  constructor(props) {
    super(props);

    this._validateNumberOfSteps(props.steps);
  }

  componentDidUpdate() {
    this._validateNumberOfSteps(this.props.steps);
  }

  _validateNumberOfSteps(steps) {
    if (
      !steps ||
      !steps.length ||
      !steps.length < Consts.MIN_STEPS ||
      steps.length > Consts.MAX_STEPS
    ) {
      console.error(
        'Warning: Failed prop: The prop `steps` in `Stepper` has to be an array in the size of 2 to 7.',
      );
    }
  }

  _renderStep = (step, idx) => {
    return (
      <div key={`step${idx}`} className={styles.step}>
        <div>{idx + 1}</div>
        <div className={styles.stepText}>
          <Text ellipsis>{step.text}</Text>
        </div>
      </div>
    );
  };

  render() {
    const { dataHook, steps } = this.props;

    return (
      <div {...styles('root', {}, this.props)} data-hook={dataHook}>
        {steps.map((step, idx) => this._renderStep(step, idx))}
      </div>
    );
  }
}

export default Stepper;
