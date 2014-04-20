(function() {
    var boxWatch = ".ng-boxwatch{position:fixed;right:10px;background:rgba(255,255,255,.91);top:10px;z-index:9999;border:1px solid #DBDBDB;font-size:2em;color:#222;padding:10px;border-radius:5px}";

    var scopebinding = ".ng-scope:hover{background:rgba(255,153,0,.2);box-shadow:inset 0 0 0 1px #ff3d00}.ng-binding{box-shadow:inset 0 0 0 1px rgb\(81,199,65);box-sizing:border-box}";

    var newcss = boxWatch + scopebinding;
    if ("\v" == "v") /* ie only */ {
        document.createStyleSheet().cssText = newcss;
    } else {
        var tag = document.createElement('style');
        tag.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(tag);
        tag[(typeof document.body.style.WebkitAppearance == 'string') /* webkit only */ ? 'innerText' : 'innerHTML'] = newcss;
    }


    var watchBox = document.createElement("div");

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



    watchBox.className = "ng-boxwatch";
    document.body.appendChild(watchBox);

    function getAppWatchers() {
        watchBox.innerText = countWatchers(appBody);
        setTimeout(function() {
            getAppWatchers();
        }, 1000);

    }
    getAppWatchers();

})();
