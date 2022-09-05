var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';

var TabFooter = function TabFooter(_ref) {
    var tab = _ref.tab;

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        update = _useState2[0],
        setUpdate = _useState2[1];

    tab._setOptions1 = function (ops) {
        setUpdate(!update);
    };

    // return tab.options.pagenation
    //     &&
    //     <div className="E_Pg">
    //         <AppBar component="div" className="E_PgBar">
    //             <Toolbar variant="dense">
    //                 <Pagination count={10} variant="outlined" color="secondary" size="large" hidePrevButton hideNextButton/>
    //             </Toolbar>
    //         </AppBar>
    //     </div>
    return React.createElement(
        React.Fragment,
        null,
        tab.options.pagination && tab.options.pagination.count > 0 && React.createElement(
            'div',
            { className: 'E_Pg' },
            React.createElement(
                AppBar,
                { component: 'div', className: 'E_PgBar' },
                React.createElement(
                    Toolbar,
                    { variant: 'dense' },
                    React.createElement(Pagination, { count: tab.options.pagination.count, variant: 'outlined', color: 'secondary', size: 'large',
                        defaultPage: tab.options.pagination.defaultPage ? tab.options.pagination.defaultPage + 1 : 1,
                        onChange: function onChange(evt, val) {
                            if (tab.options.pagination.onChange) {
                                tab.options.pagination.onChange(val - 1);
                            }
                        },
                        hidePrevButton: true, hideNextButton: true })
                )
            )
        )
    );
};

export default TabFooter;