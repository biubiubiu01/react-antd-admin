import toolbar from './toolbar'
import plugins from './plugins'
import styles from './style'
import PropTypes from 'prop-types'
import remoteLoad from '@/utils/remoteLoad'
const { TinymceCDN } = require('@/plugins/cdn')
import { Component } from 'react'
import { message } from 'antd'

export default class Tinymce extends Component {
  static propTypes = {
    height: PropTypes.string,
    resize: PropTypes.bool,
    value: PropTypes.string,
  }
  static defaultProps = {
    height: '500',
    resize: true,
    value: '',
  }

  state = {
    errorStatus: false,
    fullscreen: false,
    id: 'editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
  }

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroyTinymce()
  }

  init = async () => {
    try {
      await remoteLoad(TinymceCDN)
      if (window.tinymce) {
        this.initTinymce()
      } else {
        message.error('加载资源失败')
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }

  initTinymce() {
    const that = this
    const { height, resize, value } = this.props
    window.tinymce.init({
      selector: `#${that.state.id}`, //容器
      language: 'zh_CN', //可选  en,zh_CN,es_MX,ja
      height: height,
      object_resizing: resize, //图片的大小调整手柄
      toolbar: toolbar,
      plugins: plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean', //过滤从Word粘贴的内容  clean,merge,prompt
      default_link_target: '_blank', //默认打开方式在新窗口打开
      link_title: false, //标记标题是否选择
      paste_retain_style_properties: 'all',
      paste_word_valid_elements: '*[*]', // word需要它
      paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false, // 插入word文档需要该属性
      file_picker_types: 'media',
      content_style: styles,
      init_instance_callback: (editor) => {
        //初始化，如果存在value  直接添加上去
        if (value) {
          editor.setContent(value)
        }
        that.firstInit = true
        editor.on('input change undo redo', () => {
          that.setState({
            errorStatus: true,
          })
          // that.$emit('input', editor.getContent())
        })
      },
      setup(editor) {
        editor.on('FullscreenStateChanged', (e) => {
          that.setState({
            fullscreen: e.state,
          })
        })
      },
      images_upload_handler: function (blobInfo, success, failure) {
        const formData = new FormData()
        formData.append('file', blobInfo.blob())
        //走接口，将线下地址上传到服务器上 ，获取url地址

        const blob = blobInfo.blob()

        const typeList = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

        if (typeList.indexOf(blob.type) == -1) {
          failure('图片只能为png,jpg,jpeg,gif格式')
          return
        }
        if (blob.size > 2097152) {
          failure('图片大小不超过2M')
          return
        }
        const image = require('../../assets/nav/' + blob.name)
        success(image)
      },
      file_picker_callback: function (cb, value, meta) {
        if (meta.filetype == 'media') {
          let input = document.createElement('input') //创建一个隐藏的input
          input.setAttribute('type', 'file')
          input.onchange = function (file) {
            //获取本地，然后调接口获取到url地址
          }
          //触发点击
          input.click()
        }
      },
    })
  }

  setContent = (value) => {
    window.tinymce.get(this.state.id).setContent(value)
  }
  getContent = (value) => {
    window.tinymce.get(this.state.id).getContent()
  }

  destroyTinymce = () => {
    const tinymce = window.tinymce.get(this.state.id)
    if (this.state.fullscreen) {
      tinymce.execCommand('mceFullScreen')
    }
    if (tinymce) {
      tinymce.destroy()
    }
  }

  render() {
    return (
      <div
        className={`tinymce-container ${
          this.state.fullscreen ? 'fullscreen' : ''
        }`}
      >
        <textarea id={this.state.id} className="tinymce-textarea"></textarea>
      </div>
    )
  }
}
