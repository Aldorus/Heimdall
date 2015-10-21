angular.module("heimdall").run(["$templateCache", function($templateCache) {$templateCache.put("core/partials/loader.html","<div class=\"loader\" data-ng-show=\"display\">\n    <div>\n        <span>{{\'Wait for a moment please\' | translate}}</span>\n        <div class=\"sk-folding-cube\">\n            <div class=\"sk-cube1 sk-cube\"></div>\n            <div class=\"sk-cube2 sk-cube\"></div>\n            <div class=\"sk-cube4 sk-cube\"></div>\n            <div class=\"sk-cube3 sk-cube\"></div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/auth/partials/auth.html","<div class=\"auth-form\">\n    <h1>Peashooter</h1>\n\n    <span class=\"generality\" data-ng-bind-html=\"\'Generality\' | translate\"></span>\n    <form novalidate name=\"authForm\">\n        <div class=\"form-group\">\n            <input type=\"email\" id=\"email\" name=\"email\" data-ng-model=\"user.email\" required placeholder=\"{{\'Email *\' | translate}}\"/>\n        </div>\n        <div class=\"form-group\">\n            <input type=\"password\" id=\"password\" name=\"password\" data-ng-model=\"user.password\" required placeholder=\"{{\'Password * \' | translate}}\"/>\n        </div>\n        <div class=\"form-button\">\n            <div class=\"no-account\">{{\'No Account\' | translate}}</div>\n            <button type=\"submit\" data-ng-click=\"authCtrl.submit()\" v-busy=\"authCtrl.logInProgress\" v-pressable>Sign In</button>\n        </div>\n    </form>\n</div>\n");
$templateCache.put("app/build/partials/build.html","<div class=\"builds-container full-screen\">\n    <div class=\"full-screen inner-container\">\n\n        <h1>{{\'Build\' | translate }}</h1>\n\n        {{build.build}}\n\n    </div>\n</div>\n");
$templateCache.put("app/home/partials/home.html","<div>\n    <a ui-sref=\"project\" class=\"box small-box count-box\">\n        <h2>{{\'Count project\' | translate}}</h2>\n        <span>{{homeCtrl.countProject}}</span>\n    </a>\n\n    <div class=\"box small-box count-box\">\n        <h2>{{\'Count version\' | translate}}</h2>\n        <span>{{homeCtrl.countVersion}}</span>\n    </div>\n\n    <div class=\"box small-box count-box\">\n        <h2>{{\'Count build\' | translate}}</h2>\n        <span>{{homeCtrl.countBuild}}</span>\n    </div>\n\n\n</div>\n");
$templateCache.put("app/project/partials/project.html","<div class=\"projects-container full-screen\">\n    <div class=\"form-crud\" data-ng-class=\"{\'open\':projectCtrl.open}\">\n        <span class=\"glyphicon glyphicon-remove\" data-ng-click=\"projectCtrl.closeProject()\"></span>\n\n        <h1>{{\'Create New Project\' | translate}}</h1>\n\n        <p>{{\'Create Project Help\' | translate}}</p>\n\n        <form novalidate name=\"project.newProjectForm\">\n            <input type=\"text\" id=\"title\" name=\"title\" data-ng-model=\"project.newProject.title\"\n                   placeholder=\"{{\'Project Name\' | translate}}\" required/>\n\n            <div class=\"form-button\">\n                <button v-busy=\"projectCtrl.createLoading\" data-ng-click=\"projectCtrl.createProject()\" v-pressable>Create Project</button>\n            </div>\n        </form>\n    </div>\n    <div class=\"list-project full-screen inner-container\" data-ng-class=\"{\'open\':projectCtrl.open}\">\n\n        <h1>{{\'Projects\' | translate }}</h1>\n\n        <a href=\"\" class=\"project new-project\" data-ng-click=\"projectCtrl.newProject()\">\n            <div class=\"glyphicon glyphicon-plus\"></div>\n            <div class=\"new-project-label\">{{\'New Project\' | translate}}</div>\n        </a>\n        <div class=\"help-empty-project helper-message\" data-ng-if=\"projectCtrl.projects.length === 0\">\n            <div class=\"arrow\"></div>\n            <div class=\"text\" data-ng-bind-html=\"\'Help Empty Project\' | translate\"></div>\n        </div>\n        <div class=\"project\" data-ng-repeat=\"project in projectCtrl.projects\" data-ng-init=\"projectCtrl.getBuildsByProject(project)\">\n            <div class=\"desc\"></div>\n            <h1 class=\"title\">{{project.title}}</h1>\n            <div class=\"list-build\">\n                <a href=\"\" data-ng-repeat=\"build in project.builds\" data-ng-click=\"projectCtrl.goBuild(build)\">{{build.name}}</a>\n            </div>\n        </div>\n    </div>\n\n</div>\n");
$templateCache.put("app/user/partials/remove-user.html","<v-modal class=\"vModal--default modal modal-remove-user\">\n    <v-dialog medium middle>\n        <div>{{\'Remove user, are you sure ?\'|translate}}</div>\n        <div class=\"buttons\">\n            <button v-pressable class=\"cancel\" data-ng-click=\"close()\">{{\'No\'|translate}}</button>\n            <button v-pressable data-ng-click=\"confirm()\">{{\'Yes\'|translate}}</button>\n        </div>\n    </v-dialog>\n</v-modal>\n");
$templateCache.put("app/user/partials/user.html","<div class=\"full-screen\">\n    <div class=\"form-crud\" data-ng-class=\"{\'open\':open}\">\n        <span class=\"glyphicon glyphicon-remove\" data-ng-click=\"open=false\"></span>\n\n        <h1>{{\'Create New User\' | translate}}</h1>\n\n        <form novalidate name=\"newUserForm\">\n            <input type=\"hidden\" id=\"id\" name=\"id\" data-ng-model=\"newUser.id\" />\n\n            <input type=\"text\" id=\"name\" name=\"name\" data-ng-model=\"newUser.name\"\n                   placeholder=\"{{\'Name\' | translate}}\" required/>\n\n            <input type=\"email\" id=\"email\" name=\"email\" data-ng-model=\"newUser.email\"\n                   placeholder=\"{{\'Email\' | translate}}\" required/>\n\n            <input type=\"password\" id=\"password\" name=\"password\" data-ng-model=\"newUser.password\"\n                   placeholder=\"{{\'Password\' | translate}}\" required/>\n\n            <select name=\"role\" data-ng-model=\"newUser.role\" required>\n                <option value=\"\">{{\'Choose Role\'|translate}}</option>\n                <option value=\"admin\">{{\'Admin\'|translate}}</option>\n                <option value=\"developer\">{{\'Developer\'|translate}}</option>\n                <option value=\"user\">{{\'User\'|translate}}</option>\n            </select>\n\n            <div class=\"form-button\">\n                <button data-ng-click=\"cancelEditUser()\" type=\"button\" data-ng-if=\"newUser.id\" v-pressable>Cancel</button>\n                <button v-busy=\"createLoading\" data-ng-click=\"validEditUser()\" data-ng-if=\"newUser.id\" v-pressable>Edit User</button>\n                <button v-busy=\"createLoading\" data-ng-click=\"createUser()\" data-ng-if=\"!newUser.id\" v-pressable>Create User</button>\n            </div>\n        </form>\n    </div>\n    <div class=\"list-user full-screen inner-container\" data-ng-class=\"{\'open\':open}\">\n\n        <button class=\"button-add\" data-ng-click=\"openNewUser()\" type=\"button\" v-pressable>\n            <span class=\"glyphicon glyphicon-plus\"></span>\n            {{\'New User\' | translate}}\n        </button>\n        <h1>{{\'User List\' | translate}}</h1>\n\n        <table>\n            <tr class=\"header\">\n                <th class=\"name\">{{\'Name\'| translate}}</th>\n                <th class=\"email\">{{\'Email\'| translate}}</th>\n                <th class=\"role\">{{\'Role\'| translate}}</th>\n                <th class=\"action\">{{\'Actions\'| translate}}</th>\n            </tr>\n            <tr class=\"user-row\" data-ng-repeat=\"user in users\" data-ng-class=\"{\'current-user\': isCurrentUser(user)}\">\n                <td>{{user.name}}</td>\n                <td>{{user.email}}</td>\n                <td>{{user.role}}</td>\n                <td>\n                    <span class=\"glyphicon glyphicon-edit\" data-ng-click=\"editUser(user)\"></span>\n                    <span class=\"glyphicon glyphicon-trash\" data-ng-click=\"removeUser(user)\" data-ng-if=\"!isCurrentUser(user)\"></span>\n                </td>\n            </tr>\n        </table>\n    </div>\n</div>\n");
$templateCache.put("app/version/partials/version.html","<div>\r\n    <h1>Version</h1>\r\n\r\n</div>\r\n");
$templateCache.put("components/navigation/partials/heimdall-navigation.html","<nav class=\"navigation\" data-ng-if=\"navigationActive()\" data-ng-init=\"appear()\">\n\n    <!--<div class=\"icon-profile\"><span class=\"glyphicon glyphicon-user\"></span></div>-->\n    <div class=\"icon-profile\"><img data-ng-src=\"{{getAvatar()}}\"></div>\n    <div>{{account.firstname}} {{account.name}} | <a href=\"#\" data-ng-click=\"logout()\">{{\'Logout\' | translate}}</a></div>\n\n    <ul>\n        <li><a ui-sref=\"home\" data-ng-class=\"{\'active\': itemIsSelected(\'home\')}\"><span class=\"glyphicon glyphicon-home\"></span>{{\'Home\' | translate}}</a></li>\n        <li><a ui-sref=\"project\" data-ng-class=\"{\'active\': itemIsSelected(\'project\')}\"><span class=\"glyphicon glyphicon-star\"></span>{{\'Projects\' | translate}}</a></li>\n        <!--<li><a ui-sref=\"version\" data-ng-class=\"{\'active\': itemIsSelected(\'version\')}\"><span class=\"glyphicon glyphicon-briefcase\"></span>{{\'Version\' | translate}}</a></li>-->\n        <li><a ui-sref=\"user\" data-ng-class=\"{\'active\': itemIsSelected(\'user\')}\"><span class=\"glyphicon glyphicon-user\"></span>{{\'Users\' | translate}}</a></li>\n        <li><a ui-sref=\"help\" data-ng-class=\"{\'active\': itemIsSelected(\'help\')}\"><span class=\"glyphicon glyphicon-heart\"></span>{{\'Help\' | translate}}</a></li>\n    </ul>\n\n    <div class=\"version\">v1.0.0 - Copyright 2015</div>\n</nav>\n");}]);