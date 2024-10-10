import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";

export default function useSupabaseAuth() {
  const { session, setSession, setUser } = useUserStore();

  async function signInWithEmail(email: string, password: string) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      error,
      data,
    };
  }

  async function signUpWithEmail(email: string, password: string) {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    return {
      error,
      data,
    };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      setUser(null);
    }

    return {
      error,
    };
  }

  
}
