var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useRef, useState } from "react";

import Button from '@mui/material/Button';
// import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

var Login = function Login(props) {
    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        ing = _useState2[0],
        setIng = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        showError = _useState4[0],
        setShowError = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        closing = _useState6[0],
        setClosing = _useState6[1];

    var refUName = useRef();
    var refPwd = useRef();

    var onFocus = function onFocus() {
        setShowError(false);
    };

    return React.createElement(
        'div',
        { className: 'loginPage' + (closing ? ' close' : '') },
        React.createElement(
            'div',
            { className: 'loginBox' },
            React.createElement(
                'div',
                { className: 'loginHeader' },
                React.createElement('img', { className: 'loginLogo', src: props.config.logo || 'https://code-push.cn/ico.png' }),
                props.config.title === undefined ? 'React Amanda Admin' : props.config.title,
                React.createElement(
                    'span',
                    { className: 'signin' },
                    'Sign in'
                )
            ),
            React.createElement(
                'form',
                { onSubmit: function onSubmit(e) {
                        e.preventDefault();
                        if (props.config.login) {
                            if (props.config.login.fn && !ing) {
                                setIng(true);
                                refUName.current.blur();
                                refPwd.current.blur();
                                props.config.login.fn(e.target.loginUName.value, e.target.loginPwd.value, function (success) {
                                    setIng(false);
                                    if (success) {
                                        setClosing(true);
                                        setTimeout(function () {
                                            props.$setAuthed(true);
                                        }, 500);
                                    } else {
                                        // refUName.current.focus();
                                        setShowError(true);
                                    }
                                });
                            }
                        }
                    } },
                React.createElement(
                    'div',
                    { className: 'loginMain' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(TextField, { name: 'loginUName', inputRef: refUName, label: 'User Name', fullWidth: true, margin: 'dense', required: true, onFocus: onFocus, autoFocus: true, autoComplete: 'off', autoCorrect: 'off', defaultValue: props.config.login.defaultUserName || '' })
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(TextField, { name: 'loginPwd', inputRef: refPwd, type: 'password', label: 'Password', fullWidth: true, margin: 'normal', required: true, onFocus: onFocus, autoComplete: 'off', defaultValue: props.config.login.defaultPassword || '' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'loginRooter' },
                    React.createElement(
                        Button,
                        { type: 'submit', variant: 'contained', size: 'large', color: 'secondary', disabled: ing },
                        'Sign In'
                    ),
                    showError && React.createElement(
                        Alert,
                        { severity: 'error', sx: { marginTop: '0.5rem' } },
                        'Invalid username or password'
                    )
                )
            )
        )
    );
};

export default Login;