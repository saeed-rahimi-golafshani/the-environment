const multerMessage = Object.freeze({
    notFormat: "فرمت تصویر ارسالی صحیح نمیباشد",
    alreadyTilte:
        "این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید",
});
const PublicFunctionMessage = Object.freeze({
    alreadyTilte:
        "این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید",
    alreadySlug:
        "این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید",
    mistekId: "ساختار شناسه مورد نظر اشتباه است",
    notfound: "گزینه مورد نظر یافت نشد",
});

module.exports = {
    multerMessage,
    PublicFunctionMessage,
};
