export const skins = `
<Layout cols={3} gap={0} justifyItems="center" alignItems="center">
  <Box padding={1} backgroundColor="D80">
    <IconButton>
      <Icons.More />
    </IconButton>
  </Box>
  <IconButton skin="inverted">
    <Icons.More />
  </IconButton>
  <Box padding={1} backgroundColor="D10">
    <IconButton skin="light">
      <Icons.More />
    </IconButton>
  </Box>
</Layout>
`;

export const priority = `
<Layout cols={3} gap={0} justifyItems="center">
  <Box padding={1} backgroundColor="D80">
    <IconButton priority="secondary">
      <Icons.X />
    </IconButton>
    <IconButton priority="primary">
      <Icons.Check />
    </IconButton>
  </Box>
  <Box padding={1}>
    <IconButton priority="secondary" skin="inverted">
      <Icons.X />
    </IconButton>
    <IconButton priority="primary" >
      <Icons.Check />
    </IconButton>
  </Box>
  <Box padding={1} backgroundColor="D10">
    <IconButton priority="secondary" skin="light">
      <Icons.X />
    </IconButton>
    <IconButton priority="primary" skin="light">
      <Icons.Check />
    </IconButton>
  </Box>
</Layout>
`;

export const size = `
<Layout cols={4} gap={0} justifyItems="center">
  <IconButton size="tiny">
    <Icons.MoreSmall />
  </IconButton>
  <IconButton size="small">
    <Icons.MoreSmall />
  </IconButton>
  <IconButton>
    <Icons.More />
  </IconButton>
  <IconButton size="large">
    <Icons.More />
  </IconButton>
</Layout>
`;

export const disabled = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton>
    <Icons.More />
  </IconButton>
  <IconButton disabled>
    <Icons.More />
  </IconButton>
</Layout>
`;

export const custom = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton as="a">
    <Icons.More />
  </IconButton>
  <IconButton as={Link}  to="/wix">
    <Icons.More />
  </IconButton>
</Layout>
`;
