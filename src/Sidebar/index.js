export { default } from './Sidebar';
import { SidebarItemContext, SidebarContext } from './SidebarAPI';

const SidebarContextConsumer = SidebarContext.Consumer;
const SidebarItemContextConsumer = SidebarItemContext.Consumer;

export { SidebarContextConsumer, SidebarItemContextConsumer };
