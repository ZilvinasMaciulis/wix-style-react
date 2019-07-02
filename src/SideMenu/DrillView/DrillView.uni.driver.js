import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { sideMenuUniDriverFactory } from '../core/SideMenu.uni.driver';
import styles from './DrillView.scss';

export const drillViewUniDriverFactory = (base, body) => {
  const createMenuDriver = menuElement =>
    sideMenuUniDriverFactory(menuElement, body);
  const getMenu = () => base.$('.' + styles.drillViewContainer);

  return {
    ...baseUniDriverFactory(base),
    getMenuDriver: () => createMenuDriver(getMenu()),
    getStickyFooter: () => base.$('[data-hook=menu-footer]'),
  };
};
