import { isAuth } from "../../../auth/scripts/auth"

const getprofileEndpoint = 'https://api-rest-emprendi.onrender.com/profiles/:id'
const params = new URLSearchParams(window.location.search)
const valor = params.get("profile")
(async ()=>{

    const {isUsertAuht, session } = await isAuth()
    if(!isUsertAuht) return;
    const response = await fetch(getProfileEndpoint, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });
    if(!response.ok) return;
})

 