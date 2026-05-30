const token = localStorage.getItem("token");
if (!token ) {
    alert("access refuse");
    window.location.href = "../../../public/login/login.html";
}else{
    console.log(JSON.parse(atob(token.split('.')[1])).role)
    const role = JSON.parse(atob(token.split('.')[1])).role;
    if (role !== "caissier") {
        alert("vous ne pouver voir la page");
        if (role == "directeur") {
            window.location.href = "../../finance/tableauDeBord/tableauDeBord.html";
        }else{
            window.location.href = "../../etudiant/dashboard/dashboard.html";
        }
    }
}

const links = document.getElementsByClassName("link");
const myTableLinks = Array.from(links); 
myTableLinks.forEach(i=>{
    const id = i.getAttribute("id");
    console.log(id);
    i.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.href = `../${id}/${id}.html`;
    })
})