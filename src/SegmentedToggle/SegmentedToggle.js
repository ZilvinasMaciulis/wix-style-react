import React from 'react';
import PropTypes from 'prop-types';

import styles from './SegmentedToggle.st.css';
import ToggleButton from './ToggleButton/ToggleButton';
import ToggleIcon from './ToggleIcon/ToggleIcon';

class SegmentedToggle extends React.Component {
  static displayName = 'SegmentedToggle';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used to create an testkit */
    dataHook: PropTypes.string,
    /** Sets default selected toggle */
    defaultSelected: PropTypes.string,
    /** Returns selected element and value `(evt, value)`  */
    onClick: PropTypes.func,
    /** Applies disabled styles and removes handlers  */
    disabled: PropTypes.bool,
    /** ToggleButton or ToggleIcon  */
    children: PropTypes.array.isRequired,
  };

  static defaultProps = {
    children: [],
  };

  state = {
    selected: this.props.defaultSelected,
  };

  _onClick = evt => {
    const { onClick } = this.props;
    const { value } = evt.currentTarget;
    this.setState({ selected: value }, () => onClick && onClick(evt, value));
  };

  _addDividers = (childrenNodes, disabled) => {
    const childrenNodesWithDividers = [];

    const isTransparent = (childNode1, childNode2) =>
      childNode1.props.selected !== childNode2.props.selected;

    for (let i = 0; i < childrenNodes.length - 1; i++) {
      const childNode1 = childrenNodes[i];
      const childNode2 = childrenNodes[i + 1];

      const transparent = isTransparent(childNode1, childNode2);

      const divider = (
        <div
          key={`divider-${i}`}
          {...styles('divider', { disabled, transparent })}
        />
      );

      childrenNodesWithDividers.push(childNode1, divider);
    }

    const lastChild = childrenNodes[childrenNodes.length - 1];

    childrenNodesWithDividers.push(lastChild);

    return childrenNodesWithDividers;
  };

  render() {
    const {
      dataHook,
      children,
      disabled,
      defaultSelected,
      onClick,
      ...rest
    } = this.props;

    let childrenNodes = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        disabled,
        'data-click': `segmented-toggle-${index + 1}`,
        onClick: this._onClick,
        selected: child.props.value === this.state.selected,
      }),
    );

    childrenNodes = this._addDividers(childrenNodes, disabled);

    return (
      <div
        {...rest}
        data-hook={dataHook}
        {...styles('root', { disabled }, rest)}
      >
        {childrenNodes}
      </div>
    );
  }
}

SegmentedToggle.Button = ToggleButton;
SegmentedToggle.Icon = ToggleIcon;

export default SegmentedToggle;
