const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  const token = event.headers.authorization?.replace("Bearer ", "");
  const { score, quiz = "bimo" } = JSON.parse(event.body || "{}");

  if (!token) {
    return { statusCode: 401, body: "No token" };
  }

  const supabaseUser = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: userData } = await supabaseUser.auth.getUser();
  const userId = userData?.user?.id;

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: existing } = await supabaseAdmin
    .from("leaderboard")
    .select("score")
    .eq("user_id", userId)
    .eq("quiz", quiz)
    .maybeSingle();

  const best = Math.max(existing?.score || 0, score);

  await supabaseAdmin
    .from("leaderboard")
    .upsert({ user_id: userId, quiz, score: best });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, best })
  };
};
