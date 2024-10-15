import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import Avatar from "@/src/components/Avatar";
import Button from "@/src/components/Button";
import { useUserStore } from "@/store/useUserStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useUserStore();
  const { getUserProfile, updateUserProfile } = useSupabaseAuth();
  const navigation = useNavigation();

  async function handleGetProfile() {
    setIsLoading(true);

    try {
      const { data, error, status } = await getUserProfile();

      // 406 Not Acceptable
      if (error && status !== 406) {
        setIsLoading(false);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
        console.log("Avatar URL:", data.avatar_url); // Add this line
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateProfile() {
    setIsLoading(true);

    try {
      const { error } = await updateUserProfile(username, fullName, avatarUrl);

      if (error) {
        setIsLoading(false);
        Alert.alert(`Profile Update Failed ${error}`);
      } else {
        Alert.alert("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (session) {
        handleGetProfile();
      }
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <View className="flex-row item-center justify-between px-4">
          <View className="w-1/3">
            <Pressable onPress={() => navigation.goBack()}>
              <View className="border-2 border-neutral-500 h-10 w-10 p-2 rounded-full items-center justify-center">
                <ChevronLeftIcon size={30} strokeWidth={3} color="gray" />
              </View>
            </Pressable>
          </View>

          <View className="w-1/3">
            <Text className="text-xl font-bold">Edit Profile</Text>
          </View>

          <View className="w-1/3"></View>
        </View>

        {/* Avatar */}
        <View className="justify-center items-center py-2">
          <View className="overflow-hidden border-2 border-[#2ab07c] rounded-3xl">
            <Avatar
              size={100}
              url={avatarUrl}
              showUpload={true}
              onUpload={(url: string) => {
                setAvatarUrl(url);
              }}
            />
          </View>
        </View>

        <View className="px-4">
          {/* Email */}
          <View>
            <Input label="Email" value={session?.user?.email} disabled />
          </View>

          {/* Username */}
          <View>
            <Input
              label="Username"
              value={username || ""}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          {/* Full name */}
          <View>
            <Input
              label="Fullname"
              value={fullName || ""}
              onChangeText={(text) => setFullName(text)}
            />
          </View>

          <Button
            title={isLoading ? <ActivityIndicator color="white" /> : "Update"}
            action={() => handleUpdateProfile()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
