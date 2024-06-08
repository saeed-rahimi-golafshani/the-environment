const { Router } = require("express");
const DashboardController = require("./dashboard.controller");
const { NewsCategoryRoutes } = require("./news_category/news_category.routes");
const { Settings_routes } = require("./setting/setting.routes");
const { BlogCategoryRoutes } = require("./blog_category/blog_category.routes");
const { BlogRoutes } = require("./blog/blog.routes");
const { NewsRoutes } = require("./news/news.routes");
const { OrganizationRoutes } = require("./organizations/organization.routes");
const { UserRoutes } = require("./user/user.routes");
const { RoleRoutes } = require("./role/role.routes");
const { PermissionRoutes } = require("./permission/permission.routes");
const {
    RolePermissionRoutes,
} = require("./role_permission/role_permission.routes");
const { RoleUserRoutes } = require("./role_user/role_user.routes");
const { checkPermission } = require("../../common/guard/permission.guard");
const { PERMISSIONS } = require("../../common/utills/constrant");
const { EventCategoryRoutes } = require("./event_category/event_category.routes");
const { eventStatusRoutes } = require("./event_status/event_status.routes");
const { EventPartnerRoutes } = require("./event_partner/event_partner.routes");
const { StateRoutes } = require("./address_state/state.routes");

const router = Router();
router.get("/", DashboardController.dashboard);
router.use(
    "/news_category",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    NewsCategoryRoutes
);
router.use(
    "/setting",
    checkPermission([PERMISSIONS.SUPER_ADMIN]),
    Settings_routes
);
router.use(
    "/blog_category",
    checkPermission([PERMISSIONS.AUTHOR]),
    BlogCategoryRoutes
);
router.use(
    "/blog",
    checkPermission([PERMISSIONS.AUTHOR]),
    BlogRoutes
);
router.use(
    "/news",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    NewsRoutes
);
router.use(
    "/organization",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    OrganizationRoutes
);
router.use(
    "/users",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    UserRoutes
);
router.use("/role", checkPermission([PERMISSIONS.ADMIN]), RoleRoutes);
router.use(
    "/permission",
    checkPermission([PERMISSIONS.SUPER_ADMIN]),
    PermissionRoutes
);
router.use(
    "/role_permission",
    checkPermission([PERMISSIONS.SUPER_ADMIN]),
    RolePermissionRoutes
);
router.use(
    "/operator",
    checkPermission([PERMISSIONS.SUPER_ADMIN]),
    RoleUserRoutes
);
router.use(
    "/event_category",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    EventCategoryRoutes
);
router.use(
    "/event_status",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    eventStatusRoutes
);
router.use(
    "/event_partner",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    EventPartnerRoutes
);
router.use(
    "/state",
    checkPermission([PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]),
    StateRoutes
);



module.exports = {
    DashboardRoutes: router,
};
