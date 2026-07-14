import { createBrowserClient } from "@supabase/ssr";

function createFallbackClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: { user: null, session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ error: null }),
      update: async () => ({ error: null }),
      delete: async () => ({ error: null }),
      eq: () => ({
        select: async () => ({ data: [], error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
        order: async () => ({ data: [], error: null }),
        update: async () => ({ error: null }),
        delete: async () => ({ error: null }),
      }),
      order: async () => ({ data: [], error: null }),
      maybeSingle: async () => ({ data: null, error: null }),
    }),
  } as any;
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return createFallbackClient();
  }

  return createBrowserClient(url, key);
}
