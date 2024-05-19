const rolePermissionMessage = Object.freeze({
    internalServerError: "خطای سروری",
    notFound: "نقش _ مجوز یافت نشد",
    alreadyExist: "این نقش با این مجوز از قبل ثبت شده است، لطفا نقش یا مجوز دیگری را انتخاب کنید",
    created: "نقش _ مجوز با موفقیت ثبت شد",
    updated: "نقش _ مجوز با موفقیت به روز رسانی شد",
    mistekId: "ساختار شناسه نقش _ مجوز اشتباه است",
    mistekRoleId: "ساختار نقش کاربری اشتباه است",
    mistekPermissionId: "ساختار مجوز کاربری اشتباه است"    
});

module.exports = rolePermissionMessage