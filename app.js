var spa = null;
(function () {
     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               var sauna = require("./libs/sauna");
               spa = sauna(document.getElementById("app"));
               spa.n.navigate("views/setting"); 
          }
     };
})();
