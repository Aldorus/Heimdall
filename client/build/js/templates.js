angular.module("heimdall").run(["$templateCache", function($templateCache) {$templateCache.put("auth/partials/auth.html","<div class=\"auth-form\">\r\n    <h1>Peashooter</h1>\r\n    <span class=\"generality\" data-ng-bind-html=\"\'Generality\' | translate\"></span>\r\n    <form novalidate name=\"authForm\">\r\n        <div class=\"form-group\">\r\n            <input type=\"email\" id=\"email\" name=\"email\" data-ng-model=\"user.email\" required placeholder=\"{{\'Email *\' | translate}}\"/>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <input type=\"password\" id=\"password\" name=\"password\" data-ng-model=\"user.password\" required placeholder=\"{{\'Password * \' | translate}}\"/>\r\n        </div>\r\n        <div class=\"form-button\">\r\n            <div class=\"no-account\">{{\'No Account\' | translate}}</div>\r\n            <button type=\"submit\" data-ng-click=\"submit()\" v-busy=\"logInProgress\" v-pressable>Sign In</button>\r\n        </div>\r\n    </form>\r\n</div>\r\n");
$templateCache.put("build/partials/build.html","<div>\r\n    <h1>Build</h1>\r\n\r\n</div>\r\n");
$templateCache.put("core/partials/loader.html","<div class=\"loader\" data-ng-if=\"display\">\r\n    <div>\r\n        <span>{{\'Wait for a moment please\' | translate}}</span>\r\n        <div class=\"sk-folding-cube\">\r\n            <div class=\"sk-cube1 sk-cube\"></div>\r\n            <div class=\"sk-cube2 sk-cube\"></div>\r\n            <div class=\"sk-cube4 sk-cube\"></div>\r\n            <div class=\"sk-cube3 sk-cube\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("home/partials/home.html","<div>\r\n\r\n    <div class=\"box small-box count-box\">\r\n        <h2>{{\'Count project\' | translate}}</h2>\r\n        <span>{{countProject}}</span>\r\n    </div>\r\n\r\n    <div class=\"box small-box count-box\">\r\n        <h2>{{\'Count version\' | translate}}</h2>\r\n        <span>{{countVersion}}</span>\r\n    </div>\r\n\r\n    <div class=\"box small-box count-box\">\r\n        <h2>{{\'Count build\' | translate}}</h2>\r\n        <span>{{countBuild}}</span>\r\n    </div>\r\n\r\n\r\n</div>\r\n");
$templateCache.put("navigation/partials/heimdall-navigation.html","<nav class=\"navigation\" data-ng-if=\"navigationActive()\" data-ng-init=\"appear()\">\r\n\r\n    <!--<div class=\"icon-profile\"><span class=\"glyphicon glyphicon-user\"></span></div>-->\r\n    <div class=\"icon-profile\"><img data-ng-src=\"{{getAvatar()}}\"></div>\r\n    <div>{{account.firstname}} {{account.name}} | <a href=\"#\" data-ng-click=\"logout()\">{{\'Logout\' | translate}}</a></div>\r\n\r\n    <ul>\r\n        <li><a ui-sref=\"home\" data-ng-class=\"{\'active\': itemIsSelected(\'home\')}\"><span class=\"glyphicon glyphicon-home\"></span>{{\'Home\' | translate}}</a></li>\r\n        <li><a ui-sref=\"project\" data-ng-class=\"{\'active\': itemIsSelected(\'project\')}\"><span class=\"glyphicon glyphicon-star\"></span>{{\'Projects\' | translate}}</a></li>\r\n        <!--<li><a ui-sref=\"version\" data-ng-class=\"{\'active\': itemIsSelected(\'version\')}\"><span class=\"glyphicon glyphicon-briefcase\"></span>{{\'Version\' | translate}}</a></li>-->\r\n        <li><a ui-sref=\"user\" data-ng-class=\"{\'active\': itemIsSelected(\'user\')}\"><span class=\"glyphicon glyphicon-user\"></span>{{\'Users\' | translate}}</a></li>\r\n        <li><a ui-sref=\"help\" data-ng-class=\"{\'active\': itemIsSelected(\'help\')}\"><span class=\"glyphicon glyphicon-heart\"></span>{{\'Help\' | translate}}</a></li>\r\n    </ul>\r\n</nav>\r\n");
$templateCache.put("project/partials/project.html","<div class=\"projects-container full-screen\">\r\n    <div class=\"form-project\" data-ng-class=\"{\'open\':open}\">\r\n        <span class=\"glyphicon glyphicon-remove\" data-ng-click=\"closeProject()\"></span>\r\n\r\n        <h1>{{\'Create New Project\' | translate}}</h1>\r\n\r\n        <p>{{\'Create Project Help\' | translate}}</p>\r\n\r\n        <form novalidate name=\"newProjectForm\">\r\n            <input type=\"text\" id=\"title\" name=\"title\" data-ng-model=\"newProject.title\"\r\n                   placeholder=\"{{\'Project Name\' | translate}}\" required/>\r\n\r\n            <div class=\"form-button\">\r\n                <button v-busy=\"createLoading\" data-ng-click=\"createProject()\" v-pressable>Create Project</button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <div class=\"list-project full-screen\" data-ng-class=\"{\'open\':open}\">\r\n\r\n        <h1>{{\'Projects\' | translate }}</h1>\r\n\r\n        <a href=\"#\" class=\"project new-project\" data-ng-click=\"newProject()\">\r\n            <div class=\"glyphicon glyphicon-plus\"></div>\r\n            <div class=\"new-project-label\">{{\'New Project\' | translate}}</div>\r\n        </a>\r\n        <div class=\"help-empty-project\" data-ng-if=\"projects.length === 0\">\r\n            <div class=\"arrow\"></div>\r\n            <div class=\"text\" data-ng-bind-html=\"\'Help Empty Project\' | translate\"></div>\r\n        </div>\r\n        <div class=\"project\" data-ng-repeat=\"project in projects\">\r\n            <div class=\"desc\">1/2</div>\r\n            <h1 class=\"title\">{{project.title}}</h1>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n");
$templateCache.put("user/partials/remove-user.html","<v-modal class=\"vModal--default modal modal-remove-user\">\n    <v-dialog medium middle>\n        <div>{{\'Remove user, are you sure ?\'|translate}}</div>\n        <div class=\"buttons\">\n            <button v-pressable class=\"cancel\" data-ng-click=\"close()\">{{\'No\'|translate}}</button>\n            <button v-pressable data-ng-click=\"confirm()\">{{\'Yes\'|translate}}</button>\n        </div>\n    </v-dialog>\n</v-modal>\n");
$templateCache.put("user/partials/user.html","<div class=\"full-screen\">\r\n    <div class=\"form-user\" data-ng-class=\"{\'open\':open}\">\r\n        <span class=\"glyphicon glyphicon-remove\" data-ng-click=\"open=false\"></span>\r\n\r\n        <h1>{{\'Create New User\' | translate}}</h1>\r\n\r\n        <form novalidate name=\"newUserForm\">\r\n            <input type=\"hidden\" id=\"id\" name=\"id\" data-ng-model=\"newUser.id\" />\r\n\r\n            <input type=\"text\" id=\"name\" name=\"name\" data-ng-model=\"newUser.name\"\r\n                   placeholder=\"{{\'Name\' | translate}}\" required/>\r\n\r\n            <input type=\"email\" id=\"email\" name=\"email\" data-ng-model=\"newUser.email\"\r\n                   placeholder=\"{{\'Email\' | translate}}\" required/>\r\n\r\n            <input type=\"password\" id=\"password\" name=\"password\" data-ng-model=\"newUser.password\"\r\n                   placeholder=\"{{\'Password\' | translate}}\" required/>\r\n\r\n            <select name=\"role\" data-ng-model=\"newUser.role\" required>\r\n                <option value=\"\">{{\'Choose Role\'|translate}}</option>\r\n                <option value=\"admin\">{{\'Admin\'|translate}}</option>\r\n                <option value=\"developer\">{{\'Developer\'|translate}}</option>\r\n                <option value=\"user\">{{\'User\'|translate}}</option>\r\n            </select>\r\n\r\n            <div class=\"form-button\">\r\n                <button data-ng-click=\"cancelEditUser()\" type=\"button\" data-ng-if=\"newUser.id\" v-pressable>Cancel</button>\r\n                <button v-busy=\"createLoading\" data-ng-click=\"validEditUser()\" data-ng-if=\"newUser.id\" v-pressable>Edit User</button>\r\n                <button v-busy=\"createLoading\" data-ng-click=\"createUser()\" data-ng-if=\"!newUser.id\" v-pressable>Create User</button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <div class=\"list-user full-screen\" data-ng-class=\"{\'open\':open}\">\r\n\r\n        <button class=\"button-add\" data-ng-click=\"openNewUser()\" type=\"button\" v-pressable>\r\n            <span class=\"glyphicon glyphicon-plus\"></span>\r\n            {{\'New User\' | translate}}\r\n        </button>\r\n        <h1>{{\'User List\' | translate}}</h1>\r\n\r\n        <table>\r\n            <tr class=\"header\">\r\n                <th class=\"name\">{{\'Name\'| translate}}</th>\r\n                <th class=\"email\">{{\'Email\'| translate}}</th>\r\n                <th class=\"role\">{{\'Role\'| translate}}</th>\r\n                <th class=\"action\">{{\'Actions\'| translate}}</th>\r\n            </tr>\r\n            <tr class=\"user-row\" data-ng-repeat=\"user in users\" data-ng-class=\"{\'current-user\': isCurrentUser(user)}\">\r\n                <td>{{user.name}}</td>\r\n                <td>{{user.email}}</td>\r\n                <td>{{user.role}}</td>\r\n                <td>\r\n                    <span class=\"glyphicon glyphicon-edit\" data-ng-click=\"editUser(user)\"></span>\r\n                    <span class=\"glyphicon glyphicon-trash\" data-ng-click=\"removeUser(user)\" data-ng-if=\"!isCurrentUser(user)\"></span>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("version/partials/version.html","<div>\r\n    <h1>Version</h1>\r\n\r\n</div>\r\n");}]);