import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { Header } from "src/component/Header";

type Props = {
  children: ReactNode;
};

export const HomeLayout = ({ children }: Props) => {
  return <AppShell header={<Header />}>{children}</AppShell>;
};
