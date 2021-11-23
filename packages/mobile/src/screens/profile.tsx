import React from "react";

import { useAuth } from "@/hooks";
import * as Lib from "@/lib";

export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Lib.Container>
      <Lib.Text>Profile Page</Lib.Text>
      <Lib.Text>{JSON.stringify(user)}</Lib.Text>
      <Lib.Button variant="dark" onPress={signOut}>Sair</Lib.Button>
    </Lib.Container>
  );
};
