sap.ui.define(["ui5Starter/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "ui5Starter/utils/URLs",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, URLs, Fragment, MessageToast, MessageBox) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.MedicFamilie", {

        onInit: async function () {
            let oRouter = this.getRouter();
            this.getView().setModel(new JSONModel({
                femeie: false,
                alergic: false
            }), "datePacientNou");
            this.pacientNou = this.getView().getModel("datePacientNou");
            this.datePacientNou = this.pacientNou.getData();
        },

        cautaPacient: function (oEvent) {

        },

        detaliiPacient: function (oEvent) {
            const item = oEvent.getSource();
            const context = item.getBindingContext();

            this.getRouter().navTo("DetaliiPacient");
        },

        adaugaPacient: function () {
            this._openDialog('ui5Starter.fragment.AdaugaPacient')
        },

        typeCNP: function () {
            const cnp = this.byId("cnpNouID").getValue();
            let dateCNP = {};
            if (cnp.length == 13) {
                dateCNP = this.validateCNP(cnp);
            }
            else {
                this.datePacientNou.valueState = "Error";
                this.datePacientNou.textValueState = "CNP invalid"
                this.resetFields();
            }
            if (dateCNP.cnpValid == true) {
                this.datePacientNou.valueState = "Success";
                this.datePacientNou.textValueState = "CNP valid"
                this.formatFields(dateCNP);
            }
        },

        validateCNP: function (cnp) {
            let se = parseInt(cnp.charAt(0));
            let aa = parseInt(cnp.charAt(1)) * 10 + parseInt(cnp.charAt(2));
            let ll = parseInt(cnp.charAt(3)) * 10 + parseInt(cnp.charAt(4));
            let zz = parseInt(cnp.charAt(5)) * 10 + parseInt(cnp.charAt(6));
            let jj = parseInt(cnp.charAt(7)) * 10 + parseInt(cnp.charAt(8));
            let nn = parseInt(cnp.charAt(9)) * 100 + parseInt(cnp.charAt(10)) * 10 + parseInt(cnp.charAt(11));
            let cnpValid = true;
            let sex = '';
            let dataNastere = '';
            if (se < 9 && se > 0 && aa > 0 && aa <= 99 && ll > 1 && ll < 12 && zz > 1 && zz < 31 && nn > 0 && nn < 999) {
                switch (se) {
                    case 1:
                    case 2:
                        { aa += 1900; }
                        break;
                    case 3:
                    case 4:
                        { aa += 1800; }
                        break;
                    case 5:
                    case 6:
                        { aa += 2000; }
                        break;
                    case 7:
                    case 8:
                    case 9:
                        {
                            aa += 2000;
                            if (aa > parseInt(new Date().getYear(), 10) - 14) {
                                aa -= 100;
                            }
                        }
                        break;
                    default: {
                        return false;
                    }
                }
                sex = se;
                ll < 10 ? (ll = "0" + ll) : ll;
                zz < 10 ? (zz = "0" + zz) : zz;
                jj < 10 ? (jj = "0" + jj) : jj;
                dataNastere = new Date(aa + "-" + ll + "-" + zz).toDateString();
                if ((jj > 1 && jj < 46) || jj == 51 || jj == 52) {
                    let cv = "279146358279";
                    let a = 0;
                    for (let i = 0; i < 12; i++) {
                        let x = parseInt(cnp.charAt(i));
                        let y = parseInt(cv.charAt(i));
                        a = a + x * y;
                    }
                    let b = a % 11;
                    console.log("ULTIMA CIFRA CNP " + parseInt(cnp.charAt(12)));
                    console.log("CIFRA VALIDARE " + b);
                    if (b == 10) b = 1;
                    if (parseInt(cnp.charAt(12)) == b) cnpValid = true;
                    else cnpValid = false;
                } else {
                    let t1 = new Date(Date.parse((aa + "-" + ll + "-" + zz).toString));
                    let t2 = new Date(Date.parse("1979-12-19"));
                    if ((jj == 47 || jj == 48) && t1.getTime() < t2.getTime()) {
                        console.log("DATA VALIDARE> " + Date.parse("1979-12-19"));
                        let cv = "279146358279";
                        let a = 0;
                        let i = 0;
                        for (i = 0; i < 12; i++) {
                            if (isNaN(cnp.charAt(i))) {
                                return false;
                            }
                            let x = parseInt(cnp.charAt(i));
                            let y = parseInt(cv.charAt(i), 10);
                            a = a + x * y;
                        }
                        let b = a % 11;
                        console.log("ULTIMA CIFRA CNP " + parseInt(cnp.charAt(12)));
                        console.log("CIFRA VALIDARE " + b);
                        if (b == 10) b = 1;
                        if (parseInt(cnp.charAt(12)) == b) cnpValid = true;
                        else cnpValid = false;
                    } else cnpValid = false;
                }
            } else cnpValid = false;
            return {cnpValid: cnpValid,
                    sex: sex,
                    dataNastere: dataNastere};
        },

        formatFields: function (dateCNP) {
            this.datePacientNou.dataNastere = dateCNP.dataNastere;
            this.byId("dataNastereID").setValue(this.datePacientNou.dataNastere);
            if (dateCNP.sex == 2 || dateCNP.sex == 4 || dateCNP.sex == 6 || dateCNP.sex == 8) {
                this.datePacientNou.femeie = true;
                this.byId("sexFID").setSelected(true);
            }
            else {
                this.datePacientNou.femeie = false;
            }
            this.pacientNou.refresh();
        },

        resetFields: function () {
            this.datePacientNou.femeie = false;
            this.byId("sexMID").setSelected(true);
            this.byId("dataNastereID").setValue('');
            this.pacientNou.refresh();
        },

        selectSex: function () {
            const selected = this.byId("sexID").getSelectedButton().getProperty("text");
            this.datePacientNou.sex = selected;
            if (selected == "Feminin") {
                this.datePacientNou.femeie = true;
            }
            if (selected == "Masculin") {
                this.datePacientNou.femeie = false;
            }
            this.pacientNou.refresh();
        },

        selectAlergii: function () {
            const selected = this.byId("alergiiID").getSelectedButton().getProperty("text");
            if (selected == "Da") {
                this.datePacientNou.alergic = true;
            }
            if (selected == "Nu") {
                this.datePacientNou.alergic = false;
            }
            this.pacientNou.refresh();
        },

        confirmAdd: function () {
            //send this.datePacientNou to DB
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
                    debugger
                }
            } else {
                this._oDialog.open();
            }
        },

        onCancel: function () {
            this._oDialog.close();
            this._oDialog.destroy();
            this._oDialog = undefined;
        }
    });
});