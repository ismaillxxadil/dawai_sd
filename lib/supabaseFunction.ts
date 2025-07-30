import { User } from "@/app/store/useUserStore";
import { supabase } from "./supabase";
export type RoleType = "customer" | "pharmacist";

// get user data
export async function getCurrentUserProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { profile: null, error: userError };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return { profile, error: profileError };
}
export async function getProfile({ id }: { id: string }) {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  return { profile, error: profileError };
}

//log out
export async function logOut() {
  const { error: logoutError } = await supabase.auth.signOut();

  return { logoutError };
}

//signup with email
export async function signUp({
  email,
  password,
  role,

  name,
}: {
  email: string;
  password: string;
  role: RoleType;

  name: string;
}): Promise<{ error: string | null; success: boolean; dataId: string | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message, success: false, dataId: null };
  }

  if (!data.user?.id) {
    return { error: "User ID not found", success: false, dataId: null };
  }

  const { error: profilesError } = await supabase.from("profiles").insert([
    {
      role: role.trim(),
      name: name.trim(),
      user_id: data.user.id,
      img: " ",
    },
  ]);

  if (profilesError) {
    return { error: profilesError.message, success: false, dataId: null };
  } else {
    return { error: null, success: true, dataId: data.user.id };
  }
}

//#############################################
//LOG IN WITH EMAIL
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ error: string | null; data: User | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { error: error.message, data: null };
  const user = data.user;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("name, role, img, id")
    .eq("user_id", user?.id)
    .single();

  if (profileError) return { error: profileError.message, data: null };

  return { error: null, data: { ...profile, id: user?.id, email } };
}
