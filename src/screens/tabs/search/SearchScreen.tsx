import { SearchCoin } from "@/utils/cryptoapi";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { debounce } from "lodash";
import numeral from "numeral";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  change: number;
  marketCap: string;
}

const blurharsh =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Store Result
  const [results, setResults] = useState<any>([]);
  console.log(results);
  const { navigate }: NavigationProp<ScreenNavigationType> = useNavigation();
  const { navigate: navigateHome }: NavigationProp<HomeNavigationType> =
    useNavigation();

  const renderItem = ({ item, index }: { item: Coin; index: number }) => (
    <Pressable
      className="flex-row w-full py-4 items-center px-4"
      onPress={() => navigate("CoinDetails", { coinUuid: item.uuid })}
      key={item.uuid}
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
          </View>
        </View>

        <View className="w-[29%] justify-start items-end">
          <Text className="font-bold text-base">{item.symbol}</Text>

          <View className="flex-row justify-center items-center space-x-2">
            <Text className="font-medium text-sm text-neutral-500">
              {item?.marketCap.length > 9
                ? item?.marketCap.slice(0, 9)
                : item?.marketCap}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );

  const handleSearch = async (search: string) => {
    if (search && search.length > 2) {
      setIsLoading(true);

      try {
        const searchCoinResults = await SearchCoin(search);

        if (searchCoinResults) {
          setResults(searchCoinResults);
        }
      } catch (error) {
        console.log(error);
        setResults([]);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 pb-4">
        <View className="w-3/4 flex-row space-x-2">
          <Text className="text-3xl font-bold">Search</Text>
        </View>
      </View>

      {/* Search Field */}
      <View className="mx-4 mb-3 flex-row p-2 border-2 justify-between items-center bg-white rounded-lg shadow-sm">
        {/* .tracking-wider <=> letter-spacing: 0.05em; */}
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your coins"
          placeholderTextColor="gray"
          className="pl-2 flex-1 font-medium text-black tracking-wider"
        />

        <Pressable onPress={() => navigateHome("HomeScreen")}>
          <XMarkIcon size={25} color="black" />
        </Pressable>
      </View>

      <View className="mt-4">
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#164bd8" />
          </View>
        ) : (
          // Flatlist to display data and lazy load data
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={results?.data?.coins}
            keyExtractor={(item) => item.uuid}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
