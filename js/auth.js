/*
  Simple client-side auth for a static site (no server).
  - Users are stored in localStorage (key: qv_users)
  - Current session is stored in localStorage (key: qv_session)

  NOTE: This is fine for school/demo projects, but NOT secure for production.
*/

const QV_KEYS = {
  users: 'qv_users',
  session: 'qv_session'
};

function qvLoadUsers() {
  try {
    const raw = localStorage.getItem(QV_KEYS.users);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function qvSaveUsers(users) {
  localStorage.setItem(QV_KEYS.users, JSON.stringify(users));
}

function qvNormalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function qvSetSession(email) {
  localStorage.setItem(QV_KEYS.session, qvNormalizeEmail(email));
}

function qvClearSession() {
  localStorage.removeItem(QV_KEYS.session);
}

function qvGetSessionEmail() {
  return qvNormalizeEmail(localStorage.getItem(QV_KEYS.session));
}

function qvGetCurrentUser() {
  const users = qvLoadUsers();
  const email = qvGetSessionEmail();
  return email && users[email] ? users[email] : null;
}

// Convenience: get current identity (for attaching email/name to stats, etc.)
function qvGetIdentity() {
  const user = qvGetCurrentUser();
  return {
    email: (user && user.email) ? user.email : qvGetSessionEmail(),
    name: (user && user.name) ? user.name : ''
  };
}


function qvSignup({ name, email, password }) {
  const users = qvLoadUsers();
  const normalizedEmail = qvNormalizeEmail(email);

  if (!name || !normalizedEmail || !password) {
    return { ok: false, error: 'Please fill out all fields.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }
  if (users[normalizedEmail]) {
    return { ok: false, error: 'An account with that email already exists.' };
  }

  users[normalizedEmail] = {
    name: String(name).trim(),
    email: normalizedEmail,
    password: String(password) // demo only
  };

  qvSaveUsers(users);
  qvSetSession(normalizedEmail);
  return { ok: true };
}

function qvLogin({ email, password }) {
  const users = qvLoadUsers();
  const normalizedEmail = qvNormalizeEmail(email);

  if (!normalizedEmail || !password) {
    return { ok: false, error: 'Please enter your email and password.' };
  }

  const user = users[normalizedEmail];
  if (!user || user.password !== String(password)) {
    return { ok: false, error: 'Incorrect email or password.' };
  }

  qvSetSession(normalizedEmail);
  return { ok: true };
}

function qvLogout() {
  qvClearSession();
}

function qvRequireAuth({ redirectTo = 'login.html' } = {}) {
  const user = qvGetCurrentUser();
  if (!user) {
    const current = location.pathname.split('/').pop() || 'index.html';
    const url = `${redirectTo}?next=${encodeURIComponent(current)}`;
    location.replace(url);
    return false;
  }
  return true;
}
