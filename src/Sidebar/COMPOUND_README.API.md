## Sidebar

### `<Sidebar.Item/>`
A render slot to be displayed as an item in the `Sidebar`. It also supply logic regarding navigating to nested level, clickability and more

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| `itemKey` | string | | | unique identifier per item, used to mark it for navigation and selection |
| `children` | node | | | a node to be rendered |
| `innerMenu` | array[node] | | | an array or nodes to be displayed as nested-level nodes. can be nest any node as the children of `Sidebar` |
| `disable` | boolean | false | | defines if an item should be clickable |


### `<Sidebar.PersistentHeader/>`
A render slot to be displayed as a persistent content at the top of the `Sidebar`

### `<Sidebar.PersistentFooter/>`
A render slot to be displayed as a persistent content at the bottom of the `Sidebar`


### `<Sidebar.BackButton/>`
A render slot to be displayed as an actionable item to return to the previous level of a nested inner menu.
