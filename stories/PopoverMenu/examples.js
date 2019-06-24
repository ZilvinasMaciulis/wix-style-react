export const importExample = `
import PopoverMenu from 'wix-style-react/beta/PopoverMenu';
import IconButton from 'wix-style-react/IconButton';
`;

export const basic = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu 
        triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Open Menu</TextButton>}> 
      <PopoverMenu.MenuItem 
        text="Add" 
      /> 
      <PopoverMenu.MenuItem 
        text="Edit"
      />
      <PopoverMenu.MenuItem 
        text="Delete" 
      />
  </PopoverMenu> 
</Layout>
`;

export const skins = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu 
      triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Skins</TextButton>}
  > 
      <PopoverMenu.MenuItem 
        text="Add" 
        skin="dark"
      /> 
      <PopoverMenu.MenuItem 
        text="Edit" 
        skin="dark"
      /> 
      <PopoverMenu.MenuItem 
        text="Delete"
        skin="destructive"
      />
  </PopoverMenu> 
</Layout>
`;

export const prefix = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu 
      triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Prefix</TextButton>}
  > 
      <PopoverMenu.MenuItem 
        text="Add" 
        prefixIcon={<Icons.Add/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Edit" 
        prefixIcon={<Icons.Edit/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Delete"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
  </PopoverMenu> 
</Layout>
`;

export const size = `
<Layout  cols={2} gap={0} justifyItems="center">
<PopoverMenu 
  textSize="medium"
  triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Medium Menu</TextButton>}
> 
    <PopoverMenu.MenuItem 
      text="Add" 
      prefixIcon={<Icons.Add/>}
    /> 
    <PopoverMenu.MenuItem 
      text="Edit" 
      prefixIcon={<Icons.Edit/>}
    /> 
    <PopoverMenu.MenuItem 
      text="Delete"
      prefixIcon={<Icons.Delete />}
      skin="destructive"
    />
</PopoverMenu> 
  <PopoverMenu 
      textSize="small"
      triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Small Menu</TextButton>}
  > 
      <PopoverMenu.MenuItem 
        text="Add" 
        prefixIcon={<Icons.Add/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Edit" 
        prefixIcon={<Icons.Edit/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Delete"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
  </PopoverMenu> 
</Layout>
`;

export const divider = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu 
      triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Divider</TextButton>}
  > 
      <PopoverMenu.MenuItem 
        text="Add" 
        prefixIcon={<Icons.Add/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Edit" 
        prefixIcon={<Icons.Edit/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Delete"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
      <PopoverMenu.Divider/>
      <PopoverMenu.MenuItem 
        text="Settings"
        prefixIcon={<Icons.Settings />}
      />
  </PopoverMenu> 
</Layout>
`;

export const wrap = `
<Layout  cols={2} gap={0} justifyItems="center">
<PopoverMenu 
  textSize="medium"
  maxWidth={150}
  triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Ellipsis</TextButton>}
> 
    <PopoverMenu.MenuItem 
      text="Add New Items" 
      prefixIcon={<Icons.Add/>}
    /> 
    <PopoverMenu.MenuItem 
      text="Edit This Item" 
      prefixIcon={<Icons.Edit/>}
    /> 
    <PopoverMenu.MenuItem 
      text="Delete This Item"
      prefixIcon={<Icons.Delete />}
      skin="destructive"
    />
</PopoverMenu> 
  <PopoverMenu
      maxWidth={150}
      wrapText
      triggerElement={<TextButton suffixIcon={<Icons.ArrowDown/>}>Text Wraps</TextButton>}
  > 
      <PopoverMenu.MenuItem 
        text="Add New Items" 
        prefixIcon={<Icons.Add/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Edit This Item" 
        prefixIcon={<Icons.Edit/>}
      /> 
      <PopoverMenu.MenuItem 
        text="Delete This Item"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
  </PopoverMenu> 
</Layout>
`;
