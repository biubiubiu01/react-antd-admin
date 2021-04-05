import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Tabs, Input, Button, Checkbox, notification } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import { isPhone, isPassWord, isCode } from '@/utils/validate'
import SvgIcon from '@/components/SvgIcon/index'
import BoxShow from '@/components/BoxShow/index'
import { getPhoneCode, login, getCodeTest } from '@/api/user'
import { getCache, setCache, removeCache } from '@/utils/session'
import { setToken } from '@/store/modules/user'
import './style.less'

const { TabPane } = Tabs
const { Search } = Input
class Login extends Component {
  state = {
    loading: false,
    currentTab: 'user',
    phoneCode: '获取验证码',
    codeStatus: false,
    remember: true,
    currentCode: null,
  }

  componentDidMount() {
    const userInfo = getCache('LOGIN_INFO')
    if (userInfo) {
      this.form.setFieldsValue(userInfo)
    }
  }

  //修改tab
  changeTab = (val) => {
    this.setState({
      currentTab: val,
    })
  }

  //修改记住密码
  changePasswordCheck = (e) => {
    let checked = e.target.checked
    this.setState({
      remember: checked,
    })
  }

  //关闭Loading
  endLoading = () => {
    this.setState({
      loading: false,
    })
  }

  //获取验证码
  getCode = () => {
    let value = this.phoneInput.state.value
    if (isPhone(value)) {
      this.setState({
        codeStatus: true,
      })
      let time = 60
      var getPhoneIntval = setInterval(() => {
        if (time > 0) {
          time--
          this.setState({
            phoneCode: `重新获取(${time}s)`,
          })
        } else {
          clearInterval(getPhoneIntval)
          getPhoneIntval = null
          this.setState({
            phoneCode: '获取验证码',
            codeStatus: false,
          })
        }
      }, 1000)
      this.codeInput.focus()
      getPhoneCode().then((res) => {
        this.setState({
          currentCode: res.data,
        })
        setTimeout(() => {
          notification.success(
            {
              message: '提示',
              description: '验证码获取成功，您的验证码为：' + res.data,
            },
            12
          )
        }, 1000)
      })
    }
  }

  //提交
  handleLogin = (val) => {
    this.setState({
      loading: true,
    })
    if (this.state.currentTab === 'user') {
      const { username, password } = val
      login({ username, password })
        .then((res) => {
          const { data } = res
          this.props.setToken(data.token)
          if (this.state.remember) {
            setCache('LOGIN_INFO', { username, password })
            this.endLoading()
          } else {
            removeCache('LOGIN_INFO')
          }
          this.props.history.push('/')
        })
        .catch(() => {
          setTimeout(() => {
            this.endLoading()
          }, 500)
        })
    } else if (this.state.currentTab === 'phone') {
      const { phone, code } = val
      getCodeTest({ phone, code })
        .then((res) => {
          const { data } = res
          if (data) {
            this.props.setToken(data.token)
            removeCache('LOGIN_INFO')
            this.endLoading()
            this.props.history.push('/')
          }
        })
        .catch(() => {
          setTimeout(() => {
            this.endLoading()
          }, 500)
        })
    }
  }

  render() {
    return (
      <div className="login-container content bgImg">
        <div className="layout">
          <Form
            className="form-container"
            wrapperCol={{span: 22}}
            size="large"
            onFinish={this.handleLogin}
            ref={(form) => (this.form = form)}
          >
            <div className="title">React Antd Admin</div>
            <Tabs
              defaultActiveKey="user"
              tabBarGutter="35"
              onChange={this.changeTab}
            >
              <TabPane key="user" tab="账号密码登录">
                <BoxShow show={this.state.currentTab === 'user'}>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '用户名不能为空' }]}
                  >
                    <Input
                      allowClear
                      placeholder="请输入账号 (admin or test or editor)"
                      prefix={<UserOutlined className="form-prefix" />}
                    />
                  </Form.Item>
                </BoxShow>

                <BoxShow show={this.state.currentTab === 'user'}>
                  <Form.Item
                    name="password"
                    rules={[
                      () => ({
                        validator(_, value) {
                          if (isPassWord(value)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('请正确输入密码'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      allowClear
                      placeholder="请输入密码 (任意输入6位数)"
                      prefix={<LockOutlined className="form-prefix" />}
                    />
                  </Form.Item>
                </BoxShow>
              </TabPane>
              <TabPane key="phone" tab="手机号登录">
                <BoxShow show={this.state.currentTab === 'phone'}>
                  <Form.Item
                    name="phone"
                    rules={[
                      () => ({
                        validator(_, value) {
                          if (isPhone(value)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error('手机号码有误，请重新填写')
                          )
                        },
                      }),
                    ]}
                  >
                    <Input
                      allowClear
                      ref={(phone) => (this.phoneInput = phone)}
                      placeholder="请输入手机号"
                      maxLength="11"
                      prefix={<MobileOutlined className="form-prefix" />}
                    />
                  </Form.Item>
                </BoxShow>

                <BoxShow show={this.state.currentTab === 'phone'}>
                  <Form.Item
                    name="code"
                    rules={[
                      () => ({
                        validator(_, value) {
                          if (isCode(value)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error('请正确输入6位数验证码')
                          )
                        },
                      }),
                    ]}
                  >
                    <Search
                      placeholder="请输入验证码"
                      enterButton={this.state.phoneCode}
                      maxLength="6"
                      onSearch={this.getCode}
                      loading={this.state.codeStatus}
                      ref={(code) => (this.codeInput = code)}
                    />
                  </Form.Item>
                </BoxShow>
              </TabPane>
            </Tabs>
            <Form.Item style={{ marginTop: '10px' }}>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item className="formItem">
              <Checkbox
                className={
                  this.state.currentTab === 'user' ? 'inline-block' : 'none'
                }
                checked={this.state.remember}
                onChange={this.changePasswordCheck}
              >
                记住密码
              </Checkbox>
              <span className="forge-password pointer">忘记密码</span>
            </Form.Item>
            <Form.Item style={{ marginTop: '-20px' }}>
              <span className="otherLogin">其他登录方式</span>
              <SvgIcon icon="weixin" size={25}></SvgIcon>
              <SvgIcon icon="qq" size={25} className="centerIcon"></SvgIcon>
              <SvgIcon icon="zhifubao" size={25}></SvgIcon>
              <span className="forge-password pointer">注册账户</span>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch(setToken(token))
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)
