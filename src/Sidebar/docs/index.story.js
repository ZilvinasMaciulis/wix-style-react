import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  code as baseCode,
  api,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import SimpleSidebarRaw from '!raw-loader!./SimpleExample';
import SidebarItemContextRaw from '!raw-loader!./SidebarItemContextExample';
import compoundReadmeApi from '../COMPOUND_README.API.md';
import contextReadmeApi from '../CONTEXT_README.API.md';

import Sidebar from '..';

const importDecleration = `
### For basic compositions:
import Sidebar from 'wix-style-react/Sidebar';
const { Item, BackButton, PersistentFooter, PersistentHeader } = Sidebar;

### For advanced usages:
import { SidebarContextConsumer, SidebarItemContextConsumer } from 'wix-style-react/Sidebar';
`;

const code = config =>
  baseCode({ components: allComponents, compact: true, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Sidebar,
  componentPath: '..',

  componentProps: {},

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Sidebar/',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'A sidebar menu container component, created to display a drill in menu and persistent elements',
          }),
          importExample(importDecleration),
          divider(),
          title('Examples'),
          columns([
            description({
              title: 'Basic example',
              text:
                'In its very basic simple form - the `Sidebar` component provides a container for elements',
            }),
            code({
              source: SimpleSidebarRaw,
            }),
          ]),
          columns([
            description({
              title: 'Custom Context Usage',
              text:
                'Items can get internal selection logic from the `SidebarItemContextConsumer` context component. Check the source code for more information about how to use the context components, for example `<SidebarContextConsumer/> allows achieveing custom back buton behavior`',
            }),
            code({
              source: SidebarItemContextRaw,
            }),
          ]),
        ],
      }),

      ...[
        { title: 'Sidebar API', sections: [api()] },
        tab({
          title: 'Compound components API',
          sections: [description(compoundReadmeApi)],
        }),
        tab({
          title: 'Context API',
          sections: [description(contextReadmeApi)],
        }),
        // { title: 'Testkit', sections: [testkit()] }, //TODO - uncomment once drivers are implemented
        // { title: 'Playground', sections: [playground()] }, //TODO - not in use at the moment
      ].map(tab),
    ]),
  ],
};
