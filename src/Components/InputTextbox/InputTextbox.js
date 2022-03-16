import React, {Component} from 'react';
import './InputTextbox.css';


class InputTextbox extends Component {

    constructor(){
        super()
        this.state = {
            textInput: ""
        }
        this.handlePressEnter = this.handlePressEnter.bind(this)
    }

    setTextInput(value){
        this.setState({textInput: value})
    }

    handlePressEnter(event){
        const { textInput } = this.state
        if (event.key === "Enter" && textInput !== ""){
            this.props.addListItem({text: textInput, checked: false})
            this.setState({textInput: ""})
        }
    }

    render(){
        const { textInput } = this.state;
        return (
            <div className="input-textbox-container">
                <input 
                className="input-textbox" 
                placeholder="Add A Task" 
                type="text"
                value={textInput}
                onChange={e => this.setTextInput(e.target.value)} 
                onKeyDown={this.handlePressEnter}/>
            </div>
        )
    }
}

export default InputTextbox