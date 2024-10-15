import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import NewsDetailsScreen from "../../stacks/NewsDetailsScreen";
import NewsScreen from "../../tabs/news/NewsScreen";

const Stack = createStackNavigator();

const NewsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
