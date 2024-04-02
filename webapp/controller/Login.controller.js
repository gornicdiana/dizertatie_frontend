sap.ui.define([
    "ui5Starter/controller/BaseController", "sap/ui/model/json/JSONModel", "ui5Starter/utils/URLs", "ui5Starter/utils/Crypt",
], function (BaseController, JSONModel, URLs, Crypt) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.Login", {
        onInit: async function () {
            const loginModel = new JSONModel();
            this.getView().setModel(loginModel, "loginModel");
            let oRouter = this.getRouter();
            oRouter.getRoute("Login").attachMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
            this.clearFields();
        },

        clearFields: function () {
            let loginModel = this.getView().getModel("loginModel").getData();
            if (loginModel.email != "undefined" && loginModel.password != "undefined") {
                this.getView().getModel("loginModel").setProperty("/email", "");
                this.getView().getModel("loginModel").setProperty("/password", "");
            }
        },

        pressLogin: function () {
            debugger
            this.getRouter().navTo("MedicFamilie");
           
        },
        
        goToRegister: function () {
            debugger
            this.getRouter().navTo("Register");
        }
    });
});