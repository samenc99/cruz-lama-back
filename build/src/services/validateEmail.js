"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateEmail(email) {
    if (email === '' ||
        email.indexOf('@') === -1 ||
        email.indexOf('.') === -1 ||
        email.indexOf(' ') !== -1 ||
        email[0] === '.' || email[0] === '@' ||
        email[email.length - 1] === '.' ||
        email[email.length - 1] === '@') {
        return false;
    }
    else {
        let n = 0;
        for (let e of email) {
            if (e === '@')
                n++;
        }
        return n <= 1;
    }
}
exports.default = validateEmail;
//# sourceMappingURL=validateEmail.js.map