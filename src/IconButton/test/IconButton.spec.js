import React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react/index';
import { iconButtonPrivateDriverFactory } from '../IconButton.private.uni.driver';
import IconButton from '../index';
import More from '../../new-icons/More';
import MoreSmall from '../../new-icons/MoreSmall';
import { dataHooks } from './storySettings';

describe('IconButton', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(iconButtonPrivateDriverFactory);

  it('should have correct displayName', () => {
    expect(IconButton.displayName).toEqual('IconButton');
  });

  describe('Icon size ', () => {
    const dataHook = dataHooks.iconOfIconButton;

    it.each(['tiny', 'small'])(
      'should be 18px when given size- %s',
      async size => {
        const props = { size, children: <MoreSmall data-hook={dataHook} /> };
        const { driver } = render(<IconButton {...props} />);

        expect(await driver.getIconSize()).toEqual('18px');
      },
    );

    it.each(['medium', 'large'])(
      'should be 24px when given size- %s',
      async size => {
        const props = { size, children: <More data-hook={dataHook} /> };
        const { driver } = render(<IconButton {...props} />);

        expect(await driver.getIconSize()).toEqual('24px');
      },
    );

    describe(`'as' prop`, () => {
      const Link = ({ children }) => <a>{children}</a>;

      class LinkClass extends React.Component {
        render() {
          return <a>{this.props.children}</a>;
        }
      }

      it('should be defined in proptypes', async () => {
        expect(!!IconButton.propTypes.as).toBe(true);
      });

      it('should render without errors when html element is passed', async () => {
        const { driver } = render(<IconButton as="a" />);
        expect(await driver.exists()).toBe(true);
      });

      it('should render without errors when function reference is passed', async () => {
        const { driver } = render(<IconButton as={Link} />);
        expect(await driver.exists()).toBe(true);
      });

      it('should render without errors when class is passed', async () => {
        const { driver } = render(<IconButton as={LinkClass} />);
        expect(await driver.exists()).toBe(true);
      });
    });
  });
});
