import React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react/index';
import { buttonDriverFactory } from '../Button.uni.driver';
import Button from '../index';
import { PRIORITY, SIZES, SKINS } from '../constants';
import { ReactDOMTestContainer } from 'wix-ui-core/dist/test/dom-test-container';

const createButton = (props = {}) => {
  const dataHook = 'button';
  return <Button {...props} dataHook={dataHook} />;
};

describe('Button', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(buttonDriverFactory);

  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  const defaultProps = {
    priority: PRIORITY.primary,
    size: SIZES.medium,
    skin: SKINS.standard,
  };

  it('should have correct displayName', async () => {
    expect(Button.displayName).toEqual('Button');
  });

  describe(`'as' prop`, () => {
    const Link = ({ children }) => <a>{children}</a>;

    class LinkClass extends React.Component {
      render() {
        return <a>{this.props.children}</a>;
      }
    }

    it('should be defined in proptypes', async () => {
      expect(!!Button.propTypes.as).toBe(true);
    });

    it('should render without errors when html element is passed', async () => {
      const { driver } = render(<Button as="a" />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when function reference is passed', async () => {
      const { driver } = render(<Button as={Link} />);
      expect(await driver.exists()).toBe(true);
    });

    it('should render without errors when class is passed', async () => {
      const { driver } = render(<Button as={LinkClass} />);
      expect(await driver.exists()).toBe(true);
    });
  });

  //TODO: add a test for checking isFocused function
  // describe('"focus" method', () => {
  //   it('should allow to focus on button using the focus method on its ref', async () => {
  //     const { driver } = await render(<Button ref="button-ref"/>);
  //     console.log(driver);
  //     expect(await driver.isFocused()).toEqual(false);
  //     //ref.current.focus();
  //     expect(await driver.isFocused()).toEqual(true);
  //   });
  // });

  describe(`Disabled`, () => {
    describe('isButtonDisabled', () => {
      const disabledProps = {
        disabled: true,
      };

      it('should NOT be disabled by default', async () => {
        const { driver } = await render(createButton({ ...defaultProps }));
        expect(await driver.isButtonDisabled()).toEqual(false);
      });
      it('should be disabled when disabled is passed', async () => {
        const { driver } = await render(
          createButton({ ...defaultProps, ...disabledProps }),
        );
        expect(await driver.isButtonDisabled()).toEqual(true);
      });

      it('should be disabled when href is provided', async () => {
        const props = {
          as: 'a',
          href: 'wix',
        };

        const { driver } = await render(
          createButton({ ...defaultProps, ...disabledProps, ...props }),
        );
        expect(await driver.isButtonDisabled()).toEqual(true);
      });

      it('should render component with tabIndex -1 when disabled', async () => {
        await testContainer.render(
          createButton({ ...defaultProps, ...disabledProps }),
        );

        const htmlTag = testContainer.componentNode.getAttribute('tabindex');
        expect(htmlTag).toEqual('-1');
      });

      it('should render aria-disabled as true when disabled', async () => {
        await testContainer.render(
          createButton({ ...defaultProps, ...disabledProps }),
        );

        const htmlTag = testContainer.componentNode.getAttribute(
          'aria-disabled',
        );
        expect(htmlTag).toEqual('true');
      });

      it('should render href as undefined when disabled', async () => {
        const props = {
          as: 'a',
          href: 'wix',
        };

        await testContainer.render(
          createButton({ ...defaultProps, ...disabledProps, ...props }),
        );

        const htmlTag = testContainer.componentNode.getAttribute('href');
        expect(!!htmlTag).toEqual(false);
      });

      describe('disabled attribute', () => {
        it(`should have 'disabled' attribute when disabled`, async () => {
          await testContainer.render(
            createButton({ ...defaultProps, ...disabledProps }),
          );

          const disabledAttribute = testContainer.componentNode.getAttribute(
            'disabled',
          );
          expect(disabledAttribute).not.toEqual(null);
        });

        it(`should NOT have 'disabled' attribute when disabled and 'href' is provided`, async () => {
          const props = {
            as: 'a',
            href: 'wix',
          };

          await testContainer.render(
            createButton({ ...defaultProps, ...disabledProps, ...props }),
          );

          const disabledAttribute = testContainer.componentNode.getAttribute(
            'disabled',
          );
          expect(disabledAttribute).toEqual(null);
        });
      });
    });
  });
});
