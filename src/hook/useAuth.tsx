import { Subscription } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { supabase } from "src/lib/supabase";

export const useAuth = () => {
  const { pathname, push, reload } = useRouter();

  const user = supabase.auth.user();

  const signInWithEmail = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw new Error("サインインに失敗しました");
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error("サインアップに失敗しました");
    }
  };

  const signInWithGoogle = async () => {
    const { user, error } = await supabase.auth.signIn({
      provider: "google",
    });

    console.log(user);
    console.log(error);

    if (error) {
      throw new Error("googleアカウントでのサインインに失敗しました");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error("サインアップに失敗しました");
    }
  };

  const validateSession = async () => {
    const user = supabase.auth.user();
    if (!user && pathname !== "/auth") {
      await push("/auth?type=signin");
    }
  };

  const authListener = (): Subscription | null => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("LOGIN");

        push("/");
      }
      if (event === "SIGNED_OUT") {
        console.log("SIGN OUT");
        reload();
      }
    });
    return data;
  };

  return {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    authListener,
    validateSession,
  };
};
