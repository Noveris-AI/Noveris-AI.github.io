/**
 * Supabase Server Client
 * For server-side operations (Route Handlers, Server Components, Server Actions)
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * Get or create user in our database from Supabase auth user
 */
export async function getOrCreateDbUser(supabaseUserId: string) {
  const prisma = await import("@/lib/db").then((m) => m.default);

  let user = await prisma.user.findUnique({
    where: { supabaseId: supabaseUserId },
  });

  if (!user) {
    // Fetch user details from Supabase
    const supabase = await createClient();
    const { data: supabaseUser } = await supabase.auth.getUser();

    if (supabaseUser.user) {
      user = await prisma.user.create({
        data: {
          supabaseId: supabaseUserId,
          email: supabaseUser.user.email,
          name: supabaseUser.user.user_metadata?.full_name || supabaseUser.user.email?.split("@")[0],
          preferences: {
            create: {
              preferredProvider: "qwen",  // 默认使用阿里云通义千问
              defaultTone: "sincere",
              saveRawInputs: false,
              enableAnalytics: true,
            },
          },
        },
      });
    }
  }

  return user;
}
