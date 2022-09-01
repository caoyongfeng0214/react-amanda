import React from "react";

import './index.css';

import EasyCore, { Targets, ELink, useENavigate, NotFound } from "react-admin-easy-core";

var PUBLICs = {};

var getHeaderState = function getHeaderState() {
    if (PUBLICs.getHeaderState) {
        return PUBLICs.getHeaderState();
    }
};

var toggleHeaderState = function toggleHeaderState() {
    if (PUBLICs.toggleHeaderState) {
        PUBLICs.toggleHeaderState();
    }
};

export { getHeaderState, toggleHeaderState, Targets, ELink, useENavigate, NotFound };

var Admin = function Admin(props) {
    var config = props.config || {};

    config.loginPage = React.lazy(function () {
        return import('./login');
    });
    config.layoutPage = React.lazy(function () {
        return import('./layout');
    });
    config.ing = React.lazy(function () {
        return import('./ing');
    });

    return React.createElement(EasyCore, { config: config, publics: PUBLICs });
};

export default Admin;