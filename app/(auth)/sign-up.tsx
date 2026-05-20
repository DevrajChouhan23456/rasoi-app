import { View, Text, Alert } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/lib/appwrite";
import * as sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";

const SignUp = () => {
  const { fetchAuthenticatedUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password)
      return Alert.alert(
        "Error",
        "Please enter valid name, email and password",
      );
    setIsSubmitting(true);
    try {
      await createUser({
        name,
        email,
        password,
      });

      await fetchAuthenticatedUser();
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      sentry.captureException(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5 ">
      <CustomInput
        placeholder="Enter your Name"
        label="Name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
      />
      <CustomInput
        placeholder="Enter your Email"
        label="Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your Password"
        label="Password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry={true}
      />
      <CustomButton title="Sign-Up" onPress={submit} isLoading={isSubmitting} />
      <View className="flex flex-row justify-center gap-2 mt-5 ">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign-In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
