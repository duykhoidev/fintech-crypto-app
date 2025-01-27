import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// New Credentials for supabase 
const supabaseUrl = "https://dipwxhxnikpljhncxvlj.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcHd4aHhuaWtwbGpobmN4dmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzM3OTAsImV4cCI6MjA1MzU0OTc5MH0.se_f3nx3BiTjxD06OKqCxD4r7hKWbDhpF8_zWJkybSc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
