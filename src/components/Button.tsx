import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  title: any;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }: ButtonProps) => {
  return (
    <Pressable
      className="bg-[#2ab07c] rounded-lg justify-center items-center py-3"
      onPress={action}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </Pressable>
  );
};

export default Button;
