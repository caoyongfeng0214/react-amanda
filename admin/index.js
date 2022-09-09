import React from "react";

import './index.css';

import EasyCore, { Targets, ELink, useENavigate, NotFound, Dialog } from "react-admin-easy-core";

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

var setAuthed = function setAuthed(authed) {
    if (PUBLICs.setAuthed) {
        PUBLICs.setAuthed(authed);
    }
};

export { getHeaderState, toggleHeaderState, setAuthed, Targets, ELink, useENavigate, NotFound, Dialog };

var Admin = function Admin(props) {
    var config = props.config || {};

    config.loginPage = config.login && config.login.page || React.lazy(function () {
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

(function () {
    var metaPowerName = 'powered-by',
        metaPower = document.head.querySelector('meta[name="' + metaPowerName + '"]');
    if (!metaPower) {
        metaPower = document.createElement('meta');
        metaPower.setAttribute('name', metaPowerName);
        document.head.appendChild(metaPower);
    }
    metaPower.setAttribute('content', 'caoyongfeng0214@gmail.com <https://github.com/caoyongfeng0214/react-amanda>');
})();