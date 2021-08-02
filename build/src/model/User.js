"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserRoles = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["ADMIN"] = "ADMIN";
    USER_ROLES["NORMAL"] = "NORMAL";
})(USER_ROLES = exports.USER_ROLES || (exports.USER_ROLES = {}));
const toUserRoles = (value) => {
    switch (String(value).toLowerCase()) {
        case 'admin':
            return USER_ROLES.ADMIN;
        case 'normal':
            return USER_ROLES.NORMAL;
        default:
            return USER_ROLES.NORMAL;
    }
};
exports.toUserRoles = toUserRoles;
//# sourceMappingURL=User.js.map