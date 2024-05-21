module.exports = {
    MOBILE_PATTERN: /^09[0-9]{9}$/,
    MONGOID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    FILENMAE_ICON_PATTERN: /(\.svg|\.png|\.ico|\.avif|\.jpg)$/,
    FILENMAE_IMAGE_PATTERN: /(\.png|\.jpg|\.jpeg|\.webp|\.gif|\.jfif)$/,
    USER_GENDER: Object.freeze({
        UNKNOWN: "unknown",
        MALE: "male",
        FEMALE:  "female"
    }),
    USER_DEFAULT_ROLE: Object.freeze({
        USER: "USER"
    }),
    USER_STATUS: Object.freeze({
        ACTIVE: true,
        UNACTIVE: false,
    }),
    CODE_NAME: Object.freeze({
        BLOG: "BC",
        BLOG_CATEGORY: "CAT_BC",
        SETTINGS: "SETT",
        NEWS_CATEGORY: "NEWS_CAT",
        NEWS: "NEWS",
        ORGGANIZATION: "ORG",
        USER: "U",
        ROLE: "R",
        PERMISSION: "PER",
        ROLEPERMISSION: "R_PER",
        OPERATOR: "OPET",

        PRODUCT: "PRD",
        PRODUCT_CATEGORY: "CAT_PRD",
        BRAND: "BR",
        PRODUCT_DETAILS: "PD",
        PRODUCT_DETAILS_OPTION: "PDO",
        PRODUCT_DETAILS_CATEGORY: "PDC",
        PRODUCT_CONFIGRATION: "PC",
        MENU: "MEN",
        SLIDER: "SLI",
        SLIDER_TITLE: "SLIT",
        SERVICES: "SRV",
        MEGA_MENU: "MEG", 
        ADVERTISING: "AD"
    }),
    USERBLACKLIST: Object.freeze({
        USER_CODE: "user_code",
        CREATEDAT: "createdAt",
        UPDATEDAT: "updatedAt",
        ROLE_ID: "role_Id",
        WALLET: "wallet",
        RATE: "rate",
        MOBILE: "mobile",
        EMAIL: "email"
    }),
    BLOGCATEGORY_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEDAT: "createdAt",
        UPDATEDAT: "updatedAt"
    }),
    ROLE_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEAT: "createAt",
        UPDATEAT: "updateAt"
    }),
    PERMISSION_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEAT: "createAt",
        UPDATEAT: "updateAt"
    }),
    ROLEPERMISSION_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEAT: "createAt",
        UPDATEAT: "updateAt"
    }),
    NEWSCATEGORY_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEDAT: "createdAt",
        UPDATEDAT: "updatedAt"
    }),
    NEWS_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEDAT: "createdAt",
        UPDATEDAT: "updatedAt"
    }),
    PRODUCTCATEGORY_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEDAT: "createdAt",
        UPDATEDAT: "updatedAt"
    }),
    PRODUCTDETAIL_BLACKLIST: Object.freeze({
        CODE: "code"
    }),
    SETTING_BLACKLIST: Object.freeze({
        CODE: "code",
        CREATEDAT: "createdAt"
    }),
    PRODUCTDETAILOPTION_BLACKLIST: Object.freeze({
        DETAIL_ID: "details_Id"
    }),
    MENU_BLACKLIST: Object.freeze({
        CODE: "code"
    }),
    SERVICES_BLACKLIST: Object.freeze({
        CODE: "code"
    }),
    MEGAMENU_BLACKLIST: Object.freeze({
        CODE: "code"
    }),
    BANER_BLACKLIST: Object.freeze({
        CODE: "code",
        TARGET: "target"
    }),
}