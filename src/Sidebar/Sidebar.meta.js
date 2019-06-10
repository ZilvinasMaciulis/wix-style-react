import Sidebar from './Sidebar';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata(Sidebar);

metadata.exportedFrom({
  path: 'src/Sidebar/Sidebar.js',
});
