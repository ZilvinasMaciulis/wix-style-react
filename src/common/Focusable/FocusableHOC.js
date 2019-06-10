import React from 'react';
import hoistNonReactMethods from 'hoist-non-react-methods';
import PropTypes from 'prop-types';
import {
  wrapDisplayName,
  getDisplayName,
  isStatelessComponent,
} from '../hocUtils';

/**
 * Use this method to spread the focusable focus states onto the a component's root element.
 * @param {object} props
 */
export function focusableStates(props) {
  if (!props) {
    throw new Error(
      'FocusableHOC.focusableStates(props): props must be defined',
    );
  }
  return {
    'data-focus': props.focusableIsFocused,
    'data-focus-visible': props.focusableIsFocusVisible,
  };
}

/**
 * NOTE: Technically we should add the focusable proptypes to every component which uses this HOC.
 * Currently it is not used since Auto-Docs can not process spreading a plain object into propTypes.
 * In any way, these props should not be in the documentaion, since we expose only the withFocusable(Component),
 * and the withFocusalbe(...) does not accept these props.
 * So... for now we can omit these from the wrapped components, and silence eslint is neede.
 */
export const FocusablePropTypes = {
  focusableOnFocus: PropTypes.func,
  focusableOnBlur: PropTypes.func,
  focusableIsFocused: PropTypes.bool,
  focusableIsFocusVisible: PropTypes.bool,
};

/**
 * Singleton for managing current input method (keyboard or mouse).
 */
const inputMethod = new (class {
  // Default is keyboard in case an element is focused programmatically.
  method = 'keyboard';
  subscribers = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', () => this.setMethod('mouse'));
      window.addEventListener('keydown', () => this.setMethod('keyboard'));
      // We need to listen on keyUp, in case a TAB is made from the browser's address-bar,
      // so the keyDown is not fired, only the keyUp.
      window.addEventListener('keyup', () => this.setMethod('keyboard'));
    }
  }

  /**
   * Subscribe to inputMethod change events
   * @param {*} target used as a key to the subscribers map
   * @param {*} callback optional to be called when the input method changes
   */
  subscribe(target, callback) {
    this.subscribers.set(target, callback);
  }

  /**
   * Unsubscribe to inputMethod change events
   * @param {*} target used as a key to the subscribers map
   */
  unsubscribe(target) {
    this.subscribers.delete(target);
  }

  /**
   * Is the current input method `keyboard`. if `false` is means it is `mouse`
   */
  isKeyboard() {
    return this.method === 'keyboard';
  }

  setMethod(method) {
    if (method !== this.method) {
      this.method = method;
      this.subscribers.forEach(f => f());
    }
  }
})();

/*
 * TODO: Consider adding 'disabled' state to this HOC, since:
 * - When component is focused and then it becomes disabled, then the focus needs to be blured.
 *
 * TODO: Consider using [Recompose](https://github.com/acdlite/recompose/tree/master/src/packages/recompose) to do:
 *  - the static hoisting
 *  - set displayName
 */
export const withFocusable = Component => {
  if (isStatelessComponent(Component)) {
    throw new Error(
      `FocusableHOC does not support stateless components. ${getDisplayName(
        Component,
      )} is stateless.`,
    );
  }

  class FocusableHOC extends React.PureComponent {
    wrappedComponentRef = null;
    focusedByMouse = false;

    state = {
      focus: false,
      focusVisible: false,
    };

    componentWillUnmount() {
      inputMethod.unsubscribe(this);
    }

    static displayName = wrapDisplayName(Component, 'WithFocusable');

    static defaultProps = Component.defaultProps;

    componentDidUpdate(prevProps) {
      /*
        in case when button was focused and then become disabled,
        we need to trigger blur logic and remove all listers, as disabled button
        do not trigger onFocus and onBlur events
      */
      const isFocused = this.state.focus || this.state.focusVisible;
      const isBecomeDisabled = !prevProps.disabled && this.props.disabled;
      if (isFocused && isBecomeDisabled) {
        this.onBlur();
      }
    }

    onFocus = () => {
      this.setState({ focus: true, focusVisible: inputMethod.isKeyboard() });
      inputMethod.subscribe(this, () => {
        if (inputMethod.isKeyboard()) {
          this.setState({ focusVisible: true });
        }
      });
    };

    onBlur = () => {
      inputMethod.unsubscribe(this);
      this.setState({ focus: false, focusVisible: false });
    };

    render() {
      return (
        <Component
          ref={ref => (this.wrappedComponentRef = ref)}
          {...this.props}
          focusableOnFocus={this.onFocus}
          focusableOnBlur={this.onBlur}
          focusableIsFocused={this.state.focus || null}
          focusableIsFocusVisible={this.state.focusVisible || null}
        />
      );
    }
  }

  assignPropTypesHack(FocusableHOC, Component.propTypes);

  return hoistNonReactMethods(FocusableHOC, Component, {
    delegateTo: c => c.wrappedComponentRef,
    hoistStatics: true,
  });
};

/**
 * Assigned the given propTypes to the given class.
 *
 * This is a hack because since Yoshi3, with babel-preset-yoshi,
 * the babel-plugin-transform-react-remove-prop-types is enabled and removes propTypes.
 *
 * So if we simply do FocusableHOC.propTypes = Component.propTypes, it is being stripped away.
 *
 * This later becomes a problem if another component defines:
 * <code>
 * Comp.propTypes = {
 *   prop1: SomeFocusableComp.propTypes.prop1
 * }
 * </code>
 */
function assignPropTypesHack(targetClass, propTypes) {
  targetClass.propTypes = propTypes;
}
