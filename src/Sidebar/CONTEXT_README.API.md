## `SidebarContextConsumer`

`SidebarContextConsumer` is a component with render prop object passing the following properties and methods:

### `children` render props
| name | arguments | return | description |
|----------|----------|--------------|--------------|
| `itemClicked` | key: string | void | changes the selected item and animate into its inner menu |
| `backClicked` | void | void | animate the sidebar to the previous menu |
| `getSelectedKey` | void | string | returns the selected `itemKey` |

---

## `SidebarItemContextConsumer`

`SidebarItemContextConsumer` is a component with render prop object passing the following properties and methods:

## `children` render props
| name | arguments | return | description |
|----------|----------|--------------|--------------|
| `selected` | void | boolean | returns true if the current item is selected in the Sidebar  |
