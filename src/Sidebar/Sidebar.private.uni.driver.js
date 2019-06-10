import { sidebarDriverFactory as publicDriverFactory } from './Sidebar.uni.driver';

export const sidebarPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
