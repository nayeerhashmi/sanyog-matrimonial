import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://nayeerhashmi.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return response({ error: "Method not allowed." }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("Authorization");
  if (!url || !anonKey || !serviceKey) return response({ error: "Server configuration is incomplete." }, 500);
  if (!authHeader?.startsWith("Bearer ")) return response({ error: "Sign in is required." }, 401);

  const userClient = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await userClient.auth.getUser();
  if (userError || !userData.user) return response({ error: "Your session is invalid or expired." }, 401);
  const user = userData.user;

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const [profileResult, reportsResult, blocksResult] = await Promise.all([
    admin.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
    admin.from("member_reports").select("id, reported_user_id, category, description, status, created_at, updated_at").eq("reporter_id", user.id).order("created_at", { ascending: false }),
    admin.from("member_blocks").select("blocked_user_id, created_at").eq("blocker_id", user.id).order("created_at", { ascending: false }),
  ]);

  if (profileResult.error || reportsResult.error || blocksResult.error) {
    return response({ error: "Could not prepare your data export. Please contact support." }, 500);
  }

  const photoPaths = [
    profileResult.data?.photo_close_up_path,
    profileResult.data?.photo_half_length_path,
    profileResult.data?.photo_full_length_path,
  ].filter((path): path is string => typeof path === "string" && path.startsWith(user.id + "/"));

  const photoDownloads = [];
  for (const path of photoPaths) {
    const { data, error } = await admin.storage.from("member-photos").createSignedUrl(path, 300);
    photoDownloads.push({
      storage_path: path,
      download_url: error ? null : data.signedUrl,
      expires_in_seconds: error ? null : 300,
    });
  }

  return response({
    exported_at: new Date().toISOString(),
    notice: "This export contains account data available in Sanyog's current database. Photo links expire after five minutes.",
    account: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      user_metadata: user.user_metadata,
    },
    profile: profileResult.data,
    submitted_reports: reportsResult.data,
    blocks_created_by_you: blocksResult.data,
    private_photo_downloads: photoDownloads,
  });
});
