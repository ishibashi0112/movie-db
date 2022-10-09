import { Button, Group, Header as MantineHeader, Title } from "@mantine/core";

export const Header = () => {
  return (
    <MantineHeader height={45} p="xs">
      <Group position="apart">
        <Title order={4}>Movie DB</Title>
        <Group>
          <Button variant="subtle" size="sm" compact>
            SignIn
          </Button>
          <Button variant="subtle" size="sm" compact>
            SignUp
          </Button>
        </Group>
      </Group>
    </MantineHeader>
  );
};
