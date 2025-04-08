let mode = "production"



let platformName, bussinesWebsite, serverDomain;

if (mode ==="production"){
    
    platformName = "TurTra"
    bussinesWebsite = "https://www.google.com/"
    serverDomain = "https://server-login-mern.onrender.com"

}else{
    platformName = "TurTra"
    bussinesWebsite = "https://www.google.com/"
    serverDomain = "localhost:8080"
    

}

export {platformName, bussinesWebsite, serverDomain}  
