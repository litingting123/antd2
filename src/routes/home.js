import React from 'react';
import { connect } from 'dva';
import { Table, Tag, Button, Tooltip, Modal,Input } from 'antd';
import home from './home.css';
class Test extends React.Component {
    state = { visible: false };
    componentDidMount() {
        this.props.dispatch({
            type: 'request/requestResult',
        })
    }
    search = (e)=>{
        this.props.dispatch({
            type: 'request/requestResult',
            payload: e.target.value,
        })
        console.log("值",e.target.value)
    }
    render() {
        console.log("当前组件",this)
        const columns = [
            {
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
            }, {
                title: '描述',
                width: '300px',
                key: 'description',
                dataIndex: 'description',
                className: home.description,
                render: text => <Tooltip title={text}>
                        <p>{text}</p>
                </Tooltip>
            }, {
                title: '图片',
                key: 'img',
                dataIndex: 'image',
                render: item => <img src={item}/>
            }, {
                title: 'humanURL',
                key: 'humanURL',
                dataIndex: 'humanURL',
                render: item => <a href={item}>链接</a>
            }, {
                title: '标签',
                key: 'tag',
                dataIndex: 'tags',
                width: 250,
                render: (item, index) => {
                    const tags = [];
                    item.forEach((item, index) => {tags.push(<Tag key={index}>{item}</Tag>)})
                    return tags;
                }
            }, {
                title: '属性',
                key: 'properties',
                dataIndex: 'properties',
                render: (item, index) => (
                <div>
                    <Button type="primary" onClick={() => this.setState({ visible: true})}>查看详情</Button>
                    <Modal title="查看详情" visible={this.state.visible} mask={false} onOk={() => this.setState({ visible: false})} onCancel={() => this.setState({ visible: false})} okText="OK" cancelText="cancel" centered maskClosable
                    >
                    <Table rowKey={columns => columns.type} dataSource={item} pagination={false}
                    columns={[{title: '类型名称',dataIndex: 'type',},{title: '链接',dataIndex: 'url',}]}/>
                    </Modal>
                </div>)
            }, {title: 'contact信息',dataIndex: 'contact',render: item => item[0].FN}
        ];
        const dataSource = this.props.request.data;
        return (<div>
        <Input placeholder='输入内容' style={{margin:"20px 0"}} onChange = {this.search}/>
            <Table rowKey={columns => columns.name} columns={columns} dataSource={dataSource} pagination={true}/>
        </div>)
    }
}
export default connect(({ request }) => ({
    request,
}))(Test);