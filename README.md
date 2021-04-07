<p align="center">
    <img src="https://images.gitee.com/uploads/images/2020/1129/181145_3aeaf5c3_7647779.png" alt="Logo" width="250">
   <h1 align="center"> react antd admin</h3>
</p>

  <p align="center">
    <a href="https://github.com/biubiubiu01/react-antd-admin"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/biubiubiu01/react-antd-admin/issues">提出Bug</a>
    ·
    <a href="https://github.com/biubiubiu01/react-antd-admin/issues">提出建议</a>
  </p>

## 简介

react-antd-admin是一个后台管理系统，基于react全家桶(react+react-router-dom+redux+react-redux+less)开发 ，包含动态路由+权限管理解决用户权限问题，提供基础固定权限：admin、test、editor和自定义用户权限，可自定义修改角色对应的菜单；还有一些后台管理系统常用的功能如表单，table表等；

## 测试账号
```
过一段时间后才发现忘记放测试账号和密码了，哈哈哈

1.  用户名：admin  密码 任意6位数 （如果你喜欢，可以用123456） 拥有admin的权限可以查看所有页面
2.  用户名：test   密码 任意6位数 （如果你喜欢，可以用123456） 拥有test的页面权限，可以查看部分页面
3.  用户名：editor 密码 任意6位数 （如果你喜欢，可以用123456） 拥有editor的页面权限，可以查看富文本等页面
4.  使用手机号验证码登录 ，默认拥有admin的权限

```

已实现基础版node+express+mysql后台，地址：[vue-antd-server](https://github.com/biubiubiu01/vue-antd-server)

vue版本:地址：[vue-antd-admin ](https://github.com/biubiubiu01/vue-antd-admin)


## 前序准备
* 学习react基本使用,生命周期,jsx,创建组件的方式，hooks等；
* react-router-dom的基本使用,Route,Link,WithRouter等是使用
* redux和react-redux的使用方法
* antd的使用
* webpack配置

## 功能

```
- 登录  用户名密码/手机号验证码
- 权限  
- 动态路由
- echarts各种图表
- arcgis地图
- 克里金插值分析图
- 富文本
- Markdown
- 错误页面 403 404 500
- 个人设置
- 面包屑
- svg图标
- 全屏
- 返回顶部
- webpack优化
- table表
- hooks
```


## 使用说明
```
- 拥有 admin、test和editor三种权限，每个权限对应的路由和左侧菜单不同；
- 系统管理员拥有所有权限，可以更改用户对应的菜单路由和角色对应的权限。
......
```


### 文件目录说明
```

├── config                           ---mock模拟数据
├── public                           ---静态资源文件
├── script                          
├── src          
│  ├── api                           ---接口     
│  ├── assets                        ---图片
│  ├── components                    ---可复用的组件
│  ├── icons                         ---图标
│  ├── layouts                       ---布局方式
│  ├── mock                          ---mock模拟
│  ├── pages                         ---页面
│  ├── router                        ---路由
│  ├── store                         ---vuex
│  ├── styles                        ---sass样式
│  ├── utils                         ---方法函数
│  ├── App.js                       
│  ├── index.js                      
├── .env
├── .eslintrc.js
├──  package.json
├──  package-lock.json
├──  README.md


```


 
## 安装

```
# 克隆项目
git clone https://github.com/biubiubiu01/react-antd-admin.git
# 进入项目目录
cd react-antd-admin
# 安装依赖
npm install
# 本地开发 启动项目
npm start
```


### 部署

```
# 打包项目
npm run build
```


## 最后

这个项目是最近学习react后写的项目，目的是为了让自己对于react有更好的理解，具体页面功能使用之前写的vue-antd-admin，采用react进行重写，中间学习到了react-router-dom和react-redux+redux,通过这个项目，自己对react有了更好的了解。








