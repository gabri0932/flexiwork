import { isAuth } from "../../../auth/scripts/auth"

const getprofileEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/'
const params = new URLSearchParams(window.location.search)
const valor = params.get("profile") //recuperamos el valor de la url 
if(!valor){
    console.log("Error con la busqueda del parametro")
}else{
    console.log(valor)
}
(async ()=>{

    const {isUserAuth, session } = await isAuth()
    if(!isUserAuth) return;
    const response = await fetch(`${getprofileEndpoint}/${valor}`, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });
    if(!response.ok) return;
    const json = await response.json()
    console.log(json)
    

})

 