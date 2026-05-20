import { View, Text, Alert } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/lib/appwrite";
import * as sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";
const SignIn = () => {
  const { fetchAuthenticatedUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) return;
    setIsSubmitting(true);
    try {
      await signIn({
        email,
        password,
      });
      await fetchAuthenticatedUser();
      Alert.alert("Success", "You have successfully signed in");
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
      <CustomButton title="Sign-In" onPress={submit} isLoading={isSubmitting} />
      <View className="flex flex-row justify-center gap-2 mt-5 ">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign-Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
