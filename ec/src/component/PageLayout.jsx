/**
 * Created by wumingli on 2016/11/30.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import { pageConfig } from '../common/config';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {seoStyle} from '../common/style';
const lineShow = true;
const PageLayout = (props) => {
    return <MuiThemeProvider>
        <Paper zDepth={2} style={{...seoStyle.paperStyle}}>
            {
                pageConfig.map((item) => (
                    <TextField
                        key={item.nodeId}
                        hintText={`请输入${item.hintText}`}
                        floatingLabelText={item.hintText}
                        style={seoStyle.inputStyle}
                        underlineShow={lineShow}
                        floatingLabelFixed={true}
                        errorText={item.notNull && props.data[item.keyForItem] === '' ? `必须填写${item.hintText}` : ''}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        id={`${props.idPre ? props.idPre + '-' : ''}${item.keyForItem}`}
                        floatingLabelStyle={seoStyle.labelStyle}
                        floatingLabelFocusStyle={seoStyle.labelFocusStyle}
                        defaultValue={props.data[item.keyForItem].trim() !== '' ? props.data[item.keyForItem]: ''}
                        multiLine={item.multi}
                    />
                ))
            }
        </Paper>
    </MuiThemeProvider>;
};

export default PageLayout;