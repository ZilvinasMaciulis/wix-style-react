import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './Stepper.st.css';

/** Stepper */
class Stepper extends React.PureComponent {
  static displayName = 'Stepper';

  static propTypes = {
    dataHook: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        error: PropTypes.bool,
        disabled: PropTypes.bool,
        completed: PropTypes.bool,
      }),
    ).isRequired,
  };

  static defaultProps = {
    onClick: () => {},
    steps: [],
  };

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
      <div className={styles.root} data-hook={dataHook}>
        {steps.map((step, idx) => this._renderStep(step, idx))}
      </div>
    );
  }
}

export default Stepper;
