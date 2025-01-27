export const wrap = `
<Layout cols={2} gap={0} justifyItems="center">
  <PopoverMenu 
    triggerElement={<IconButton priority="secondary"><Icons.More /></IconButton>}
  > 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    /> 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
  </PopoverMenu>
  <PopoverMenu 
    wrapText={true}
    triggerElement={<IconButton priority="secondary"><Icons.More /></IconButton>}
  > 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    /> 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
  </PopoverMenu>
</Layout>
`;
