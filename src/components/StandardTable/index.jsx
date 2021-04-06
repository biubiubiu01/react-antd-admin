import { Table } from 'antd'
import { Component } from 'react'
import PropsTypes from 'prop-types'

export default class StandardTable extends Component {
  static propTypes = {
    tableHead: PropsTypes.array.isRequired,
    tableData: PropsTypes.array.isRequired,
    loading: PropsTypes.bool,
    pagination: PropsTypes.oneOfType([PropsTypes.object, PropsTypes.bool]),
    rowSelection: PropsTypes.object,
    scroll: PropsTypes.object,
  }
  static defaultProps = {
    tableHead: [],
    tableData: [],
    loading: false,
  }
  render() {
    const {
      tableHead,
      tableData,
      loading,
      pagination,
      rowSelection,
      scroll,
    } = this.props
    return (
      <div className="tableCommon-wrapper">
        <Table
          columns={tableHead}
          dataSource={tableData}
          loading={loading}
          pagination={pagination}
          rowSelection={rowSelection}
          rowKey="id"
          scroll={scroll}
          onChange={(val) => this.props.changeCurrent(val.current)}
        ></Table>
      </div>
    )
  }
}
