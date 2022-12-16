import React, { Component } from 'react';
import {BarChart,LineChart,PieChart} from './d3class.js';

import { Slider, Checkbox, Divider,List } from 'antd';


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Male', 'Female', 'Unknown'];
const defaultCheckedList = ['Male', 'Female', 'Unknown'];

export  class View2 extends Component {
    render() {
        const {data} = this.props;
        const width = 220;
        const height = 220;
        return (
            <div id='view2' className='pane'>
                <div className='header'>性别分布饼状图</div>
                <PieChart data={data} width={width} height={height} />
            </div>
        )
    }
}

export  class View3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        };
    }

    onChangeCheckbox = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
        this.props.changeIncludedGender(checkedList);
    };

    onCheckAllChange = e => {
        const checkedList = e.target.checked ? plainOptions : [];
        this.setState({
            checkedList: checkedList,
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.changeIncludedGender(checkedList);
    };

    onChangeSilder = value => {
        this.props.changeGreaterThenAge(value);
    }

    render() {
        return (
            <div id='view3' className='pane'>
                <h3>控制台</h3>
                <div style={{ width: 275, margin: 5 }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <div style={{ width: 275, margin: 5 }}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedList}
                        onChange={this.onChangeCheckbox}
                    />
                </div>
                <Divider />
                <h3>Age</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder}/>
            </div>
        )
    }
}


export  class View4 extends Component {
    render() {
        const {user} = this.props,
              width = 1380,
              height = 550;
        return (
            <div id='view4' className='pane' >
                <div className='header'>选定用户活动时序分布</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                    <LineChart data={user} width={width} height={height}/>
                </div>
            </div>
        )
    }
}

export  class View5 extends Component {
    render() {
        const {data} = this.props;
        return (
            <div id='view5' className='pane'>
                <div className='header'>筛选用户年龄分布</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                <BarChart data={data} width={1000 - 8} height={230 - 4}/>
                </div>                
            </div>
        )
    }
}

export  class View6 extends Component {

    selectUser = (user) => {
        this.props.changeSelectUser(user);
    }

    render() {
        const {data} = this.props;
        return (
            <div id='view6' className='pane'>
                <div className='header'>用户列表</div>
                <List
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={user => <List.Item onClick = {() => this.selectUser(user)}>
                        <div>
                            {user.name + '----' + user.age +'----'+user.gender}
                        </div>
                    </List.Item>}
                />
            </div>
        )
    }
}