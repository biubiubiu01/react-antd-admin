import { Component } from 'react'
import { Card, Button, Select, Space, Popconfirm, message } from 'antd'
import { getTableData, deleteTable, batchDeleteTable } from '@/api/table'
const { Option } = Select
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import StandardTable from '@/components/StandardTable/index'
import './style.less'

export default class tableContainer extends Component {
  state = {
    deleteLoading: false,
    loading: false,
    selectedRowKeys: [],
    currentEdit: {},
    editShow: false,
  }
  selectValue = []
  filterList = {
    page: 1,
    size: 15,
    total: 0,
    status: '',
  }

  typeOption = [
    {
      key: '待付款',
      label: '待付款',
    },
    {
      key: '待发货',
      label: '待发货',
    },
    {
      key: '已发货',
      label: '已发货',
    },
    {
      key: '已收货',
      label: '已收货',
    },
    {
      key: '已评价',
      label: '已评价',
    },
  ]
  tableHead = [
    {
      title: '序号',
      dataIndex: 'index',
      scopedSlots: { customRender: 'index' },
      width: 60,
    },
    {
      title: '用户id',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: '付款人',
      dataIndex: 'name',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
    },
    {
      title: '下单时间',
      dataIndex: 'date',
      ellipsis: true,
    },
    {
      title: '付款金额',
      dataIndex: 'money',
      scopedSlots: { customRender: 'money' },
    },
    {
      title: '备注',
      dataIndex: 'text',
      ellipsis: true,
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' },
      width: 140,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="你确定要删除当前列吗?"
            okText="是"
            cancelText="否"
            onConfirm={() => this.handleDelete(text)}
          >
            <Button type="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  tableData = []

  componentDidMount() {
    this.getTableData()
  }

  getTableData = () => {
    this.setState({
      loading: true,
    })
    const { page, size, status } = this.filterList

    getTableData({ page, size, status }).then((res) => {
      const data = res.data || {}
      this.filterList.total = data.total || 0
      this.setState({
        tableData: data.list || [],
        loading: false,
      })
    })
  }

  changeStatus = (val) => {
    this.filterList.status = val
  }

  handleChangeCurrent = (val) => {
    this.filterList.page = val
    this.getTableData()
  }

  handleSearch = () => {
    this.filterList.page = 1
    this.getTableData()
  }

  handleSelect = (key, value) => {
    this.setState({
      selectedRowKeys: key,
    })
    this.selectValue = value
  }

  batchDeleteTable = () => {
    //模拟删除
    if (this.selectValue.length == 0) {
      message.warning('请至少勾选一项')
      return
    }
    this.setState({
      deleteLoading: true,
    })
    const batchId = this.selectValue.map((item) => item.id).join(',')
    batchDeleteTable({ batchId }).then((res) => {
      this.getTableData()
      message.success('批量删除成功')
      this.setState({
        deleteLoading: false,
      })
    })
  }

  handleDelete = (val) => {
    const { id } = val
    deleteTable({ id }).then((res) => {
      this.getTableData()
      message.success('删除成功')
    })
  }

  render() {
    const { deleteLoading, tableData, loading, selectedRowKeys } = this.state
    const { tableHead, handleSelect, filterList } = this

    return (
      <div className="table-wrapper">
        <Card
          title={
            <div slot="title" className="flex flex-wrap">
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                loading={deleteLoading}
                style={{ margin: '0 16px 10px' }}
                onClick={this.batchDeleteTable}
              >
                批量删除
              </Button>

              <div className="filter-wrapper" style={{ margin: '0 15px' }}>
                <span className="label">订单状态：</span>
                <Select
                  placeholder="订单状态"
                  className="select-width"
                  allowClear
                  onChange={this.changeStatus}
                >
                  {this.typeOption.map((item) => {
                    return (
                      <Option key={item.key} value={item.key}>
                        {item.label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                style={{ marginRight: '16px' }}
                onClick={this.handleSearch}
              >
                查询
              </Button>
            </div>
          }
          hoverable={true}
          bordered={false}
        >
          <StandardTable
            tableData={tableData}
            tableHead={tableHead}
            loading={loading}
            pagination={{
              pageSize: filterList.size,
              current: filterList.page,
              total: filterList.total,
              showTotal: (total) => `${filterList.total} 条`,
            }}
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              onChange: handleSelect,
            }}
            changeCurrent={this.handleChangeCurrent}
          ></StandardTable>
        </Card>
      </div>
    )
  }
}
