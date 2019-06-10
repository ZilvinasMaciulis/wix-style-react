import React from 'react';
import PropTypes, { oneOfType, func, object, string } from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';
import styles from './ListItemAction.st.css';
import Text from '../Text';

/** ListItemAction */
class ListItemActionComponent extends React.PureComponent {
  static displayName = 'ListItemAction';

  static propTypes = {
    /** render as some other element */
    as: oneOfType([func, object, string]),

    /** Data attribute for testing purposes */
    dataHook: PropTypes.string,

    /** Item theme (standard, dark, destructive) */
    skin: PropTypes.oneOf(['standard', 'dark', 'destructive']),

    /** Text Size (small, medium) */
    size: PropTypes.oneOf(['small', 'medium']),

    /** Prefix Icon */
    prefixIcon: PropTypes.node,

    /** When present, it specifies that a button should automatically get focus when the page loads. */
    autoFocus: PropTypes.bool,

    /** Title */
    title: PropTypes.string.isRequired,

    /** Disabled */
    disabled: PropTypes.bool,

    /** On Click */
    onClick: PropTypes.func,
  };

  _renderText = () => {
    const { title, size } = this.props;
    return (
      <Text
        className={styles.text}
        weight="normal"
        size={size}
        dataHook="list-item-action-title"
      >
        {title}
      </Text>
    );
  };

  _renderPrefix = () => {
    const { prefixIcon, size } = this.props;
    return React.cloneElement(prefixIcon, {
      size: size === 'medium' ? 24 : 18,
      className: styles.prefixIcon,
      'data-hook': 'list-item-action-prefix-icon',
    });
  };

  static defaultProps = {
    as: 'button',
    skin: 'standard',
    size: 'medium',
  };

  render() {
    const {
      dataHook,
      disabled,
      skin,
      prefixIcon,
      onClick,
      focusableOnFocus,
      focusableOnBlur,
      as: Component,
      tabIndex,
      onKeyDown,
      autoFocus,
    } = this.props;

    return (
      <Component
        {...styles('root', { skin, disabled }, this.props)}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        type={Component === 'button' ? 'button' : undefined}
        data-hook={dataHook}
        onKeyDown={!disabled && onKeyDown}
        onClick={!disabled && onClick}
      >
        {prefixIcon && this._renderPrefix()}
        {this._renderText()}
      </Component>
    );
  }
}

export const ListItemAction = withFocusable(ListItemActionComponent);

export const listItemActionBuilder = ({
  title,
  prefixIcon,
  onClick,
  id,
  disabled,
  skin,
  size,
  dataHook,
  as,
  tabIndex,
  autoFocus,
  className,
}) => ({
  id,
  disabled,
  overrideStyle: true,
  value: ({ ref: dropdownRef, ...props }) => (
    <ListItemAction
      {...props}
      className={className}
      autoFocus={autoFocus}
      tabIndex={tabIndex}
      as={as}
      onClick={onClick}
      dataHook={dataHook}
      title={title}
      prefixIcon={prefixIcon}
      skin={skin}
      size={size}
    />
  ),
});
