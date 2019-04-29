import React from 'react';
import PropTypes from 'prop-types';
import styles from './LinearProgressBarNew.st.css';
import {
  LinearProgressBar as CoreLinearProgressBar,
  LinearProgressBarProps as CoreLinearProgressBarProps,
} from 'wix-ui-core/linear-progress-bar';
import ToggleOn from 'wix-ui-icons-common/system/ToggleOn';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';

import Tooltip from '../Tooltip/Tooltip';

/**
 * new LinearProgressBar component transformed from wix-ui-backoffice
 */
class LinearProgressBarNew extends React.PureComponent {
  static displayName = 'LinearProgressBarNew';

  static propTypes = {
    error: PropTypes.bool,

    /** Message to display when an error happens */
    errorMessage: PropTypes.string,

    /** Use light theme instead of dark theme */
    light: PropTypes.bool,

    showProgressIndication: PropTypes.bool,

    value: PropTypes.number,
  };

  // static defaultProps = {
  //   errorMessage: 'some error message',
  //   value: 20,
  // };

  render() {
    const { errorMessage, light, dataHook, ...otherProps } = this.props;

    return (
      <CoreLinearProgressBar
        data-hook={dataHook}
        {...styles('root', { light }, this.props)}
        {...otherProps}
        successIcon={<ToggleOn />}
        errorIcon={
          <Tooltip
            data-hook="linear-progressbar-tooltip"
            placement="top"
            content={errorMessage}
          >
            <FormFieldError data-hook="error-icon" />
          </Tooltip>
        }
      />
    );
  }
}

export default LinearProgressBarNew;
