import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, View } from "react-native";
import {
  BookmarkSquareIcon,
  ChevronLeftIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const { height, width } = Dimensions.get("window");

const NewsDetailsScreen = () => {
  const navigation = useNavigation();

  // params: item because in the NewsScreen.tsx, we have: renderItem = ({ item, index })
  const { params: item } = useRoute();
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row justify-between items-center px-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
          </Pressable>
        </View>

        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          <View className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size={25} strokeWidth={2} color="gray" />
          </View>

          <View className="bg-gray-100 p-2 rounded-full">
            <BookmarkSquareIcon size={25} strokeWidth={2} color="gray" />
          </View>
        </View>
      </View>

      <WebView
        source={{
          uri: item.url,
        }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size="large"
          color="green"
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default NewsDetailsScreen;
