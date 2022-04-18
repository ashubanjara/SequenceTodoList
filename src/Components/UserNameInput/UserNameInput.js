import React, {Component} from 'react';
import './UserNameInput.css';


class UserNameInput extends Component {

    constructor(){
        super()
        this.state = {
            userName: ""
        }
        this.handlePressEnter = this.handlePressEnter.bind(this)
    }

    handlePressEnter(event){
        const { userName } = this.state
        if (event.key === "Enter" && userName !== ""){
            this.props.setUserName(userName)
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const { userName } = this.state;
        return (
            <div className="username-input-container">
                <input 
                className="username-input" 
                name="userName" 
                value={userName} 
                type="text"
                onChange={this.handleChange.bind(this)} 
                maxLength="20" 
                style={{width: `${userName.length*10 > 45 ? userName.length*11 + 10 : 60}px`}}
                onKeyDown={this.handlePressEnter}
                autoComplete="off"/>
            </div>
        )
    }
}

export default UserNameInput