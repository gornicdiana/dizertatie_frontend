sap.ui.define([], function () {
    "use strict";
    const origin = "localhost:8080";
    const pacient = "/pacient";
    const slash = "/";
    return {
        getPacientUrl: function () {
            return origin + pacient;
        },

        postPacientUrl: function () {
            return origin + pacient;
        },

        getPacientByIdUrl: function () {
            return origin + pacient + slash;
        }
    };
});