'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import SeoDialog from '../common/Dialog';

const btnStyle = {
    width: 200,
    height: 50
};
const Save = props => (
    <MuiThemeProvider>
        <div className="btns">
            <Link to={props.cancelRouter || '/'}>
                <RaisedButton
                    labelStyle={{fontSize: 18, fontWeight: 700}}
                    label={props.cancelLabel || '取消'}
                    style={btnStyle}
                />
            </Link>
            <RaisedButton
                label={props.saveLabel || '保存'} primary={true}
                style={{...btnStyle, marginLeft: 20}}
                onClick={props.onSaveClick}
                labelStyle={{fontSize: 18, fontWeight: 700}}
            />
            <SeoDialog
                showDialog={props.showDialog || false}
                closeDialog={props.closeDialog}
                actionAfterClose={props.actionAfterClose}
                dialogText={props.dialogText || '弹框提示'}
            />
        </div>
    </MuiThemeProvider>
);

export default Save;