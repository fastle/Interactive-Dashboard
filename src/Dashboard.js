import React, { Component } from 'react';
import data from './data.js';
import { Layout } from 'antd';
import {View2,View3,View4,View5,View6} from './documents.js';
import './index.css';

const { Sider, Content } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: data[0],
            greaterThenAge: 0,
            includedGender: ['Male', 'Female', 'Unknown'],
        }
    }

    changeSelectUser = value => {
        this.setState({
            selectedUser: value
        })
    }

    changeGreaterThenAge = value => {
        this.setState({
            greaterThenAge: value
        })
    }

    changeIncludedGender = value => {
        this.setState({
            includedGender: value
        })
    }

    render() {
        const { selectedUser, greaterThenAge, includedGender } = this.state;
        const filteredData = data.filter(user => includedGender.indexOf(user.gender) !== -1)
            .filter(user => user.age > greaterThenAge);
        return (
            <div>
                <Layout style={{ height: 880 }}>

                    <Layout>
                        <Content style={{ height: 600,backgroundColor: '#000' ,Color: '#fff'}}>
                            <View4 user={selectedUser} />
                        </Content>
                        <Layout style={{ height: 300,backgroundColor: '#000',Color: '#fff' }}>
                            <Content>
                                <View5 data={filteredData} />
                            </Content>
                            
                            <Sider width={300} style={{ backgroundColor: '#000',Color: '#fff' }}>
                            <View2 data={filteredData} />
                            </Sider>
                        </Layout>
                    </Layout>

                    <Sider width={300} style={{ backgroundColor: '#000',Color: '#fff' }}>
                       
                        <Content style={{ height: 400,Color: '#fff' }}>
                            <View3
                                changeGreaterThenAge={this.changeGreaterThenAge}
                                changeIncludedGender={this.changeIncludedGender}
                            />
                        </Content>
                        <Content style={{ height: 200 }}>
                        <View6 data={filteredData} changeSelectUser={this.changeSelectUser}/>
                        </Content>
                    </Sider>

                </Layout>
            </div>
        )
    }
}
