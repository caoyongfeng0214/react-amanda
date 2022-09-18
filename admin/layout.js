var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Drawer from '@mui/material/Drawer';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import purple from '@mui/core/colors/purple';


import { Targets, NotFound } from "react-admin-easy-core";

import ThemeAppbar from "./themeAppbar";
import DialogTab from './dialogTab';
import TabFooter from "./tabFooter";

var DataKey = '__react_amanda_admin__';
var SavedData = localStorage.getItem(DataKey);
if (SavedData) {
    try {
        SavedData = JSON.parse(SavedData);
    } catch (ex) {
        SavedData = {};
    }
} else {
    SavedData = {};
}

var SaveData = function SaveData() {
    localStorage.setItem(DataKey, JSON.stringify(SavedData));
};

var MainTabHeader = function MainTabHeader(_ref) {
    var tab = _ref.tab,
        idx = _ref.idx,
        activeMainTabIdx = _ref.activeMainTabIdx,
        closeMainTab = _ref.closeMainTab;

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        update = _useState2[0],
        setUpdate = _useState2[1];

    tab._setOptions = function (ops) {
        setUpdate(!update);
    };

    return React.createElement(Chip, { label: tab.options.title, component: 'span', sx: { textTransform: "none" }, color: activeMainTabIdx == idx ? 'warning' : 'default',
        onDelete: function onDelete() {
            closeMainTab(tab);
        }
    });
};

var RightTabHeader = function RightTabHeader(_ref2) {
    var tab = _ref2.tab,
        closeRightTab = _ref2.closeRightTab;

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        update = _useState4[0],
        setUpdate = _useState4[1];

    useEffect(function () {
        tab._setOptions = function () {
            setUpdate(!update);
        };
    });

    return React.createElement(
        Toolbar,
        { variant: 'dense', className: 'E_RightTabHeader' },
        React.createElement(
            'div',
            null,
            React.createElement(
                IconButton,
                { variant: 'contained', color: 'inherit', size: 'large', className: 'E_RightTabHeaderClose', onClick: function onClick() {
                        return closeRightTab(tab);
                    } },
                React.createElement(CloseIcon, { fontSize: '40' })
            ),
            React.createElement(Divider, { orientation: 'vertical', flexItem: true })
        ),
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
                            if (I == 0) {
                                tab._btns = [];
                            }
                            tab._btns.push(domEle);
                        },
                        onClick: function onClick(e) {
                            if (T.fn) {
                                T.fn();
                            } else {
                                closeRightTab(tab);
                            }
                        } },
                    T.txt || 'Submit'
                );
            })
        )
    );
};

var NavTooltip = styled(function (_ref3) {
    var className = _ref3.className,
        props = _objectWithoutProperties(_ref3, ['className']);

    return React.createElement(Tooltip, Object.assign({}, props, { classes: { popper: className } }));
})(function (_ref4) {
    var theme = _ref4.theme;
    return _defineProperty({}, '& .' + tooltipClasses.tooltip, {
        transform: 'translateX(-1rem) scale(1.2) !important'
    });
});

var SettingsBtn = React.lazy(function () {
    return import('./settingsBtn');
});

var Themes = {
    light: createTheme({
        palette: {
            mode: 'light'
        }
    }),
    dark: createTheme({
        palette: {
            primary: {
                main: '#212121'
            }
            // divider: '#000'
        },
        components: {
            MuiChip: {
                styleOverrides: {
                    colorWarning: {
                        backgroundColor: '#9a561e'
                    }
                }
            }
            // ThemeAppbar: {
            //     styleOverrides: {
            //         ['& .MuiDivider-root']: {
            //             borderColor: '#ff0000 !important'
            //         }
            //     }
            // }
        }
    })
};

