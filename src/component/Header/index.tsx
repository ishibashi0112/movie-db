import {
  Avatar,
  Button,
  Group,
  Header as MantineHeader,
  Menu,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "src/hook/useAuth";
import { Logout } from "tabler-icons-react";

export const Header = () => {
  const { pathname } = useRouter();
  const { user, signOut } = useAuth();
  console.log(user);

  return (
    <MantineHeader height={50} p="xs">
      <Group className="mx-2" align="center" position="apart">
        <Link href="/" passHref>
          <UnstyledButton component="a">
            <Title order={4}>Movie DB</Title>
          </UnstyledButton>
        </Link>

        <Group>
          {pathname !== "/auth" ? (
            <>
              {user ? (
                <Menu withArrow>
                  <Menu.Target>
                    <Avatar
                      className="cursor-pointer"
                      color="blue"
                      size={30}
                      radius="xl"
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>Account</Menu.Item>
                    <Menu.Item
                      icon={
                        <Logout size={15} strokeWidth={2} color={"#000000"} />
                      }
                      onClick={() => signOut()}
                    >
                      SignOut
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <>
                  <Link href="/auth?type=signin" passHref>
                    <Button variant="subtle" size="sm" compact component="a">
                      SignIn
                    </Button>
                  </Link>
                  <Link href="/auth?type=signup" passHref>
                    <Button variant="subtle" size="sm" compact component="a">
                      SignUp
                    </Button>
                  </Link>
                </>
              )}
            </>
          ) : null}
        </Group>
      </Group>
    </MantineHeader>
  );
};
