/* Gympath demo auth — front-end only (localStorage).
   NOTE: this is a UI/demo store. Real auth will call the FastAPI backend
   (/auth/register, /auth/login, /auth/me, JWT). Passwords here are NOT secure
   and are kept only so the demo profile/orders persist in the browser. */
const GP = (() => {
  const USERS = 'gp_users';
  const SESSION = 'gp_session';

  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  function users() { return read(USERS, []); }
  function saveUsers(u) { write(USERS, u); }

  function currentUser() {
    const email = read(SESSION, null);
    if (!email) return null;
    return users().find(u => u.email === email) || null;
  }

  function register({ name, email, password }) {
    email = email.trim().toLowerCase();
    const all = users();
    if (all.some(u => u.email === email)) throw new Error('Энэ имэйл бүртгэлтэй байна');
    const user = {
      name: name.trim(), email, password,
      plan: 'Free', orders: [], createdAt: new Date().toISOString(),
    };
    all.push(user); saveUsers(all); write(SESSION, email);
    return user;
  }

  function login({ email, password }) {
    email = email.trim().toLowerCase();
    const user = users().find(u => u.email === email);
    if (!user || user.password !== password) throw new Error('Имэйл эсвэл нууц үг буруу');
    write(SESSION, email);
    return user;
  }

  function logout() { localStorage.removeItem(SESSION); }

  function update(patch) {
    const all = users(); const cur = currentUser();
    if (!cur) return null;
    Object.assign(cur, patch);
    const i = all.findIndex(u => u.email === cur.email);
    all[i] = cur; saveUsers(all);
    return cur;
  }

  function setPlan(plan) { return update({ plan }); }

  function addOrder(order) {
    const cur = currentUser(); if (!cur) return null;
    const orders = cur.orders || [];
    orders.unshift({ ...order, id: 'GP' + Date.now().toString().slice(-6), date: new Date().toISOString() });
    return update({ orders });
  }

  // render the nav auth area on any page that has #navAuth
  function renderNav() {
    const el = document.getElementById('navAuth');
    if (!el) return;
    const u = currentUser();
    if (u) {
      el.innerHTML =
        `<a href="profile.html" class="nav-user" title="Профайл">${u.name.split(' ')[0]}</a>` +
        `<a href="#" id="navLogout" class="nav-cta">Гарах</a>`;
      const lo = document.getElementById('navLogout');
      if (lo) lo.addEventListener('click', (e) => { e.preventDefault(); logout(); location.href = 'index.html'; });
    } else {
      el.innerHTML = `<a href="account.html" class="nav-cta">Нэвтрэх</a>`;
    }
  }

  return { currentUser, register, login, logout, update, setPlan, addOrder, renderNav };
})();

document.addEventListener('DOMContentLoaded', () => GP.renderNav());
