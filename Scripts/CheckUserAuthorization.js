﻿(function ( flyingDutchman,underForeignFlag, $, document) {
    let user = window.sessionStorage.getItem("FlyingDutchManUser");
    if(!user){
        //Redirect to User View
        let restoreLanguage = window.sessionStorage.getItem("SelectedLanguage");
        window.sessionStorage.clear();
        if(restoreLanguage){
            window.sessionStorage.setItem("SelectedLanguage",restoreLanguage)
        }
        //Redirect to login page
        let url = window.location.href; // current url
        let splittedUrl = url.split("?");
        let finalUrl = "";
        let mainUrl = splittedUrl[0].split("/");
        for(let i = 0; i < mainUrl.length-2; i++ ){
            finalUrl += mainUrl[i] + "/";
        }
        finalUrl += "LogIn" + "/Index.html";
        if(restoreLanguage){
            finalUrl = finalUrl +"?"+"lang="+restoreLanguage;
        }
        else{
            finalUrl = finalUrl +"?"+"lang="+"en-GB";
        }
        window.location.href = finalUrl;
    }
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));