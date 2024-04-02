sap.ui.define([
    "ui5Starter/controller/BaseController", "sap/ui/model/json/JSONModel", "ui5Starter/utils/URLs", "ui5Starter/utils/Crypt",
], function (BaseController, JSONModel, URLs, Crypt) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.Register", {
        onInit: async function () {
            debugger
            let registerModel = new JSONModel();
            this.getView().setModel(registerModel, "registerModel");
            let oRouter = this.getRouter();
            oRouter.getRoute("Register").attachPatternMatched(this._onObjectMatched, this);

        },

        _onObjectMatched: async function (oEvent) {
            this.clearFields();
        },

        clearFields: function () {
            let registerModel = this.getView().getModel("registerModel").getData();
            debugger;
            if (registerModel.email != "undefined") {
                debugger;
                this.getView().getModel("registerModel").setProperty("/registrationNumber", "");
                this.getView().getModel("registerModel").setProperty("/username", "");
                this.getView().getModel("registerModel").setProperty("/email", "");
                this.getView().getModel("registerModel").setProperty("/confirmPassword", "");
                this.getView().getModel("registerModel").setProperty("/password", "");
            }
        },

        goToLogin: function () {
            debugger
            this.getRouter().navTo("Login");
        },

        onRegisterUser: function () {
            this.getRouter().navTo("Login");
        },
    });
});