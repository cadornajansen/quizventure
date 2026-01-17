const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  const { name, email, password } = JSON.parse(event.body || "{}");

  if (!name || !email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Missing fields" })
    };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name }
  });

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
