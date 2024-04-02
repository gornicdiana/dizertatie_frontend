sap.ui.define(["ui5Starter/controller/BaseController",
"sap/ui/model/Filter",
'sap/ui/model/FilterOperator'
], function (BaseController, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("ui5Starter.controller.DetaliiPacient", {

        onInit: async function () {
            let oRouter = this.getRouter();
        },
    });
});