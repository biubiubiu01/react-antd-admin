import { Component } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon/index'

export default class Logo extends Component {
  render() {
    return (
      <Link to="/index" className="logo-wrapper ">
        <SvgIcon icon="logo" size={30}></SvgIcon>
        <div className="logo-title">React Antd Admin</div>
      </Link>
    )
  }
}
