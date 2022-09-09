var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { Suspense } from "react";

import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import Logout from '@mui/icons-material/Logout';
import CodeIcon from '@mui/icons-material/Code';

// import EIcon from "./eIcon";

import { Targets, useENavigate } from "react-admin-easy-core";

var SettingsBtn = function SettingsBtn(props) {
    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        anchorEl = _React$useState2[0],
        setAnchorEl = _React$useState2[1];

    var open = Boolean(anchorEl);

    var enavigate = useENavigate();

    var handleClick = function handleClick(event) {
        setAnchorEl(event.currentTarget);
    };

    var handleClose = function handleClose() {
        setAnchorEl(null);
    };

    var genItem = function genItem(T, I) {
        return T === 'divider' ? React.createElement(Divider, { key: I }) : React.createElement(
            MenuItem,
            { key: I, onClick: function onClick() {
                    setTimeout(function () {
                        if (T.fn) {
                            T.fn();
                        } else if (T.url) {
                            var target = T.target || Targets._dialog,
                                auto = T.auto || false;
                            enavigate.to(T.url, {
                                target: target,
                                auto: auto,
                                size: T.size
                            });
                        }
                    }, 300);
                } },
            React.createElement(
                ListItemIcon,
                null,
                T.icon && React.createElement(
                    Suspense,
                    { fallback: React.createElement('span', null) },
                    React.createElement(T.icon, { fontSize: 'small' })
                )
            ),
            T.title
        );
    };

    return React.createElement(
        React.Fragment,
        null,
        props.edge !== undefined && React.createElement(Divider, { orientation: 'vertical', variant: 'middle', flexItem: true }),
        React.createElement(
            IconButton,
            { size: 'large', edge: props.edge || "end", color: 'inherit',
                onClick: handleClick
            },
            React.createElement(MoreIcon, null)
        ),
        React.createElement(
            Menu,
            {
                anchorEl: anchorEl,
                id: 'settings-menu',
                open: open,
                onClose: handleClose,
                onClick: handleClose,
                PaperProps: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        // '& .MuiAvatar-root': {
                        //     width: 32,
                        //     height: 32,
                        //     ml: -0.5,
                        //     mr: 1,
                        // },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 10,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                },
                transformOrigin: { horizontal: 'right', vertical: 'top' },
                anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
            },
            props.hideHeader && props.header && props.header.items && props.header.items.map(function (T, I) {
                return genItem(T, I);
            }),
            props.hideHeader && props.header && props.header.items && React.createElement(Divider, null),
            props.moreMenus && props.moreMenus.map(function (T, I) {
                return T === 'divider' ? React.createElement(Divider, { key: I }) : React.createElement(
                    MenuItem,
                    { key: I, onClick: function onClick() {
                            setTimeout(function () {
                                if (T.fn) {
                                    T.fn();
                                } else if (T.url) {
                                    var target = T.target || Targets._dialog,
                                        auto = T.auto || false;
                                    enavigate.to(T.url, {
                                        target: target,
                                        auto: auto,
                                        size: T.size
                                    });
                                }
                            }, 300);
                        } },
                    React.createElement(
                        ListItemIcon,
                        null,
                        T.icon && React.createElement(
                            Suspense,
                            { fallback: React.createElement('span', null) },
                            React.createElement(T.icon, { fontSize: 'small' })
                        )
                    ),
                    T.title
                );
            }),
            props.moreMenus && React.createElement(Divider, null),
            React.createElement(
                MenuItem,
                { component: 'a', href: 'https://github.com/caoyongfeng0214/react-amanda', target: '_blank' },
                React.createElement(
                    ListItemIcon,
                    null,
                    React.createElement(CodeIcon, { fontSize: 'small' })
                ),
                'Powered by\xA0',
                React.createElement(
                    'span',
                    { style: { color: "#d60101" } },
                    'Amanda'
                )
            ),
            React.createElement(
                MenuItem,
                { onClick: function onClick() {
                        if (props.logoutHandler) {
                            props.logoutHandler(function (success) {
                                if (success) {
                                    props.$setAuthed(false);
                                }
                            });
                        }
                    } },
                React.createElement(
                    ListItemIcon,
                    null,
                    React.createElement(Logout, { fontSize: 'small' })
                ),
                props.logoutTxt || 'Logout'
            )
        )
    );
};

export default SettingsBtn;