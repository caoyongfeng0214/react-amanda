import Button from '@mui/material/Button';

import { Targets, useENavigate } from "react-admin-easy-core";

var HeaderMenus = function HeaderMenus(_ref) {
    var header = _ref.header;

    var enavigate = useENavigate();

    return React.createElement(
        'div',
        { style: {
                textAlign: header && header.align || 'left'
            } },
        header && header.items && header.items.map(function (T, I) {
            return React.createElement(
                Button,
                { key: I, color: 'inherit', onClick: function onClick() {
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
                    } },
                T.title
            );
        })
    );
};

export default HeaderMenus;