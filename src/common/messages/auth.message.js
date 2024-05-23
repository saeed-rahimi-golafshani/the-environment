const authMessageGaurd = Object.freeze({
    login: "وارد حساب کاربری خود شدید",
    notFoundAccount: "کاربر یافت نشد",
    invalidToken: "توکن اعتباری ندارد"
});
const permissionMessageGaurd = Object.freeze({
    forbidden: "شما به این قسمت دسترسی ندارید"
});

module.exports = {
    authMessageGaurd,
    permissionMessageGaurd
}



