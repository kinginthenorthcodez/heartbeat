import { supabaseAdmin } from "../db/server";

//Function can export a server component, but not a client component. Please remove the "use client" directive from the file to resolve this issue

type User = {
  id: number;

  name: string;
};

export async function getUsers() {
  const { data, error } = await supabaseAdmin.from("users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addUser(user: User) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert(user)
    .select("*")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
