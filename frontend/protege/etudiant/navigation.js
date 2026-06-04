function navigate(page) {
    const basePath = window.location.pathname.split("/etudiant/")[0];
    window.location.href = `${basePath}/etudiant/${page}/${page}.html`;
}
function logout() {
    const basePath = window.location.pathname.split("/frontend/")[0];
    window.location.href = `/frontend/public/login/login.html`;
}