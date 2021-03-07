﻿(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.Main = {
        SetMainBodyHeight: function(){
            let mainToolbar = $(document).find(".main-toolbar");
            let mainfooter = $(document).find(".main-footer");
            let totalHeight = mainToolbar.outerHeight()+mainfooter.outerHeight();
            let mainBodyHeight = $( window ).height()-totalHeight;
            let mainBody = $(document).find(".main-body");
            mainBody.css("max-height",mainBodyHeight);

            mainBody.css("overflow-x","hidden");
            mainBody.css("overflow-y","auto");


        },
        LoadUsername: function(){
            let userMenuText = underForeignFlag.Main.GetTranslationText("Menu");
            let userLabel = $(document).find(".user-label");
            let user = window.localStorage.getItem("FlyingDutchManUser");
            if(user){
                //Get the user Name and put user name on the Menu
            let userObject =    JSON.parse(user)
            if(userObject){
                let userName = userObject.first_name+ " " + userObject.last_name
                userLabel.text(userName)
            }
            }
            else{
                userLabel.text(userMenuText)
            }

        },
        LoadOrderQuantity: function () {
            //Get the quantity from the local storage
            let orderedItem = window.localStorage.getItem("OrderItems");
            let quantity = ""
            if(orderedItem){
                let totalItems = 0;
                let convertedOrder = JSON.parse(orderedItem);
                for(let i=0 ; i<convertedOrder.length;i++){
                    let item = JSON.parse(convertedOrder[i]);
                    totalItems+= parseInt(item.quantity);
                }
                if(totalItems > 0){
                    quantity = totalItems
                }
            }
            let quantityElement = $(document).find(".order-cart-container");
            if(quantityElement.length> 0){
                quantityElement.find(".total-qty").text(quantity)
            }
        },
        SiteTranslation:function(){
            //Get the text from resources file
            let items = $(document).find(".key-text");
            for(let i = 0; i < items.length; i++) {
                let key = $(items[i]).text();
                //Get the translated text from dictionary
               $(items[i]).text(underForeignFlag.Main.GetTranslationText(key));
               let placeholder = $(items[i]).attr('placeholder');
               if(placeholder){

                   $(items[i]).attr("placeholder", underForeignFlag.Main.GetTranslationText(placeholder))
               }
            }
        },
        ReloadUrl : function(){
            let url = window.location.href.trim();
            let language = underForeignFlag.Main.GetSelectedUi().trim();
            let urlSplit = url.split('?')
            let finalUrl =urlSplit[0]+"?"+"lang="+language;
            if(url!= finalUrl){
                window.location.href = finalUrl;
            }
        },
       /* LoadStartUrl : function(){
            let url = window.location.href.trim();
            let language = underForeignFlag.Main.GetSelectedUi().trim();
            let urlSplit = url.split('?')
            let mainSplittedUrl = urlSplit[0].split("/");
            let finalUrl = "";
            for(let i=0 ;i <mainSplittedUrl.length-2;i++){
                finalUrl+=mainSplittedUrl[i]+"/";
            }
            finalUrl+="Presentation/Index.html";
            finalUrl = finalUrl +"?"+"lang="+language;
            if(url!= finalUrl){
                window.location.href = finalUrl;
            }
        },*/
        GetSelectedUi: function(){
            let selectedLanguage = window.localStorage.getItem("SelectedLanguage");
            if(selectedLanguage){
                return selectedLanguage;
            }
            return "en-GB";
        },
        GetTranslationText:function(key){
            //Language Selected language
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            let translatedText = "";
            switch(selectedLanguage){
                case "en-GB" || "en" :
                    translatedText = underForeignFlag.Translation.enString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "sv" :
                    translatedText = underForeignFlag.Translation.svString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "bn" :
                    translatedText = underForeignFlag.Translation.bnString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "ur" :
                    translatedText = underForeignFlag.Translation.urString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "ru" :
                    translatedText = underForeignFlag.Translation.ruString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                default:
                    translatedText = underForeignFlag.Translation.enString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
            }

            return key;
        },
        SetLanguageFlag : function(){
            let language = $(document).find(".language-container");
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            if(language){
             let imagePath =  language.find(".img-icon").attr("src");

              let splittedItem = imagePath.split('/');
              let finalFlagUrl ="";
              for(let i = 0; i < splittedItem.length ; i++){
                  if(i== splittedItem.length-1){
                      finalFlagUrl+=selectedLanguage+".svg";
                  }
                  else{
                      finalFlagUrl+=splittedItem[i]+"/";
                  }
              }
              //
              language.find(".img-icon").attr("src",finalFlagUrl)
            }
        },
        RedirectUrl: function(controllerName)
        {
            // RedirectUrl
            let url = window.location.href; // current url
            let splittedUrl = url.split("?");
            let finalUrl = "";
            let mainUrl = splittedUrl[0].split("/");
            for(let i = 0; i < mainUrl.length-2; i++ ){
                finalUrl += mainUrl[i] + "/";
            }

            switch(controllerName){
                case "OrderCart":
                    finalUrl += "OrderCart" + "/Index.html";
                    break;

                case "Presentation":
                    finalUrl += "Presentation" + "/Index.html";
                    break;

                case "NodeView":
                    finalUrl += "Presentation" + "/NodeView.html";
                    break;

                case "LogIn":
                    finalUrl += "LogIn" + "/Index.html";
                    break;

                case "Help":
                    finalUrl += "Help" + "/Index.html";
                    break;
            }

            let language = underForeignFlag.Main.GetSelectedUi().trim();
            finalUrl = finalUrl +"?"+"lang="+language;

            window.location.href = finalUrl;

            //let  = ;
        },
        AddToOrderCart : function (item_nr,quantity){
            let orderedItem = [];
            let previousOrderedItem = window.localStorage.getItem("OrderItems");
            let found =false;
            if(previousOrderedItem){
                let convertedOrder = JSON.parse(previousOrderedItem);
                for(let i= 0 ; i< convertedOrder.length ; i++){
                    let item = JSON.parse(convertedOrder[i]);
                    if(item.item_nr == item_nr){
                        found = true;
                        item.quantity = quantity;
                        let convertedItem = JSON.stringify(item);
                        orderedItem.push(convertedItem);
                    }
                    else{
                        let convertedItem = JSON.stringify(item);
                        orderedItem.push(convertedItem);
                    }
                }
            }
            if(found == false){
                let item = {
                    "item_nr" :item_nr,
                    "quantity": quantity
                }
                let convertedItem = JSON.stringify(item);
                orderedItem.push(convertedItem);
            }
            window.localStorage.setItem("OrderItems",JSON.stringify(orderedItem));

        },
        DeleteFromOrderCart : function (items){
            let orderedItem = [];
            let previousOrderedItem = window.localStorage.getItem("OrderItems");
            let found =false;
            if(previousOrderedItem){
                let convertedOrder = JSON.parse(previousOrderedItem);
                for(let i= 0 ; i< convertedOrder.length ; i++){
                    let item = JSON.parse(convertedOrder[i]);

                    if(!items.includes(item.item_nr)){
                        let remainItem = JSON.stringify(item);
                        orderedItem.push(remainItem);
                    }

                }
            }
       if(orderedItem.length > 0)
            window.localStorage.setItem("OrderItems",JSON.stringify(orderedItem));
       else
           window.localStorage.removeItem("OrderItems");

        },


    };
    $(document).on("click", ".avatar-menu", function (e) {
        //User Menu
        let helpText = underForeignFlag.Main.GetTranslationText("Help");
        let loginkey ="SignIn";
        if(window.localStorage.getItem("FlyingDutchManUser")){
            loginkey="SignOut"
        }
        let loginText = underForeignFlag.Main.GetTranslationText(loginkey);
        let txt1 = "<ul class='under-foreign-flag-menu'>";
            txt1+="<li  class='help-item'>"+helpText+"</li>"
            txt1+="<li data-login='"+loginkey+"' class='log-in-item'>"+loginText+"</li>"
        txt1+="</ul>"
        let languageContainer = $(document).find(".avatar-menu");
        underForeignFlag.PopUp.Show(txt1,languageContainer,null)

    });
    $(document).on("click", ".help-item", function (e) {
        underForeignFlag.Main.RedirectUrl("Help");

    });
    $(document).on("click", ".log-in-item", function (e) {
        if($(this).data("login") != "SignIn"){
            window.localStorage.clear();
        }

        underForeignFlag.Main.RedirectUrl("LogIn");
    });
    $(document).on("click", ".language-container", function (e) {
         //Get Available languages
        let availableCulture = underForeignFlag.Cultures.availableCulture;
        let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
        let txt1 = "<ul class='under-foreign-flag-menu'>";
        for(let i =0;i< availableCulture.length;i++){
            let className = selectedLanguage == availableCulture[i] ? "language-item selected" : "language-item";
            /*Get Culture native name*/
          let culture =  jQuery.findClosestCulture(availableCulture[i]);
            txt1+="<li data-culture='"+availableCulture[i]+"' class='"+className +"'>"+culture.nativeName+"</li>"
        }

        txt1+="</ul>"
        let languageContainer = $(document).find(".language-container");
        underForeignFlag.PopUp.Show(txt1,languageContainer,null)

    });
    $(document).on("click", ".language-item", function (e) {
        //Get Available languages
       let selectedCulture = $(this).data("culture");
        window.localStorage.setItem("SelectedLanguage",selectedCulture);
        underForeignFlag.Main.ReloadUrl();

    });
    $(document).on("click", ".start-url", function (e) {
        //Redirect start view
      underForeignFlag.Main.RedirectUrl("Presentation");
    });
    $(document).on("click", ".category-menu", function (e) {
        //Redirect category view
        underForeignFlag.Main.RedirectUrl("Presentation");
    });
    $(document).on("click", ".soft-drink-menu", function (e) {
        //Redirect node view
        window.localStorage.removeItem("ItemQueryValue")
        window.localStorage.setItem("ItemQuery","SoftDrinks")
        underForeignFlag.Main.RedirectUrl("NodeView");
    });
    $(document).on("click", ".hard-drinks-menu", function (e) {
        //Get Available hard drinks
        window.localStorage.removeItem("ItemQueryValue")
        window.localStorage.setItem("ItemQuery","HardDrinks")
        underForeignFlag.Main.RedirectUrl("NodeView");
    });
    /*Input increment*/
    $(document).on("click", ".increase", function (e) {
        //Get quantity value
       let quantityElement = $(this).closest(".under-foreign-flag-quantity").find(".add-qty");
       let quantity =quantityElement.val()? parseInt(quantityElement.val())+1: 1;
        if(quantity > parseInt($(quantityElement).attr("max")) ){
            quantity= $(quantityElement).attr("max");
        }
        quantityElement.val(quantity);
        quantityElement.trigger("change");
    });
    $(document).on("click", ".decrease", function (e) {
        //Get quantity value
        let quantityElement = $(this).closest(".under-foreign-flag-quantity").find(".add-qty");
        let quantity =quantityElement.val() ? parseInt(quantityElement.val())-1 : 1;
        if(quantity < parseInt($(quantityElement).attr("min"))){
            quantity= $(quantityElement).attr("min");
        }
        quantityElement.val(quantity)
        quantityElement.trigger("change");
    });
    // Goto OrderCart func
    $(document).on("click", ".order-cart-container", function (e) {
        // onclick event for actions
        // class click -> calls the function
        // redirect to OrderView
        underForeignFlag.Main.RedirectUrl("OrderCart");


    });

    // Go to order end
    // The Search func
    $(document).on("click", ".toolbar-search-icon", function (e) {
       let searchText=$('.search-input').val()
        if (searchText.length>0){
            window.localStorage.setItem("ItemQueryValue",searchText)
            window.localStorage.setItem("ItemQuery","Search")
            underForeignFlag.Main.RedirectUrl("NodeView")

        }
    });
    $(document).on("keypress", ".search-input", function (e) {

        var code = e.which || e.keycode;
        if (code == 13) {
            let searchText=$('.search-input').val()
            if (searchText.length>0){
                window.localStorage.setItem("ItemQueryValue",searchText)
                window.localStorage.setItem("ItemQuery","Search")
                underForeignFlag.Main.RedirectUrl("NodeView")

            }
        }
    });
    // End of Search func



    $(function () {
        underForeignFlag.Main.LoadOrderQuantity();
        underForeignFlag.Main.SiteTranslation();
        underForeignFlag.Main.SetLanguageFlag();
        underForeignFlag.Main.ReloadUrl();
        underForeignFlag.Main.LoadUsername()
    });

}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));