import { checkAuth } from "../../../js/auth";

const user = checkAuth();
if (user != "directeur") {
    alert("acces refuse")
}