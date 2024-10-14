import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import numeral from "numeral";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { FetchAllCoins } from "../../../../utils/cryptoapi";

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  change: number;
  marketCap: string;
}

const MarketScreen = () => {
  const { navigate }: NavigationProp<ScreenNavigationType> = useNavigation();
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [isActive, setIsActive] = useState("All");

  const allCoins = () => {
    setIsActive("All");
  };

  const calculateTopGainers = () => {
    setIsActive("Gainers");

    // Filter based on the coin > 0 (Gainer)
    const gainers = CoinsData.data.coins.filter(
      (coin) => parseFloat(coin.change) > 0
    );

    setTopGainers(gainers);
  };

  const calculateTopLosers = () => {
    setIsActive("Losers");

    // Filter based on the coin < 0 (Loser)
    const losers = CoinsData.data.coins.filter(
      (coin) => parseFloat(coin.change) < 0
    );

    setTopLosers(losers);
  };

  const blurharsh =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  // It fetches data from an API or other data source.
  // It returns an object with various properties and methods for managing the data and its loading state.
  const { data: CoinsData, isLoading: IsAllCoinsLoading } = useQuery({
    queryKey: ["allCoins"], // It sets the unique key for the query. It helps identify and cache the data.
    queryFn: FetchAllCoins, // This specifies the function that will be called to fetch the data.
  });

  const renderItem = ({ item, index }: { item: Coin; index: number }) => (
    <Pressable
      className="flex-row w-full py-4 items-center"
      onPress={() => navigate("CoinDetails", { coinUuid: item.uuid })}
    >
      <Animated.View
        entering={FadeInDown.duration(100)
          .delay(index * 200)
          .springify()}
        className="w-full flex-row items-center"
      >
        <View className="w-[16%]">
          <View>
            <View className="w-10 h-10">
              <Image
                source={{ uri: item.iconUrl }}
                placeholder={blurharsh}
                contentFit="cover"
                transition={1000}
                className="w-full h-full flex-1"
              />
            </View>
          </View>
        </View>

        <View className="w-[55%] justify-start items-start">
          <Text className="font-bold text-lg">{item.name}</Text>

          <View className="flex-row justify-center items-center space-x-2">
            <Text className="font-medium text-sm text-neutral-500">
              {numeral(parseFloat(item?.price)).format("$0,0.00")}
            </Text>

            <Text
              className={`font-medium text-sm ${
                item.change < 0
                  ? "text-red-600"
                  : item.change > 0
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              {item.change}%
            </Text>
          </View>
        </View>

        <View className="w-[29%] justify-start items-end">
          <Text className="font-bold text-base">{item.symbol}</Text>

          <View className="flex-row justify-center items-center space-x-2">
            <Text className="font-medium text-sm text-neutral-500">
              {item?.marketCap?.length > 9
                ? item.marketCap.slice(0, 9)
                : item.marketCap}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );

  console.log({
    CoinsData,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">
        {/* Header */}
        <View className="w-full flex-row items-center px-4 pb-4">
          <View className="w-3/4 flex-row space-x-2">
            <View>
              <Text className="text-3xl font-bold">Market</Text>
            </View>
          </View>
        </View>

        {/* 3 Pressables */}
        <View className="px-4 flex-row justify-between items-center pb-4">
          {/* All */}
          <Pressable
            className={`w-1/4 justify-center items-center py-1 ${
              isActive === "All" ? "border-b-4 border-blue-500" : ""
            }`}
            onPress={allCoins}
          >
            <Text
              className={`text-lg ${
                isActive === "All" ? "font-extrabold" : ""
              }`}
            >
              All
            </Text>
          </Pressable>

          {/* Gainers */}
          <Pressable
            className={`w-1/4 justify-center items-center py-1 ${
              isActive === "Gainers" ? "border-b-4 border-blue-500" : ""
            }`}
            onPress={calculateTopGainers}
          >
            <Text
              className={`text-lg ${
                isActive === "Gainers" ? "font-extrabold" : ""
              }`}
            >
              Gainers
            </Text>
          </Pressable>

          {/* Losers */}
          <Pressable
            className={`w-1/4 justify-center items-center py-1 ${
              isActive === "Losers" ? "border-b-4 border-blue-500" : ""
            }`}
            onPress={calculateTopLosers}
          >
            <Text
              className={`text-lg ${
                isActive === "Losers" ? "font-extrabold" : ""
              }`}
            >
              Losers
            </Text>
          </Pressable>
        </View>

        {/* Coins */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 py-8 items-center">
            {/* All */}
            {isActive === "All" && (
              <View className="px-4 items-center">
                {IsAllCoinsLoading ? (
                  <ActivityIndicator size="large" color="black" />
                ) : (
                  // Only show essential data to prevent loading all data at one time => Enhance performance of the app
                  // Until the user scroll down to see more data then it will be loaded it.
                  <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                    data={CoinsData.data.coins}
                    keyExtractor={(item) => item.uuid}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            )}

            {/* Gainers */}
            {isActive === "Gainers" && (
              <View className="px-4 items-center">
                {IsAllCoinsLoading ? (
                  <ActivityIndicator size="large" color="black" />
                ) : (
                  <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                    data={
                      isActive === "Gainers" ? topGainers : CoinsData.data.coins
                    }
                    keyExtractor={(item) => item.uuid}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            )}

            {/* Losers */}
            {isActive === "Losers" && (
              <View className="px-4 items-center">
                {IsAllCoinsLoading ? (
                  <ActivityIndicator size="large" color="black" />
                ) : (
                  <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                    data={
                      isActive === "Losers" ? topLosers : CoinsData.data.coins
                    }
                    keyExtractor={(item) => item.uuid}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MarketScreen;
