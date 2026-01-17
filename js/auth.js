/*
  Supabase authentication for Quizventure
  - Uses Netlify serverless functions as proxy to Supabase
  - Token stored in localStorage
  - Secure production-ready authentication
*/

const QV_KEYS = {
  token: 'qv_token',
  user: 'qv_user',
  session: 'qv_session'
};

const API_BASE = '/.netlify/functions';

// Load user from localStorage
function qvLoadUser() {
  try {
    const raw = localStorage.getItem(QV_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Save user to localStorage
function qvSaveUser(user) {
  localStorage.setItem(QV_KEYS.user, JSON.stringify(user));
}

// Get stored token
function qvGetToken() {
  return localStorage.getItem(QV_KEYS.token);
}

// Set token
function qvSetToken(token) {
  localStorage.setItem(QV_KEYS.token, token);
}

// Clear session
function qvClearSession() {
  localStorage.removeItem(QV_KEYS.token);
  localStorage.removeItem(QV_KEYS.user);
}

// Get current user
function qvGetCurrentUser() {
  return qvLoadUser();
}

// Normalize email
function qvNormalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

// Get current identity
function qvGetIdentity() {
  const user = qvGetCurrentUser();
  return {
    email: user?.email || '',
    name: user?.name || ''
  };
}

// Signup via Supabase function
async function qvSignup({ name, email, password }) {
  if (!name || !email || !password) {
    return { ok: false, error: 'Please fill out all fields.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }

  try {
    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (!data.ok) {
      return { ok: false, error: data.error || 'Signup failed' };
    }

    // After signup, automatically log them in
    return qvLogin({ email, password });
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// Login via Supabase function
async function qvLogin({ email, password }) {
  if (!email || !password) {
    return { ok: false, error: 'Please enter your email and password.' };
  }

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!data.ok) {
      return { ok: false, error: data.error || 'Login failed' };
    }

    // Store token and user info
    qvSetToken(data.access_token);
    qvSaveUser({ email, name: email.split('@')[0] });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// Logout
function qvLogout() {
  qvClearSession();
}

// Require authentication guard
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

