/**
 * Created by wumingli on 2016/11/28.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

let SeoDialog = React.createClass({
    getInitialState() {
        return {};
    },
    render() {

        let actions = [
            <RaisedButton
                label="取消"
                primary={true}
                onTouchTap={this.props.closeDialog}
                style={{marginRight: 10, marginBottom: 10}}
            />,
            <RaisedButton
                label="确定"
                secondary={true}
                onTouchTap={this.props.actionAfterClose}
            />,
        ];

        if (this.props.noCancel) {
            actions.shift();
        }

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.showDialog}
                onRequestClose={this.props.closeDialog}
                style={{width: '50%', marginLeft: '25%'}}
            >
                {this.props.dialogText || '警告内容'}
            </Dialog>
        );
    }
});

export default SeoDialog;