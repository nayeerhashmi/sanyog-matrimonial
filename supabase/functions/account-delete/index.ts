import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigin = "https://nayeerhashmi.github.io";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Vary": "Origin",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");
  if (origin && origin !== allowedOrigin) return reply({ error: "Origin not allowed." }, 403);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Method not allowed." }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("Authorization");
  if (!url || !anonKey || !serviceKey) return reply({ error: "Server configuration is incomplete." }, 500);
  if (!authHeader?.startsWith("Bearer ")) return reply({ error: "Sign in is required." }, 401);

  let body: { confirmation?: string };
  try {
    body = await req.json();
  } catch {
    return reply({ error: "A valid confirmation request is required." }, 400);
  }
  if (body.confirmation !== "DELETE MY ACCOUNT") {
    return reply({ error: 'Type "DELETE MY ACCOUNT" to confirm deletion.' }, 400);
  }

  const accessToken = authHeader.slice("Bearer ".length);
  const userClient = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const [{ data: userData, error: userError }, { data: claimsData, error: claimsError }] = await Promise.all([
    userClient.auth.getUser(),
    userClient.auth.getClaims(accessToken),
  ]);
  if (userError || claimsError || !userData.user) {
    return reply({ error: "Your session is invalid or expired. Sign in again." }, 401);
  }

  const authTime = Number(claimsData?.claims?.auth_time);
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(authTime) || authTime > nowSeconds || nowSeconds - authTime > 10 * 60) {
    return reply({ error: "For your protection, sign in again immediately before requesting account deletion." },  reauthStatus());
  }

  const userId = userData.user.id;
  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Capture only files inside this authenticated user's private folder.
  const bucket = admin.storage.from("member-photos");
  const { data: objects, error: listError } = await bucket.list(userId, {
    limit: 1000,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });
  if (listError) return reply({ error: "Could not verify your private photo files. No account was deleted." }, 500);

  const paths = (objects ?? [])
    .filter((item) => item.name && item.id)
    .map((item) => userId + "/" + item.name);

  // Delete the authenticated account. Database rows with ON DELETE CASCADE are removed by PostgreSQL.
  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) return reply({ error: "Account deletion could not be completed. Your account remains active. Please contact support." }, 500);

  // Private photos are removed after auth deletion. If storage cleanup fails, they remain private
  // and inaccessible to the deleted account; report this for operator follow-up.
  let photoCleanupWarning: string | null = null;
  if (paths.length) {
    const { error: removeError } = await bucket.remove(paths);
    if (removeError) photoCleanupWarning = "Your account was deleted, but private photo cleanup needs operator follow-up.";
  }

  return reply({
    success: true,
    message: "Your Sanyog account has been deleted.",
    photo_cleanup_warning: photoCleanupWarning,
  });
});

function reauthStatus() {
  return 403;
}
