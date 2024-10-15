import { FetchCryptoNews } from "@/utils/cryptoapi";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const NewsScreen = () => {
  const { data: NewsData, isLoading: IsNewsLoading } = useQuery({
    queryKey: ["cryptoNews"],
    queryFn: FetchCryptoNews,
  });

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsDetailsScreen", item);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{ uri: item.thumbnail }}
              style={{
                width: hp(9),
                height: hp(10),
              }}
              contentFit="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}
          <View className="w-[70%] pl-4 justify-center space-y-1">
            {/* Description */}
            <Text className="text-xs font-bold text-gray-900">
              {item?.description?.length > 20
                ? item.description.slice(0, 20) + "..."
                : item.description}
            </Text>

            {/* Title */}
            <Text className="max-w-[90%] text-neutral-800 capitalize">
              {item?.title?.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            {/* Created At */}
            <Text className="text-xs text-gray-700">{item?.createdAt}</Text>
          </View>

          <View className="w-[10%] justify-center">
            {/* Bookmart */}
            <BookmarkSquareIcon color="gray" />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="space-y-2 bg-white dark:bg-neutral-500 flex-1">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 pb-4">
        <View className="w-3/4 flex-row space-x-2">
          <Text className="text-3xl font-bold">Crypto News</Text>
        </View>
      </View>

      {/* Main News */}
      <View>
        {NewsData && NewsData.data.length > 0 ? (
          <FlatList
            nestedScrollEnabled={true}
            data={NewsData.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
