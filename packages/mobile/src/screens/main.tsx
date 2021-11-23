import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import * as Lib from "@/lib";
import * as Styles from "@/styles/main.styles";

export const Main: React.FC = () => {
  const navigation = useNavigation();
  const [showActions, setShowActions] = useState(false);

  return (
    <Lib.Container>
      <Lib.Carousel onChange={setShowActions} />

      <Styles.ActionsContainer isVisible={showActions}>
        <Styles.Button
          variant="dark"
          enabled={showActions}
          onPress={() => navigation.navigate("SignUp")}
        >
          SignUp
        </Styles.Button>
        <Styles.Button
          enabled={showActions}
          onPress={() => navigation.navigate("SignIn")}
        >
          SignIn
        </Styles.Button>
      </Styles.ActionsContainer>
    </Lib.Container>
  );
};
