// src/lib/auth.ts
import { supabase } from "./supabaseClient";

/**
 * Sign up a new user AND insert into students table
 * @param email - The user's email
 * @param password - The user's password
 * @param name - The user's name
 */
export const signUp = async (email: string, password: string, name: string) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;

  const user = signUpData.user;

  if (user) {
    const { error: insertError } = await supabase.from("students").insert({
      id: user.id,            // match Supabase auth.uid
      email: user.email,
      name: name,
      profile_image: "",      // optional: placeholder
      bio: "",                // optional: empty by default
      total_hours: 0,
    });

    if (insertError) throw insertError;
  }

  return signUpData;
};

/**
 * Log in an existing user
 * @param email - The user's email
 * @param password - The user's password
 */
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
