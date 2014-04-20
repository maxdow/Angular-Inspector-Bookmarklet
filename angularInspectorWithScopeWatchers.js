(function() {
    var boxWatch = ".ng-boxwatch{position:fixed;right:10px;background:rgba(255,255,255,.91);top:10px;z-index:9999;border:1px solid #DBDBDB;font-size:2em;color:#222;padding:10px;border-radius:5px}";

    var scopebinding = ".ng-binding{box-shadow:inset 0 0 0 1px #51C741;box-sizing:border-box}.ng-scope{background:rgba(255,61,0,.2);box-shadow:inset 0 0 0 1px rgba(255,0,0,.14)}.ng-scope:hover{box-shadow:inset 0 0 0 1px #ff3d00!important}";

    var newcss = boxWatch + scopebinding;
    if ("\v" == "v") /* ie only */ {
        document.createStyleSheet().cssText = newcss;
    } else {
        var tag = document.createElement("style");
        tag.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(tag);
        tag[(typeof document.body.style.WebkitAppearance == "string") /* webkit only */ ? "innerText" : "innerHTML"] = newcss;
    }


    var watchBox = document.createElement("div");
    var scopeWatcherBox = document.createElement("span");
    var separator = document.createElement("span");
    separator.innerText = " / " ;
    var appWatcherBox = document.createElement("span");
    watchBox.appendChild(scopeWatcherBox);
    watchBox.appendChild(separator);
    watchBox.appendChild(appWatcherBox);

    var appBody = document.querySelectorAll("[ng-app]") ;
    if(!appBody.length) {
        appBody = document.getElementsByTagName("body");
    }

    function getAppWatchers() {
        appWatcherBox.innerText = countWatchers(appBody);
        setTimeout(function() {
            getAppWatchers();
        }, 1000);

    }
    getAppWatchers();

    function countWatchers(element) {

        element = angular.element(element);
        var visitedId = [];
        var watchers = 0;

        function countChildWatchers($element) {
            var scope = $element.data().$scope;


            if (scope) {
                if (scope.$$watchers) {
                    watchers += scope.$$watchers.length;
                }
            }


            angular.forEach($element.children(), function(childElement) {
                countChildWatchers(angular.element(childElement));
            });
        }

        countChildWatchers(element);

        return watchers;
    }

    function updateCounter(element) {

        scopeWatcherBox.innerText = countWatchers(element);
    }

    watchBox.className = "ng-boxwatch";
    document.body.appendChild(watchBox);
    var allScopes = document.getElementsByClassName("ng-scope");

    function hasClass(element, cls) {
        return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
    }

    angular.forEach(allScopes, function(elm) {
        elm.addEventListener("mouseenter",function(e) {
            var hoverElm = document.querySelectorAll( ":hover" ) ;
            var i = hoverElm.length - 1 ;
            while(!hasClass(hoverElm[i],"ng-scope") && i>=0) {
                i--;
            }
            updateCounter(hoverElm[i]);
        },false);

        elm.addEventListener("mouseleave",function(e) {
            updateCounter(e.relatedTarget,e);
        },false);
    });


})();