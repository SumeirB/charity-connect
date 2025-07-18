// src/lib/auth.ts
import { supabase } from "./supabaseClient";

/**
 * Sign up a new user
 * @param email - The user's email
 * @param password - The user's password
 */
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
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
