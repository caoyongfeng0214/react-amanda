var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { Suspense, useEffect, useState } from 'react';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';

import { NotFound } from 'react-admin-easy-core';

import TabFooter from './tabFooter';

var Transition = React.forwardRef(function Transition(props, ref) {
    return React.createElement(Slide, Object.assign({ direction: 'down', ref: ref }, props));
});

var DialogTabHeader = function DialogTabHeader(_ref) {
    var tab = _ref.tab,
        close = _ref.close;

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        update = _useState2[0],
        setUpdate = _useState2[1];

    useEffect(function () {
        tab._setOptions = function () {
            setUpdate(!update);
        };
    });

    return React.createElement(
        AppBar,
        { position: 'static' },
        React.createElement(
            Toolbar,
            { variant: 'dense', className: 'E_DialogTabHeader' },
            React.createElement('div', null),
            React.createElement(
                'div',
                null,
                tab.options.title
            ),
            React.createElement(
                'div',
                null,
                tab.options.btns && tab.options.btns.map(function (T, I) {
                    return React.createElement(
                        Button,
                        { variant: 'contained', key: I, color: T.color || 'error',
                            ref: function ref(domEle) {
                                if (!tab.btns) {
                                    tab.btns = [];
                                }
                                tab.btns.push(domEle);
                            },
                            onClick: function onClick(e) {
                                if (T.fn) {
                                    T.fn(e, I);
                                } else {
                                    close(tab);
                                }
                            } },
                        T.txt || 'Submit'
                    );
                }),
                React.createElement(
                    'span',
                    null,
                    !tab.hideClose && React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(Divider, { orientation: 'vertical', flexItem: true }),
                        React.createElement(
                            IconButton,
                            { variant: 'contained', color: 'inherit', size: 'large', className: 'E_DialogTabHeaderClose', onClick: function onClick() {
                                    return close(tab);
                                } },
                            React.createElement(CloseIcon, { fontSize: '40' })
                        )
                    )
                )
            )
        )
    );
};

var DialogTab = function DialogTab(props) {
    return React.createElement(
        Dialog,
        { className: 'E_DialogTab' + (props.tab.size ? ' ' + props.tab.size : ''), sx: { zIndex: props.tab.zIndex }, hideBackdrop: props.hideBackdrop
            // sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            // maxWidth="xs"
            // TransitionProps={{ onEntering: handleEntering }}
            , TransitionComponent: Transition,
            transitionDuration: 400,
            open: props.open,
            onClose: function onClose() {
                if (props.tab.route && props.tab.route.searchParams.__auto__) {
                    props.close();
                }
            }
        },
        React.createElement(DialogTabHeader, props),
        React.createElement(
            DialogContent,
            { dividers: true, className: 'E_DialogTabContent' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    NotFound,
                    { route: props.tab.route },
                    React.createElement(
                        Suspense,
                        { fallback: React.createElement(
                                'div',
                                null,
                                'Loading.....'
                            ) },
                        props.tab.ele
                    )
                )
            ),
            React.createElement(TabFooter, { tab: props.tab })
        )
    );
};

export default DialogTab;