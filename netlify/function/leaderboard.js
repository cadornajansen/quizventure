const { createClient } = require("@supabase/supabase-js");

exports.handler = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data } = await supabase
    .from("leaderboard")
    .select("score, profiles(name)")
    .order("score", { ascending: false })
    .limit(50);

  return {
    statusCode: 200,
    body: JSON.stringify(data.map(r => ({
      name: r.profiles.name,
      score: r.score
    })))
  };
};
