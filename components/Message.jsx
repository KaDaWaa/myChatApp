import React from "react";
import { ListItem } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import { getRandomHexColor } from "../utils/randomColor";
import { StyleSheet } from "react-native";

export default function Message({ message, socketId }) {
  const messageStyle = message.isJoinMessage
    ? styles.joinMessage
    : message.socketId === socketId
    ? styles.myMessage
    : styles.otherMessage;

  return (
    <ListItem
      containerStyle={messageStyle.containerStyle}
      style={messageStyle.style}
      bottomDivider
    >
      {!message.isJoinMessage && (
        <Avatar
          rounded
          title={message.name.charAt(0)}
          activeOpacity={0.7}
          overlayContainerStyle={{
            backgroundColor: getRandomHexColor(message.name),
          }}
        />
      )}
      <ListItem.Content>
        {!message.isJoinMessage && (
          <ListItem.Title style={messageStyle.title}>
            {message.name}
          </ListItem.Title>
        )}
        <ListItem.Subtitle style={messageStyle.subtitle}>
          {message.isJoinMessage
            ? message.name + " " + message.data
            : message.data}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  myMessage: {
    containerStyle: {
      backgroundColor: "#DCF8C6",
      borderBottomEndRadius: 15,
      borderTopEndRadius: 15,
    },
    style: {
      flex: 1,
      alignItems: "flex-start",
    },
    title: {
      color: "#000",
      fontWeight: "bold",
      marginBottom: 5,
    },
    subtitle: {
      color: "#333",
    },
  },
  otherMessage: {
    containerStyle: {
      backgroundColor: "#F2F2F2",
      borderBottomStartRadius: 15,
      borderTopStartRadius: 15,
    },
    style: {
      flex: 1,
      alignItems: "flex-end",
    },
    title: {
      color: "#000",
      fontWeight: "bold",
      marginBottom: 5,
    },
    subtitle: {
      color: "#333",
    },
  },
  joinMessage: {
    containerStyle: {},
    style: {
      width: "100%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: "#000",
      fontWeight: "bold",
    },
    subtitle: {
      color: "#333",
    },
  },
});
