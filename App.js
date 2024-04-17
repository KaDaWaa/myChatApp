import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Button, Input } from "@rneui/base";
import Chat from "./components/Chat";
import { Avatar } from "@rneui/themed";
import { getRandomHexColor } from "./utils/randomColor";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={ChatLogin} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function ChatLogin({ navigation }) {
  const [name, setName] = useState("");

  const firstName = name.split(" ")[0];
  const lastName = name.includes(" ") ? name.split(" ")[1] : "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <SafeAreaView style={styles.container}>
      <Avatar
        rounded
        size="large"
        title={initials}
        activeOpacity={0.7}
        containerStyle={{ alignSelf: "center", margin: 20 }}
        overlayContainerStyle={{ backgroundColor: getRandomHexColor(name) }}
      />
      <Input
        placeholder="Enter your name"
        onChangeText={(value) => {
          setName(value);
        }}
      ></Input>

      <Button
        title="Enter Chat"
        onPress={() => navigation.navigate("Chat", { name })}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
