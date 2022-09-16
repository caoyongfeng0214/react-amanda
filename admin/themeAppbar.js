import React from "react";

import AppBar from '@mui/material/AppBar';

var ThemeAppbar = function ThemeAppbar(props) {
    return React.createElement(AppBar, Object.assign({}, props, { color: props.color || props.config && props.config.color || 'primary' }));
};

export default ThemeAppbar;