import React, {Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {
    Row,
    Col,
    Icon,
    Menu,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message
} from 'antd'
const FormItem = Form.Item
const MenuItem = Menu.Item
const TabPane = Tabs.TabPane;
import logo from "../images/logo.png"

class NewsHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            currkey:'top',
            username:null,
            userID:null,
            modalvisible:false
        }
    }
    componentDidMount(){//免登陆
        const username = localStorage.username
        const userID = localStorage.userID
        this.setState({username, userID})
    }
    //点击切换menu
    clickItem = (event) =>{
        const key = event.key
        this.setState({
            currkey:key
        })
        if(key === "register"){
            this.setState({modalvisible:true})
        }
    }
    //关闭对话框
    handle = (modalvisible, event) =>{
        this.setState({modalvisible})
    }
    //退出
    logout =() =>{
        this.setState({
            username:null,
            userID:null,
        })
        localStorage.userID = ''
        localStorage.username = ''
    }
    //handleSubmit处理登陆和注册
    handleSubmit =(isRegister, event) =>{
        //清除默认行为
        event.preventDefault()
        //得到输入的数据
        const action = isRegister ? 'register':'login'
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=
${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        axios.get(url)
            .then(response => {
                const data = response.data
                if(isRegister){
                    message.success('注册成功')
                }else{
                    if(!data){
                        message.error('登陆失败')
                    }else{
                        message.success('登陆成功')
                        console.log(data)
                        this.setState({
                            username:data.NickUserName,
                            userID:data.userId
                        })
                        //保存到localStorage里面
                        /*localStorage.setItem(username, data.NickUserName)
                        localStorage.setItem(userId, data.UserId)*/
                        localStorage.userID = data.UserId
                        localStorage.username = data.NickUserName
                    }
                }
            })
            .catch(error =>{
                console.log(error.message)
            })

        this.setState({modalvisible:false})
    }
    render () {
        const {currkey, username, modalvisible} = this.state
        const {getFieldDecorator} = this.props.form
        const items = username
            ?(
                <MenuItem title='login' key="login" className="register">
                    <Button type="primary">{username}</Button>
                    &nbsp;&nbsp;
                    <Link to='/usercenter'>
                    <Button type="dashed">个人中心</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="Ghost" onClick={this.logout}>退出</Button>
                </MenuItem>
            )
            :(
                <MenuItem title='register' key="register" className="register">
                    <Icon type="appstore" />
                    <span>注册/登陆</span>
                </MenuItem>
            )
        return (
            <header>
                <Row>
                    <Col span={2} />
                    <Col span={3}>
                        <div className="logo">
                            <img src={logo} alt="logo"/>ReactNews
                        </div>
                    </Col>
                    <Col span={17}>
                        <Menu mode="horizontal" selectedKeys={[currkey]} onClick={this.clickItem}>
                            <MenuItem title='top' key="top">
                                <Icon type="appstore" />
                                <span>头条</span>
                            </MenuItem>
                            <MenuItem title='shehui' key="shehui">
                                <Icon type="appstore" />
                                <span>社会</span>
                            </MenuItem>
                            <MenuItem title='guonei' key="guonei">
                                <Icon type="appstore" />
                                <span>国内</span>
                            </MenuItem>
                            <MenuItem title='guoji' key="guoji">
                                <Icon type="appstore" />
                                <span>国际</span>
                            </MenuItem>
                            <MenuItem title='yule' key="yule">
                                <Icon type="appstore" />
                                <span>娱乐</span>
                            </MenuItem>
                            <MenuItem title='tiyu' key="tiyu">
                                <Icon type="appstore" />
                                <span>体育</span>
                            </MenuItem>
                            <MenuItem title='keji' key="keji">
                                <Icon type="appstore" />
                                <span>科技</span>
                            </MenuItem>
                            <MenuItem title='shisahng' key="shishang">
                                <Icon type="appstore" />
                                <span>时尚</span>
                            </MenuItem>
                            {items}
                        </Menu>
                        <Modal title="用户中心" visible={modalvisible}
                           onOk={this.handle.bind(this, false)}
                           onCancel={this.handle.bind(this, false)}
                           okText="关闭"
                        >
                            <Tabs type="card" onChange={() =>this.props.form.resetFields()}>
                             <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator('username')(
                                            <Input placeholder="请输入账号"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('password')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )}
                                    </FormItem>
                                    <Button htmlType='submit' type="primary">登陆</Button>
                                </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                  <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator('r_userName')(
                                            <Input placeholder="请输入账号"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('r_password')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('r_confirmPassword')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )}
                                    </FormItem>
                                    <Button htmlType='submit' type="primary">注册</Button>
                                  </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2} />
                </Row>
            </header>
        )
    }
}
export default Form.create()(NewsHeader)
//经过 Form.create 包装的组件将会自带 this.props.form 属性
