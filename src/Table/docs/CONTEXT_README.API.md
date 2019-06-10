#### SelectionContext

`SelectionContext` is an object with the following properties and methods:

##### Properties

| name               | type   | description                                                                                         |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| selectedCount      | number | Number of selected items                                                                            |
| bulkSelectionState | string | A string representing the BulkSelection state (not a React state). Possible values: ALL, SOME, NONE |

##### Methods

| name                | arguments                                                                                                               | return                             | description                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| isSelected          | id: string &#124; number                                                                                                | boolean                            | Is the item with the given id selected. (id comes from the rowData.id if exists, if not then it is the rowIndex)    |
| getSelectedIds      | -                                                                                                                       | Array<string> &#124; Array<number> | Get a copy (array) of selected ids                                                                                  |
| toggleSelectionById | id: string &#124; number                                                                                                | void                               | Toggle the selection state (selected/not-selected) of an item by id                                                 |
| toggleAll           | -                                                                                                                       | void                               | Toggles the bulk selection state: NONE -> ALL, SOME -> ALL, ALL -> NONE                                             |
| selectAll           | -                                                                                                                       | void                               | Select all items                                                                                                    |
| deselectAll         | -                                                                                                                       | void                               | Deselect all items (clear selection)                                                                                |
| setSelectedIds      | (selectedIds: Array<string> &#124; Array<number>, change?: {type: string, id?: string &#124; number, value?: boolean }) | void                               | Set the selection. An optional `change` argument will be passed "as is" to the Table's onSelectionChanged callback. |
