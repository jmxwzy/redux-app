import React, { Component } from 'react';
import { connect } from 'react-redux';

class Number extends Component {
    state = {  } 

    handleClick = () => {
        this.props.concat('w ');
    };

    render() { 
        return (
            <React.Fragment>
                <h4>Number: {this.props.number}</h4>
                <button onClick={this.handleClick}>添加</button>
            </React.Fragment>
        );
    }
}

// mapStateToProps：每次store中的状态更新后调用一次，用来更新组件中的值。
const mapStateToProps = (state, props) => {
    return {
        number: state.number,
    }
};

// mapDispatchToProps：组件创建时调用一次，用来将store的dispatch函数传入组件。
// 实现在number组件中修改string组件的值, concat函数本是store中用于string组件的dispatch函数
// 通过mapDispatchToProps将concat函数传入了组件number
// dispatch函数会对整棵state树操作一遍，这里也不例外，于是组件string中的值被修改
const mapDispatchToProps = {
    concat: (c) => {
        return {
            type: 'concat',
            character: c,
        }
    },
    
};

// connect(mapStateToProps, mapDispatchToProps)函数：用来将store与组件关联起来。
// 将store与组件Number关联起来，返回一个新的组件
export default connect(mapStateToProps, mapDispatchToProps)(Number);