export function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../login/login.html";
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  }
}
export function logout(){
    localStorage.removeItem("token");
    window.location.href = "../../public/login.html";
}