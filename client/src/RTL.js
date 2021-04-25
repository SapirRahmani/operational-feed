import React from "react";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = ({ children }) => {
    return (
        <StylesProvider jss={jss}>
            {children}
        </StylesProvider>
    );
}

export default RTL;