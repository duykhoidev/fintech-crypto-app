import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://tfsfbwkzzskqzvvrayev.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmc2Zid2t6enNrcXp2dnJheWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NzI1NzksImV4cCI6MjA0NDE0ODU3OX0.dNOBTRf1qkTFVaA0U14aoO2vtrF5MkbaorSGYozau8g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
