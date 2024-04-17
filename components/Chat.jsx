import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  Platform,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { Button, Input } from "@rneui/base";
import Message from "./Message";
import { KeyboardAvoidingView } from "react-native";
import { useRef } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "@rneui/themed";
import { getRandomHexColor } from "../utils/randomColor";

export default function Chat({ route }) {
  const { name } = route.params;
  const [message, setMessage] = useState({
    name: name,
    data: "",
    isJoinMessage: false,
    socketId: socket.id,
  });
  const [socketId, setSocketId] = useState(socket.id);
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();
  useEffect(() => {
    socket.emit("join", name);

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
      socket.off("join");
    };
  }, []);

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (message.data.trim() !== "") {
      socket.emit("message", message, () => {
        setMessages((messages) => [...messages, message]);
      });
      setMessage({ ...message, data: "" });
    }
  };
  const renderItem = ({ item }) => {
    return <Message message={item} socketId={socketId} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          width: Platform.OS === "ios" ? "100%" : "80%",
          height: "100%",
        }}
        keyboardVerticalOffset={60}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Input
            value={message.data}
            onChangeText={(value) => {
              setMessage({ ...message, data: value });
            }}
            style={{ flex: 1 }}
            placeholder="Enter your message"
            rightIcon={(props) => (
              <TouchableOpacity onPress={sendMessage}>
                <Icon name="send" size={24} color="black" />
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
