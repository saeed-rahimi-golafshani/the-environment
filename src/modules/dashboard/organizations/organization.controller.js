const autoBind = require("auto-bind");
const OrganizationService = require("./organization.service");
const SettingsService = require("../setting/setting_service");
const OrganizationModel = require("./organization.model");
const { CODE_NAME } = require("../../../common/utills/constrant");
const { UniqueCode } = require("../../../common/utills/public.function");
const OrganizationMessage = require("./organization.message");

class OrganizationController {
    #service;
    #setting_service;
    #organization_model;

    constructor() {
        autoBind(this);
        this.#service = OrganizationService;
        this.#setting_service = SettingsService;
        this.#organization_model = OrganizationModel;
    }

    async organizationOfList(req, res, next) {
        try {
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/organizations/organization_list.ejs",
                {
                    setting,
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async getCreateOrganization(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.ORGGANIZATION,
                this.#organization_model
            );

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/organizations/organization_add.ejs", {
                code,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postCreateOrganization(req, res, next) {
        try {
            const {
                code,
                title,
                slug,
                description,
                tags,
                published_status,
                show_in_main_page,
            } = req.body;
            console.log(req.body);
            await this.#service.createOrganization(req, {
                code,
                title,
                slug,
                description,
                tags,
                published_status,
                show_in_main_page,
            });
            res.locals.layout = "./pages/dashboard/organizations/organization_add.ejs";
            req.flash("message", OrganizationMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
}

module.exports = new OrganizationController();
