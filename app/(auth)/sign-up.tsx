import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const SignUp = () => {
  return (
    <View>
      <Text>sign-up</Text>
      <Button title="sign-in" onPress={() => router.prefetch("/sign-in")} />
    </View>
  );
};

export default SignUp;
