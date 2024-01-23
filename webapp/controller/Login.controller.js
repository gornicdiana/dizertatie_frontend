sap.ui.define([
    "ui5Starter/controller/BaseController", "sap/ui/model/json/JSONModel", "ui5Starter/utils/URLs", "ui5Starter/utils/Crypt",
], function (BaseController, JSONModel, URLs, Crypt) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.Login", {
        onInit: async function () {
            this.onSetModels();
            let loginModel = new JSONModel();
            this.getView().setModel(loginModel, "loginModel");
            let oRouter = this.getRouter();
            oRouter.getRoute("Login").attachMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
            this.clearFields();
            this.removeChatBot();
        },

        clearFields: function () {
            let loginModel = this.getView().getModel("loginModel").getData();
            if (loginModel.email != "undefined" && loginModel.password != "undefined") {
                this.getView().getModel("loginModel").setProperty("/email", "");
                this.getView().getModel("loginModel").setProperty("/password", "");
            }
        },

        onGoBackToWelcome: function () {
            this.getRouter().navTo("Welcome");
        },

        pressLogin: function () {
            debugger
            this.onLoginPacient();
            // const data = this.getView().getModel("loginModel").getData();
            // const email = data.email;
            // const password = data.password;
            // const cnp = data.cnp
            // if (cnp == undefined) {
            //     this.errorHandler("emptyMessage");
            // }else if (email == undefined) {
            //     this.errorHandler("emptyMessage");
            // } else if (password == undefined) {
            //     this.errorHandler("passwordMessage");
            // } else if (!this._validateCNP(cnp)) {
            //     this.errorHandler("cnpMessage");
            // } else if (!this._validateEmail(email)) {
            //     this.errorHandler("emailMessage");
            // } else {
            //     this._findUserType(email);
            // }
        },

        _validateEmail: function (inputText) {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexEmail.test(inputText);
        },

        _validateCNP: function (inputText) {
            debugger
        },

        _findUserType: function (email) {
            //de implementat o diferentiere intre conturi
            this.onLoginPacient();
        },

        onLoginPacient: async function () {
            this.getRouter().navTo("Pacient");

            // const data = this.getView().getModel("loginModel").getData();

            // this.post(URLs.getPacientUrl() + "/login", data).then(data => {
            //     this.userToken = data;
            //     this.getRouter().navTo("Pacient", {token: this.userToken});
            // }).catch(err => {
            //     this.errorHandler("wrongAccount")
            // })
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }
    });
});