var Layout = function Layout(props) {
    var _useState5 = useState(document.body.clientWidth < 600 && !props.oldRoute || SavedData.mainNavsOpen === false ? false : true),
        _useState6 = _slicedToArray(_useState5, 2),
        mainNavsOpen = _useState6[0],
        setMainNavsOpen = _useState6[1];

    useEffect(function () {
        SavedData.mainNavsOpen = mainNavsOpen;
        SaveData();
    }, [mainNavsOpen]);

    var _useState7 = useState(SavedData.openedMainNavs || {}),
        _useState8 = _slicedToArray(_useState7, 2),
        openedMainNavs = _useState8[0],
        setOpenedMainNavs = _useState8[1];

    useEffect(function () {
        SavedData.openedMainNavs = openedMainNavs;
        SaveData();
    }, [openedMainNavs]);

    var _useState9 = useState(SavedData.hideHeader === undefined ? !!props.config.hideHeader : SavedData.hideHeader),
        _useState10 = _slicedToArray(_useState9, 2),
        hideHeader = _useState10[0],
        setHideHeader = _useState10[1];

    useEffect(function () {
        SavedData.hideHeader = hideHeader;
        SaveData();
    }, [hideHeader]);

    var mainNavs = props.config.mainNavs || [];

    var navigate = useNavigate();

    var toggleMainNavs = function toggleMainNavs() {
        setMainNavsOpen(!!!mainNavsOpen);
    };

    var toggleHeader = function toggleHeader() {
        setHideHeader(!hideHeader);
    };

    if (props.publics) {
        props.publics.getHeaderState = function () {
            return hideHeader;
        };
        props.publics.toggleHeaderState = toggleHeader;
        props.publics.setAuthed = props.$setAuthed;
    }

    var HeaderMenus = props.config.eleHeader || React.lazy(function () {
        return import('./headerMenus');
    });

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            ThemeProvider,
            { theme: Themes[props.config.theme || SavedData.theme] || Themes.light },
            React.createElement(
                'div',
                { className: 'E_Layout' + (mainNavsOpen ? '' : ' E_MainNavClosed') },
                React.createElement(CssBaseline, null),
                React.createElement(
                    Drawer,
                    { className: 'E_MainNavs',
                        variant: 'permanent',
                        sx: function sx(theme) {
                            // let displayXs = 'block';
                            // if(!mainNavsOpen) {
                            //     displayXs = 'none';
                            // }
                            return Object.assign({
                                // display: { xs: displayXs, sm: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box' },
                                transition: theme.transitions.create('width', {
                                    easing: theme.transitions.easing.sharp,
                                    duration: theme.transitions.duration.leavingScreen
                                })
                            }, mainNavsOpen ? {} : {
                                width: { xs: '0 !important', sm: 'calc(5rem + 1px) !important' }
                            });
                        },
                        open: mainNavsOpen
                    },
                    React.createElement(
                        ThemeAppbar,
                        { position: 'static', className: 'E_MainNavsHeader', config: props.config },
                        React.createElement(
                            Toolbar,
                            { variant: 'dense', className: 'E_MainNavsHeaderToggleBox' },
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'div',
                                    null,
                                    props.config.eleTitle ? React.createElement(
                                        Suspense,
                                        null,
                                        React.createElement(props.config.eleTitle, Object.assign({}, props, { mainNavsOpen: mainNavsOpen }))
                                    ) : React.createElement(
                                        React.Fragment,
                                        null,
                                        React.createElement('img', { src: props.config.logo || 'https://code-push.cn/ico.png' }),
                                        React.createElement(
                                            'h1',
                                            null,
                                            props.config.title === undefined ? 'Amanda Admin' : props.config.title
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    IconButton,
                                    { edge: 'start', color: 'inherit', 'aria-label': 'menu',
                                        onClick: toggleMainNavs },
                                    mainNavsOpen ? React.createElement(MenuOpenIcon, null) : React.createElement(MenuIcon, null)
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'E_MainNavsBox' },
                        React.createElement(
                            List,
                            null,
                            mainNavs.map(function (T, I) {
                                var _selected = I == props.selectedMainNavIdx && props.selectedMainNavChildIdx === -1;
                                return React.createElement(
                                    ListItem,
                                    { key: I, disablePadding: true },
                                    React.createElement(
                                        ListItemButton,
                                        { selected: _selected,
                                            onClick: function onClick() {
                                                if (T.childs) {
                                                    if (!mainNavsOpen || !T.url) {
                                                        setOpenedMainNavs(Object.assign({}, openedMainNavs, _defineProperty({}, I + '', !openedMainNavs[I])));
                                                    } else {
                                                        if (!openedMainNavs[I]) {
                                                            setOpenedMainNavs(Object.assign({}, openedMainNavs, _defineProperty({}, I + '', true)));
                                                        }
                                                    }
                                                }
                                                if (T.url) {
                                                    navigate(T.url);
                                                }
                                            }
                                        },
                                        mainNavsOpen && React.createElement(
                                            ListItemIcon,
                                            null,
                                            T.icon && React.createElement(
                                                Suspense,
                                                { fallback: React.createElement('span', null) },
                                                React.createElement(T.icon, { color: _selected && 'secondary' || '' })
                                            ) || React.createElement(LaunchIcon, { color: _selected && 'secondary' || '' })
                                        ) || React.createElement(
                                            NavTooltip,
                                            { title: T.title, placement: 'right-start', arrow: true },
                                            React.createElement(
                                                ListItemIcon,
                                                null,
                                                T.icon && React.createElement(
                                                    Suspense,
                                                    { fallback: React.createElement('span', null) },
                                                    React.createElement(T.icon, { color: _selected && 'secondary' || '' })
                                                ) || React.createElement(LaunchIcon, { color: _selected && 'secondary' || '' })
                                            )
                                        ),
                                        React.createElement(ListItemText, { primary: T.title,
                                            primaryTypographyProps: _selected && {
                                                color: 'secondary',
                                                fontWeight: 'medium'
                                            } || {} }),
                                        T.childs && mainNavsOpen && React.createElement(
                                            IconButton,
                                            { edge: 'start', color: 'inherit', fontSize: 'small', onClick: function onClick(e) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenedMainNavs(Object.assign({}, openedMainNavs, _defineProperty({}, I + '', !openedMainNavs[I])));
                                                    return false;
                                                } },
                                            openedMainNavs[I] ? React.createElement(ExpandMoreIcon, null) : React.createElement(NavigateNextIcon, null)
                                        ) || null
                                    ),
                                    T.childs && React.createElement(
                                        Collapse,
                                        { 'in': openedMainNavs[I], timeout: 'auto', unmountOnExit: true },
                                        React.createElement(
                                            List,
                                            { component: 'div', disablePadding: true },
                                            T.childs.map(function (P, J) {
                                                var _selected2 = I == props.selectedMainNavIdx && J == props.selectedMainNavChildIdx;
                                                return React.createElement(
                                                    ListItemButton,
                                                    { key: I + '_' + J, className: 'E_MainNavsChildItem',
                                                        selected: _selected2,
                                                        onClick: function onClick() {
                                                            navigate(P.url);
                                                        } },
                                                    mainNavsOpen && React.createElement(
                                                        ListItemIcon,
                                                        null,
                                                        P.icon && React.createElement(
                                                            Suspense,
                                                            { fallback: React.createElement('span', null) },
                                                            React.createElement(P.icon, { color: _selected2 && 'secondary' || '' })
                                                        ) || React.createElement(LaunchIcon, { color: _selected2 && 'secondary' || '' })
                                                    ) || React.createElement(
                                                        NavTooltip,
                                                        { title: P.title, placement: 'right-start', arrow: true },
                                                        React.createElement(
                                                            ListItemIcon,
                                                            null,
                                                            P.icon && React.createElement(
                                                                Suspense,
                                                                { fallback: React.createElement('span', null) },
                                                                React.createElement(P.icon, { color: _selected2 && 'secondary' || '' })
                                                            ) || React.createElement(LaunchIcon, { color: _selected2 && 'secondary' || '' })
                                                        )
                                                    ),
                                                    React.createElement(ListItemText, { primary: P.title,
                                                        primaryTypographyProps: _selected2 && {
                                                            color: 'secondary',
                                                            fontWeight: 'medium'
                                                        } || {} })
                                                );
                                            })
                                        )
                                    )
                                );
                            })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'E_Main' },
                    !hideHeader && React.createElement(
                        'div',
                        { className: 'E_MainHeader' },
                        React.createElement(
                            ThemeAppbar,
                            { position: 'static', config: props.config },
                            React.createElement(
                                Toolbar,
                                { variant: 'dense', className: 'E_MainHeaderBox' },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        IconButton,
                                        { size: 'large', edge: 'start', color: 'inherit', 'aria-label': 'menu',
                                            sx: function sx() {
                                                return {
                                                    display: { xs: mainNavsOpen ? 'none' : 'inline-flex', sm: 'none' }
                                                };
                                            },
                                            onClick: toggleMainNavs },
                                        mainNavsOpen ? React.createElement(MenuOpenIcon, null) : React.createElement(MenuIcon, null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        Suspense,
                                        { fallback: React.createElement('span', null) },
                                        React.createElement(HeaderMenus, { header: props.config.header })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(Divider, { orientation: 'vertical', flexItem: true }),
                                    React.createElement(
                                        Suspense,
                                        { fallback: React.createElement('span', null) },
                                        React.createElement(SettingsBtn, { moreMenus: props.config.moreMenus, logoutHandler: props.config.logout, logoutTxt: props.config.logoutTxt, $setAuthed: props.$setAuthed })
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'E_MainContainer' },
                        React.createElement(
                            'div',
                            { className: 'E_MainTabs' },
                            React.createElement(
                                'div',
                                { className: 'E_MainTabsBox' },
                                React.createElement(
                                    'div',
                                    { className: 'E_MainTabsMainNavsToggle' },
                                    hideHeader && React.createElement(
                                        React.Fragment,
                                        null,
                                        React.createElement(
                                            IconButton,
                                            { size: 'large', color: 'inherit', 'aria-label': 'menu',
                                                sx: function sx() {
                                                    return {
                                                        display: { xs: mainNavsOpen ? 'none' : 'inline-flex', sm: 'none' }
                                                    };
                                                },
                                                onClick: toggleMainNavs },
                                            mainNavsOpen ? React.createElement(MenuOpenIcon, null) : React.createElement(MenuIcon, null)
                                        ),
                                        React.createElement(Divider, { orientation: 'vertical', variant: 'middle', flexItem: true })
                                    )
                                ),
                                React.createElement(
                                    Tabs,
                                    { value: props.activeMainTabIdx
                                        // onChange={(e, newVal) => {
                                        //     setActiveTabIdx(newVal);
                                        //     console.log(e);
                                        // }}
                                        , variant: 'scrollable',
                                        scrollButtons: true,
                                        'aria-label': 'visible arrows tabs example',
                                        sx: _defineProperty({}, '& .' + tabsClasses.scrollButtons, {
                                            '&.Mui-disabled': { opacity: 0.3 }
                                        })
                                    },

                                    // MainTabs.map((T, I) => <Tab key={T.route.url} className="E_MainTabItem"
                                    //     // label={T.options.title}
                                    //     label={
                                    //         <Chip label={T.options.title} component="span" color={ActiveMainTabIdx == I ? 'warning' : 'default'}
                                    //             onDelete={() => {
                                    //                 removeMainTab(I);
                                    //             }}
                                    //         />
                                    //     }
                                    //     onClick={() => {
                                    //         navigate(T.route.url);
                                    //     }}/>)

                                    props.mainTabs.map(function (T, I) {
                                        return React.createElement(Tab, { key: T.route.url, className: 'E_MainTabItem', component: 'span'
                                            // label={T.options.title}
                                            , label: React.createElement(MainTabHeader, { tab: T, idx: I, activeMainTabIdx: props.activeMainTabIdx, closeMainTab: props.closeMainTab }),
                                            onClick: function onClick() {
                                                navigate(T.route.url);
                                            } });
                                    })
                                ),
                                hideHeader && React.createElement(
                                    'div',
                                    { className: 'E_MainTabsSettings' },
                                    React.createElement(
                                        Suspense,
                                        { fallback: React.createElement('span', null) },
                                        React.createElement(SettingsBtn, { moreMenus: props.config.moreMenus, logoutHandler: props.config.logout, logoutTxt: props.config.logoutTxt, hideHeader: hideHeader, header: props.config.header, $setAuthed: props.$setAuthed, edge: false })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'E_MainTabContents' },
                            props.mainTabs.map(function (T, I) {
                                return React.createElement(
                                    'div',
                                    { key: T.route.url, className: 'E_MainTabContentItem' + (I == props.activeMainTabIdx ? ' E_MainTabContentActive' : '') },
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            NotFound,
                                            { route: T.route },
                                            React.createElement(
                                                Suspense,
                                                { fallback: React.createElement(
                                                        'div',
                                                        null,
                                                        'Loading.....'
                                                    ) },
                                                T.ele
                                            )
                                        )
                                    ),
                                    React.createElement(TabFooter, { tab: T })
                                );
                            })
                        )
                    )
                )
            ),
            props.popTabs.map(function (T, I) {
                return T.target === Targets._right ? React.createElement(
                    Drawer,
                    { key: T.dt,
                        className: 'E_RightDrawer' + (T.size ? ' ' + T.size : ''),
                        sx: { zIndex: T.zIndex },
                        anchor: 'right',
                        hideBackdrop: I != props.popTabs.filter(function (P) {
                            return P.opened;
                        }).length - 1
                        // open={openedRightTabs[T.dt]}
                        , open: props.openedPopTabs[T.dt],
                        onClose: function onClose() {
                            if (T.route.searchParams.__auto__) {
                                props.closePopTab(T);
                            }
                        }
                    },
                    React.createElement(
                        ThemeAppbar,
                        { position: 'static', config: props.config },
                        React.createElement(RightTabHeader, { tab: T, closeRightTab: props.closePopTab })
                    ),
                    React.createElement(
                        'div',
                        { className: 'E_RightDrawerContent' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    NotFound,
                                    { route: T.route },
                                    React.createElement(
                                        Suspense,
                                        { fallback: React.createElement(
                                                'div',
                                                null,
                                                'Loading.....'
                                            ) },
                                        T.ele
                                    )
                                )
                            ),
                            React.createElement(TabFooter, { tab: T })
                        )
                    ),
                    React.createElement('div', null)
                ) : React.createElement(DialogTab, { key: T.dt, tab: T, color: props.config && props.config.color, open: !!props.openedPopTabs[T.dt], close: props.closePopTab, hideBackdrop: I != props.popTabs.filter(function (P) {
                        return P.opened;
                    }).length - 1 });
            })
        )
    );
};

export default Layout;