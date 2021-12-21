import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
export default function ButtonPrimary({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#005EA2",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 4,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#DDDDDD",
          textTransform: "capitalize",
          fontSize: 14,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
