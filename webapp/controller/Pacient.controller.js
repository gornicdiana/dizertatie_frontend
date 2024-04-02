sap.ui.define([
    "ui5Starter/controller/BaseController", 
    "sap/ui/model/json/JSONModel", 
    "ui5Starter/utils/URLs",
    "sap/ui/core/Fragment",  
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, URLs, Fragment, MessageToast, MessageBox) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.Pacient", {
        onInit: async function () {
            let oRouter = this.getRouter();
            oRouter.getRoute("Pacient").attachMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
        },

        anulare: function () {
            this._openDialog('ui5Starter.fragment.Anulare');
        },

        confirmareAnulare: function () {
            this.onCancel();
        },

        veziRezultat: function () {
            this._openDialog('ui5Starter.fragment.Rezultat');
        },

        acordaRecenzie: function () {
            this._openDialog('ui5Starter.fragment.Rating');
        },

        confirmareRating: function () {
            this.onCancel();
        },

        _openDialog: function (sDialogName) {
            if (!this._oDialog) {
                try {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogName,
                        controller: this
                    }).then(oDialog => {
                        this._oDialog = oDialog;
                        this._oDialog.setModel(this.getView().getModel("i18n"), "i18n");
                        this.getView().addDependent(this._oDialog);
                        this._oDialog.open();
                    });
                } catch (oError) {
                    this.showErrorDialog(this.getText("general.dialogError"));
                }
            } else {
                this._oDialog.open();
            }
        },

        onCancel: function () {
            this._oDialog.close();
            this._oDialog.destroy();
            this._oDialog = undefined;
        },

        showErrorDialog: function (message) {
            MessageBox.error(
                message
            );
        },

        getText: function (sKey) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey);
        },
    });
});