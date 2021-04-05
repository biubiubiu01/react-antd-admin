import { Component } from 'react'
import PropTypes from 'prop-types'

export default class BoxShow extends Component {
  static propTypes = {
    show: PropTypes.bool,
  }

  static defaultProps = {
    show: false,
  }

  render() {
    const { show, children } = this.props
    if (!show) return null
    return children
  }
}
