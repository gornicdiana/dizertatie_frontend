sap.ui.define(["ui5Starter/controller/BaseController"], function (BaseController) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.Welcome", {

        onInit: async function () {
            let oRouter = this.getRouter();
        },

        goToLogin: function () {
            this.getRouter().navTo("Login");
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }
    });
});