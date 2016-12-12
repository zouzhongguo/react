'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router';

require("./login.scss");
const homeIconStyle = {
    color: '#fff',
    marginTop: 13
};
const lineShow = true;
let CaptchaId ="";
let reMobile = /^1[34578]\d{9}$/;
let canLogin = false;
let userData = {};

window.checkUser = function (data) {
  if (data.respCode === 0 ) {
    if(data.respData.hasCertify){
      canLogin = true;
    }
    
    
  }
};

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.totalCount = 60;
        this.state = {
            showAddSubDialog: false,
            state : '',
            current:0,
            errorihone: '',
            count: this.totalCount,
            liked: true,
            phoneValue: '',
            valiValue:'',
            checkbox :true,
            dialogText:''
        };
    }
    changeValue(e,type="iphone") {
        
        let val = e.target.value;
        let valType = type === 'vali' ? 'valiValue' : 'phoneValue';
        
        if(type === 'iphone'){
           if(!reMobile.test(val)){
             this.setState({
                errorihone: '手机号码输入不正确',
                current:0
            });
           }else{
                 if(this.state.liked){
                    this.setState({
                        errorihone: '',
                        current:1
                    });
                 }else{
                    this.setState({
                        errorihone: '',
                        current:0
                    });
                 }
           }
        }
        this.setState({
          [valType]: val
        });
    }
    componentWillMount() {
      const localTime = localStorage.getItem("countTime");
      const iphoneNum = localStorage.getItem("iphoneNum");
      if(iphoneNum&&iphoneNum.length==11){
        this.setState({
           current:1,
           phoneValue:iphoneNum
        })
      }
      if (localTime) {
        var ifTime = (new Date().getTime()-localTime)/1000;
        if (parseInt(ifTime)<this.totalCount) {
          this.countdown(this.totalCount-parseInt(ifTime));
        }
      }
    }
    ClickVali(){
      let checkbox = this.state.checkbox;
      let val =this.state.phoneValue;
      /*var script = document.createElement('script');
        script.src = 'http://zzdsyy.58corp.com:8066/checkuser?tel=18900000000&callback=checkUser';
        document.getElementsByTagName('head')[0].appendChild(script);
        alert(canLogin);
        script.onload = () => {
          if (canLogin) {
                this.countdown();
                 let countTime = new Date().getTime();
                 localStorage.setItem("countTime",countTime)
                 if(checkbox){
                     localStorage.setItem("iphoneNum",val)
                 }else{
                     localStorage.removeItem("iphoneNum")
                 }
                 //发送验证码
                 fetch(`http://zhuanzhuan.58.com/zz/transfer/getCaptcha?mobile=${val}&len=4&type=3&level=4`)
                  .then(res => res.json())
                  .then(data => {
                          CaptchaId = data.respData.id;
                  })
          }
        };


        return;*/
      //发送验证码
       // fetch(`http://zhuanzhuan.58.com/zz/transfer/getCaptcha?mobile=13611285186&len=4&type=3&level=4`, {
       //     method: 'GET'
       // }).then((resp) => {
       //     console.log(resp);
       //     return resp.json();
       // }).then(data => {
       //     console.log(data);
       // });
       //  return;
      if(this.state.current == 1){//防止倒计时结束,后刷新之后又可以点击
        var vali = this.refs.vali.focus();
        /*var script = document.createElement('script');
        script.src = 'http://zzdsyy.58corp.com:8066/checkuser?tel=18900000000&callback=checkUser';
        document.getElementsByTagName('head')[0].appendChild(script);*/
        fetch(`http://zzdsyy.58corp.com/checkuser?tel=${val}`, {
          method: 'GET',
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          }
        })
          .then((data) => {
              return data.json();
            }
          )
          .then((resp) => {
              if (resp.respData.hasCertify == true) {//是否在白名单中

                 this.countdown();
                 let countTime = new Date().getTime();
                 localStorage.setItem("countTime",countTime)
                 if(checkbox){
                     localStorage.setItem("iphoneNum",val)
                 }else{
                     localStorage.removeItem("iphoneNum")
                 }
                 //发送验证码
                 fetch(`http://zhuanzhuan.58.com/zz/transfer/getCaptcha?mobile=${val}&len=4&type=3&level=4`)
                  .then(res => res.json())
                  .then(data => {
                          CaptchaId = data.respData.id;
                  })
              }else{
                  this.setState({
                     errorihone: resp.respData.tip
                 });
              }

          });
      }
    }
    checkbox(e){
      this.setState({
        checkbox: !this.state.checkbox
      });
    }
    Clicksubmit(){
       let {phoneValue, valiValue} = this.state;
       var reMobile = /^1[34578]\d{9}$/;
      
       if(!reMobile.test(phoneValue)){
          this.setState({
              showAddSubDialog: true,
              dialogText:'手机号码不正确'
          });
          return false
       }else if(valiValue.length != 4){
          this.setState({
              showAddSubDialog: true,
              dialogText:'验证码不正确'
          });
          return false
       }else if(!CaptchaId){
           this.setState({
               showAddSubDialog: true,
               dialogText:'未发送验证码'
           });
           return false
       }
       if(!this.state.checkbox){
          localStorage.removeItem("iphoneNum")
       }else{
          localStorage.setItem("iphoneNum",phoneValue)
       }
       //点击登陆按钮
      fetch(`http://zhuanzhuan.58.com/zz/transfer/getCaptcha?tel=${phoneValue}&code=${valiValue}&id=${CaptchaId}`)
       .then(res => res.json())
       .then(data => {

               if(data.respData.success){
                  location.hash = 'add';
               }else{
                  alert(data.respData.tip)
               }
       })

    }
    countdown(originCount = this.totalCount){
      
      if(this.state.liked){
              this.setState({
                liked: false,
                current:0,
                count: originCount || this.state.count
              });
              this.timer = setInterval(() =>{
                let count = this.state.count;
                count -= 1;
                this.setState({
                  count: count
                });
                if (count < 1) {
                  this.setState({
                    liked: true,
                    count: this.totalCount,
                    current:1
                  });
                  clearInterval(this.timer);
                }
              }, 1000);
      }
    }
    closeDialog() {
        this.setState({
            showAddSubDialog: false
        });
    }

    render() {
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        let actions = [
            <RaisedButton
                label="确定"
                secondary={true}
                onTouchTap={this.closeDialog.bind(this)}
                style={{marginRight: 10, marginBottom: 10}}
            />,
        ];
        return (
            <MuiThemeProvider>
            <div>
                <div className="bg-img"></div>
                <div className="box">
                    <div className="box-logo">
                        <div></div><p></p>
                        <span>转转 电商运营后台</span>
                    </div>
                    <div className="box-middle"></div>
                    <div className="box-login">
                        <div className="loginihone">
                            <p>用户登录 | <i> Admin Login</i></p>
                            <ul>
                                 <li>
                                    <p>
                                       <FontIcon className="material-icons">phone_iphone</FontIcon>
                                    </p>
                                    <TextField
                                      hintText="手机号"
                                      defaultValue={localStorage.getItem("iphoneNum")}
                                      style={{color: 'red',width:'220px',textIndent:'10px'}}
                                      errorText={this.state.errorihone}
                                      onChange={(e)=>this.changeValue(e)}
                                      onBlur={(e)=>this.changeValue(e)}
                                      errorStyle={{position: 'absolute',bottom:'-18px'}}
                                      underlineShow={lineShow}
                                      underlineStyle={{borderColor:'#999'}}
                                      maxLength="11"
                                      ref="iphone"
                                    />
                                 </li>
                                 <li>
                                    <p>
                                       <FontIcon className="material-icons">remove_red_eye</FontIcon>
                                    </p>
                                    <TextField
                                      hintText="验证码输入"
                                      style={{color: 'red',width:'110px',textIndent:'10px'}}
                                      errorText={this.state.errorText}
                                      errorStyle={{position: 'absolute',bottom:'-18px'}}
                                      underlineShow={lineShow}
                                      // onChange={(e)=>this.changeVali(e)}
                                      onChange={(e)=>this.changeValue(e,"vali")}
                                      underlineStyle={{borderColor:'#999'}}
                                      maxLength="4"
                                      ref="vali"
                                    />
                                    <a className={this.state.current == 0? 'disable' : ''} onClick={()=>this.ClickVali()} >{text}</a>
                                 </li>
                                 <li>
                                    <div>                   
                                        <Checkbox
                                          label="记住手机号码"
                                          style={{width:"120%"}}
                                          defaultChecked={true}
                                          ref="KeepIhpne"
                                          onCheck={(e)=>this.checkbox(e)}
                                        />
                                        <br/>
                                        <span className='submit' onClick={this.Clicksubmit.bind(this)}>登  录</span>
                                    </div>
                                    
                                 </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open = {this.state.showAddSubDialog}
                    onRequestClose={this.closeDialog.bind(this)}
                    style={{width: '50%', marginLeft: '25%'}}
                >
                  {this.state.dialogText}
                </Dialog>
            </div>

        </MuiThemeProvider>
        )
    }
}

export default Login;