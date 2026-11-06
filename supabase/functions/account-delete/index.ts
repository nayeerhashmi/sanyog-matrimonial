import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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
  const userId = userData.user.id;

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Remove only objects under this authenticated user's UUID folder.
  const bucket = admin.storage.from("member-photos");
  let offset = 0;
  const pageSize = 100;
  while (true) {
    const { data: objects, error: listError } = await bucket.list(userId, {
      limit: pageSize,
      offset,
      sortBy: { column: "name", order: "asc" },
    });
    if (listError) return response({ error: "Could not safely complete photo cleanup. No account was deleted." }, 500);
    if (!objects?.length) break;

    const paths = objects
      .filter((item) => item.name && item.name !== ".")
      .map((item) => userId + "/" + item.name);

    if (paths.length) {
      const { error: removeError } = await bucket.remove(paths);
      if (removeError) return response({ error: "Could not safely remove private photos. No account was deleted." }, 500);
    }
    if (objects.length < pageSize) break;
    offset += pageSize;
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    return response({ error: "Private photo cleanup completed, but account deletion failed. Contact support before retrying." }, 500);
  }

  return response({
    success: true,
    message: "Your Sanyog account has been deleted. Your profile and related account records are removed through database foreign-key cleanup.",
  });
});
