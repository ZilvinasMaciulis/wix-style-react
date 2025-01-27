import React from 'react';
import inputAreaDriverFactory from './InputArea.driver';
import InputArea from './InputArea';

import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/unit';
import { inputAreaUniDriverFactory } from './InputArea.uni.driver';

describe('InputArea', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(inputAreaDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(inputAreaUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    const createDriver = jsx => render(jsx).driver;

    const InputAreaForTesting = props => (
      <InputArea {...props} dataHook="textarea-div" />
    );

    afterEach(() => {
      cleanup();
    });

    describe('enterText driver method', () => {
      it('passes the name and value attribute', async () => {
        const onChangeMock = jest.fn();
        const props = {
          name: 'gal',
          onChange: onChangeMock,
        };
        const driver = createDriver(<InputAreaForTesting {...props} />);
        await driver.enterText('some text');
        const eventTarget = onChangeMock.mock.calls[0][0].target;
        expect(eventTarget.name).toEqual('gal');
        expect(eventTarget.value).toEqual('some text');
      });
    });

    describe('value attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          value: 'hello',
          onChange: () => {},
        };

        const driver = createDriver(<InputAreaForTesting {...props} />);
        expect(await driver.getValue()).toEqual(props.value);
      });
    });

    describe('defaultValue attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const defaultValue = 'hello';

        const driver = createDriver(
          <InputAreaForTesting defaultValue={defaultValue} />,
        );
        expect(await driver.getDefaultValue()).toEqual(defaultValue);
      });
    });

    describe('maxHeight attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const maxHeight = '50px';

        const driver = createDriver(
          <InputAreaForTesting maxHeight={maxHeight} />,
        );
        expect((await driver.getStyle()).maxHeight).toEqual(maxHeight);
      });
    });

    describe('maxLength attribute', () => {
      it('should pass down to the wrapped input - with max length', async () => {
        const maxLength = 5;

        const driver = createDriver(
          <InputAreaForTesting maxLength={maxLength} />,
        );
        expect(await driver.getMaxLength()).toEqual(maxLength);
      });
    });

    describe('counter', () => {
      it('should show correct value when hasCounter and maxLength present', async () => {
        const driver = createDriver(
          <InputAreaForTesting hasCounter maxLength={30} value={'abc'} />,
        );
        expect(await driver.getCounterValue()).toEqual('3/30');
      });

      it('should not show counter when hasCounter is not present', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getHasCounter()).toBeFalsy();
      });
    });

    describe('resizable attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const driver = createDriver(<InputAreaForTesting resizable />);
        expect(await driver.getResizable()).toBeTruthy();
      });

      it('should pass down to the wrapped input with default false value', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getResizable()).toBeFalsy();
      });
    });

    describe('disabled attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const driver = createDriver(<InputAreaForTesting disabled />);
        expect(await driver.getDisabled()).toBeTruthy();
      });

      it('should pass down to the wrapped input with default false value', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getDisabled()).toBeFalsy();
      });

      it('should not display an error icon even if the error is true', async () => {
        const driver = createDriver(<InputAreaForTesting disabled error />);
        expect(await driver.hasExclamation()).toBeFalsy();
      });

      it('should not be resizable', async () => {
        const driver = createDriver(<InputAreaForTesting disabled />);
        expect(await driver.getResizable()).toBeFalsy();
      });
    });

    describe('rows attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const rows = 5;

        const driver = createDriver(<InputAreaForTesting rows={rows} />);
        expect(await driver.getRowsCount()).toEqual(rows);
      });
    });

    describe('tabIndex attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const tabIndex = 1;

        const driver = createDriver(
          <InputAreaForTesting tabIndex={tabIndex} />,
        );
        expect(await driver.getTabIndex()).toEqual(tabIndex);
      });
    });

    describe('name attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const name = 'someName';

        const driver = createDriver(<InputAreaForTesting name={name} />);
        expect(await driver.getName()).toEqual(name);
      });
    });

    describe('readOnly attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const driver = createDriver(<InputAreaForTesting readOnly />);
        expect(await driver.getReadOnly()).toBeTruthy();
      });

      it('should pass down to the wrapped input with default false value', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getReadOnly()).toBeFalsy();
      });
    });

    describe('error attribute', () => {
      it('should display an error icon if error is true', async () => {
        const driver = createDriver(<InputAreaForTesting error />);

        expect(await driver.hasError()).toBeTruthy();
      });
    });

    describe('onChange attribute', () => {
      it('should be called when text is entered to the input', async () => {
        const onChange = jest.fn();

        const driver = createDriver(
          <InputAreaForTesting onChange={onChange} />,
        );

        await driver.enterText('world');

        expect(onChange).toBeCalled();
      });
    });

    describe('onKeyUp attribute', () => {
      it('should be called after keybord key got pressed and then released', async () => {
        const onKeyUp = jest.fn();
        const event = { target: { value: 'world' } };

        const driver = createDriver(<InputAreaForTesting onKeyUp={onKeyUp} />);

        await driver.trigger('keyUp', event);

        expect(onKeyUp).toBeCalled();
      });
    });

    describe('onFocus attribute', () => {
      it('should be called when the input gets focused', async () => {
        const onFocus = jest.fn();
        const driver = createDriver(<InputAreaForTesting onFocus={onFocus} />);

        await driver.trigger('focus');

        expect(onFocus).toBeCalled();
      });
    });

    describe('onBlur attribute', () => {
      it('should be called when the input gets blured', async () => {
        const onBlur = jest.fn();
        const driver = createDriver(<InputAreaForTesting onBlur={onBlur} />);

        await driver.trigger('blur');

        expect(onBlur).toBeCalled();
      });
    });

    describe('onKeyDown attribute', () => {
      it('should be called when text is entered to the wrapped input', async () => {
        const onKeyDown = jest.fn();
        const event = { keyCode: 40 };

        const driver = createDriver(
          <InputAreaForTesting onKeyDown={onKeyDown} />,
        );

        await driver.trigger('keyDown', event);

        expect(onKeyDown).toBeCalled();
      });
    });

    describe('onEnter attribute', () => {
      it('should be called when text is entered to the wrapped input', async () => {
        const onEnterPressed = jest.fn();
        const event = { key: 'Enter', keyCode: 13, which: 13 };

        const driver = createDriver(
          <InputAreaForTesting onEnterPressed={onEnterPressed} />,
        );

        await driver.trigger('keyDown', event);

        expect(onEnterPressed).toBeCalled();
      });
    });

    describe('forceFocus attribute', () => {
      it('should have focus class on input if forceFocus is true', async () => {
        const driver = createDriver(<InputAreaForTesting forceFocus />);
        expect(await driver.isFocusedStyle()).toBeTruthy();
      });
    });

    describe('forceHover attribute', () => {
      it('should have hover class on input if forceHover is true', async () => {
        const driver = createDriver(<InputAreaForTesting forceHover />);
        expect(await driver.isHoveredStyle()).toBeTruthy();
      });

      it('should be hovered if forceFocus is false and forceHover is true', async () => {
        const driver = createDriver(
          <InputAreaForTesting forceHover forceFocus={false} />,
        );
        expect(await driver.isHoveredStyle()).toBeTruthy();
      });
    });

    describe('autoFocus attribute', () => {
      it('Mounting an input element with autoFocus=false, should give it the focus', async () => {
        const { driver, rerender } = render(
          <InputAreaForTesting autoFocus={false} />,
        );
        expect(await driver.isFocus()).toBeFalsy();
        rerender(<InputAreaForTesting autoFocus />);
        expect(await driver.isFocus()).toBeFalsy();
      });

      it('Mounting an input element with autoFocus=true, gives it the focus', async () => {
        const driver = createDriver(<InputAreaForTesting autoFocus />);
        expect(await driver.isFocus()).toBeTruthy();
      });
    });

    describe('focus function', () => {
      it('calling focus should give focus to the input', async () => {
        const driver = createDriver(<InputAreaForTesting autoFocus={false} />);
        expect(await driver.isFocus()).toBeFalsy();
        await driver.focus();
        expect(await driver.isFocus()).toBeTruthy();
      });
    });

    describe('theme attribute', () => {
      it('should set the theme by default to "normal"', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.isOfStyle('normal')).toBeTruthy();
      });

      it('should allowing setting the theme to "paneltitle"', async () => {
        const driver = createDriver(<InputAreaForTesting theme="paneltitle" />);
        expect(await driver.isOfStyle('paneltitle')).toBeTruthy();
      });

      it('should allow setting the theme to "material"', async () => {
        const driver = createDriver(<InputAreaForTesting theme="material" />);
        expect(await driver.isOfStyle('material')).toBeTruthy();
      });
    });

    describe('aria attributes', () => {
      it('should allow adding a custom aria-label', async () => {
        const driver = createDriver(<InputAreaForTesting ariaLabel="hello" />);
        expect(await driver.getAriaLabel()).toBe('hello');
      });

      it('should not have any aria label buy default', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getAriaLabel()).toBeNull;
      });

      it('should allow adding aria-controls', async () => {
        const driver = createDriver(<InputAreaForTesting ariaControls="id" />);
        expect(await driver.getAriaControls()).toBe('id');
      });

      it('should not have any aria controls by default', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getAriaControls()).toBeNull;
      });

      it('should allow adding aria-describeby', async () => {
        const driver = createDriver(
          <InputAreaForTesting ariaDescribedby="blabla" />,
        );
        expect(await driver.getAriaDescribedby()).toBe('blabla');
      });

      it('should not have any aria-describeby by default', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getAriaDescribedby()).toBeNull;
      });
    });

    describe('test tooltip', () => {
      describe('onTooltipShow attribute', () => {
        it('should not display the tooltip by default', async () => {
          const driver = createDriver(
            <InputAreaForTesting error errorMessage="I'm the error message" />,
          );
          expect(await driver.isErrorMessageShown()).toBe(false);
        });

        it('should display the tooltip on mouse hover', async () => {
          const driver = createDriver(
            <InputAreaForTesting error errorMessage="I'm the error message" />,
          );
          await driver.mouseEnterErrorIndicator();
          expect(await driver.getErrorMessage()).toBe("I'm the error message");
        });
      });
    });
  }
});
