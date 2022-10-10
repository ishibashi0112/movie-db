import {
  Anchor,
  Button,
  Card,
  Container,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { HomeLayout } from "src/component/Layouts/HomeLayout";
import { useAuth } from "src/hook/useAuth";
import type { NextPageWithLayout } from "src/pages/_app";
import { BrandGoogle } from "tabler-icons-react";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Auth: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const isSignIn: boolean = query.type === "signin";
  const isSignUp: boolean = query.type === "signup";

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}/.test(
          value
        )
          ? null
          : "アドレスが正しくありません",
      password: (value) =>
        value.length < 8 ? "パスワードは８文字以上で設定してください" : null,
      confirmPassword: (value, values) =>
        isSignUp
          ? value !== values.password
            ? "パスワードが不一致です"
            : null
          : null,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    console.log("aaa");
    try {
      if (isSignIn) await signInWithEmail(values.email, values.password);
      if (isSignUp) await signUpWithEmail(values.email, values.password);
      console.log("seikou");

      await push("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container size="xs">
        <Card p="lg" radius="sm" withBorder>
          <Group position="center">
            <Title order={5}>{isSignIn ? "Sign In" : "Sign Up"}</Title>
          </Group>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="email"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="password"
                required
                {...form.getInputProps("password")}
              />
              {isSignUp && (
                <PasswordInput
                  label="Confirm password"
                  required
                  {...form.getInputProps("confirmPassword")}
                />
              )}
              <Stack spacing={5}>
                <Button className="mt-6" type="submit">
                  {isSignIn ? "Sign In" : "Sign Up"}
                </Button>
                <Group position="apart">
                  <Link
                    href={`/auth?type=${isSignUp ? "signin" : "signup"}`}
                    passHref
                  >
                    <Anchor component="a">
                      {isSignUp ? "SignIn page" : "SignUp page"}
                    </Anchor>
                  </Link>
                  {isSignIn && (
                    <Link
                      href={`/auth?type=${isSignUp ? "signin" : "signup"}`}
                      passHref
                    >
                      <Anchor component="a">Forgot your password?</Anchor>
                    </Link>
                  )}
                </Group>
              </Stack>
            </Stack>
          </form>
          {isSignIn && (
            <>
              <Divider my={40} label="OAuth" labelPosition="center" />
              <Stack>
                <Button
                  variant="light"
                  color="yellow"
                  leftIcon={<BrandGoogle size={15} />}
                  onClick={handleSignInGoogle}
                >
                  Google Account Login
                </Button>
              </Stack>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

Auth.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Auth;
