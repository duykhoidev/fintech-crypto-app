import { FetchCoinDetails, FetchCoinHistory } from "@/utils/cryptoapi";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Image } from "expo-image";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartesianChart, Line, useChartPressState } from "victory-native";

const CoinDetailsScreen = () => {
  const [lineData, setLineData] = useState<any>([]);
  const [item, setItem] = useState<any>({});
  const navigation = useNavigation();

  const {
    params: { coinUuid },
  } = useRoute();

  const font = useFont(
    require("../../../assets/fonts/PlusJakartaSans-Regular.ttf"),
    12
  );

  // Destructure 2 values (state & isActive) from useChartPressState
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  function ToolTip({
    x,
    y,
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return <Circle cx={x} cy={y} r={8} color="red" />;
  }

  const blurharsh =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const { data: CoinsDetails, isLoading: IsCoinDetailsLoading } = useQuery({
    queryKey: ["CoinDetails", coinUuid],
    queryFn: () => coinUuid && FetchCoinDetails(coinUuid), // When coinUuid is true then call FetchCoinDetails function
  });

  const { data: CoinsHistory, isLoading: IsCoinHistoryLoading } = useQuery({
    queryKey: ["CoinHistory", coinUuid],
    queryFn: () => coinUuid && FetchCoinHistory(coinUuid), // When coinUuid is true then call FetchCoinDetails function
  });

  useEffect(() => {
    // https://rapidapi.com/Coinranking/api/coinranking1/playground/apiendpoint_cb39605c-7d57-472d-b0d6-4873d1e6e8db
    // Go to the link to know why CoinsHistory.data.history (Look API Response)

    if (CoinsHistory && CoinsHistory.data.history) {
      const datasets = CoinsHistory.data.history.map((item: any) => ({
        price: parseFloat(item.price),
        timestamp: item.timestamp,
      }));

      setLineData(datasets);
    }

    // https://rapidapi.com/Coinranking/api/coinranking1/playground/apiendpoint_df8ce38f-24c3-402c-917d-daca54129fa4
    // Go to the link to know why CoinDetails.data.coin (Look API Response)
    if (CoinsDetails && CoinsDetails.data.coin) {
      setItem(CoinsDetails.data.coin);
    }
  }, [CoinsDetails, CoinsHistory]);

  return (
    // flex-1 is a shorthand for setting equal flex grow, flex shrink, and flex basis values.
    <View className="flex-1 bg-white">
      {IsCoinDetailsLoading || IsCoinHistoryLoading ? (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]"></View>

          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      ) : (
        <SafeAreaView>
          {/* flex-direction: row => Arrange items horizontally */}
          <View className="flex-row items-center justify-between px-4">
            <Pressable
              className="border-2 border-neutral-500 rounded-full p-1"
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="gray"
              />
            </Pressable>

            <View>
              <Text className="font-bold text-lg">{item.symbol}</Text>
            </View>

            <View className="border-2 border-neutral-500 rounded-full p-1">
              <Entypo name="dots-three-horizontal" size={24} color="gray" />
            </View>
          </View>

          <View className="px-4 items-center justify-center py-2">
            <Text className="font-extrabold text-2xl">
              {numeral(parseFloat(item?.price)).format("$0,0.00")}
            </Text>
          </View>

          {item && (
            <View className="flex-row justify-center items-center space-x-2 px-4 py-2">
              <View className="flex-row w-full py-4 items-center">
                <View className="w-[16%]">
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
                      {item.marketCap.length > 9
                        ? item.marketCap.slice(0, 9)
                        : item.marketCap}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}

      {/* Chart */}
      <View style={{ height: 500, paddingHorizontal: 10 }}>
        {lineData?.length > 0 && (
          <CartesianChart
            chartPressState={state}
            axisOptions={{
              font,
              tickCount: 8,
              labelOffset: { x: -1, y: 0 },
              labelColor: "green",
              formatXLabel: (ms) => format(new Date(ms * 1000), "MM/dd"),
            }}
            data={lineData}
            xKey="timestamp"
            yKeys={["price"]}
          >
            {({ points }) => (
              <>
                <Line points={points.price} color="green" strokeWidth={2} />
                {isActive && (
                  <ToolTip x={state.x.position} y={state.y.price.position} />
                )}
              </>
            )}
          </CartesianChart>
        )}
      </View>

      <View className="px-4 py-4">
        {/* All Time High */}
        <View className="flex-row justify-between">
          <Text className="text-base font-bold text-neutral-500">
            All Time High
          </Text>

          <Text className="font-bold text-base">
            {numeral(parseFloat(item?.allTimeHigh?.price)).format("$0,0.00")}
          </Text>
        </View>

        <View className="flex-row justify-between">
          {/* Number of Markets */}
          <Text className="text-base font-bold text-neutral-500">
            Number of Markets
          </Text>

          <Text className="font-bold text-base">
            {numeral(parseFloat(item?.numberOfMarkets)).format("0,0.00")}
          </Text>
        </View>

        <View className="flex-row justify-between">
          {/* Number of Exchanges */}
          <Text className="text-base font-bold text-neutral-500">
            Number of Exchanges
          </Text>

          <Text className="font-bold text-base">
            {numeral(parseFloat(item?.numberOfExchanges)).format("0,0.00")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CoinDetailsScreen;
