import React from 'react';
import PropTypes from 'prop-types';

/** Stepper */
class Stepper extends React.PureComponent {
  static displayName = 'Stepper';

  static propTypes = {
    dataHook: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const { dataHook } = this.props;

    return <div data-hook={dataHook}>hello world</div>;
  }
}

export default Stepper;
