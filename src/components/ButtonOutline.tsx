import React from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonOutlineProps {
  title: any;
  action?: () => void;
  children?: React.ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  title,
  action,
  children,
}: ButtonOutlineProps) => {
  return (
    <Pressable
      className="border-2 border-neutral-400 rounded-lg justify-center items-center py-3 flex-row space-x-2"
      onPress={action}
    >
      {children && <View>{children}</View>}
      <Text className="text-neutral-400 font-bold text-lg">{title}</Text>
    </Pressable>
  );
};

export default ButtonOutline;
