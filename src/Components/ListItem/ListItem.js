import React, {Component} from 'react';
import './ListItem.css'
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

class ListItem extends Component{

    constructor(){
        super()
        this.state = {
            checked: false
        }
    }

    componentDidMount(){
        this.setState({checked: this.props.checked})
    }

    handleChange(event) {
        this.setState({checked: event.target.checked},
            () => {this.props.updateChecked(this.props.id, this.state.checked)});
      };

    render(){
        const { checked } = this.state;
        const { id, deleteListItem, text } = this.props;
        return (
            <div className="list-item">
                <div>
                    <Checkbox size="small" checked={checked} onChange={this.handleChange.bind(this)}/> 
                    <span className="list-item-text" style={{textDecoration: this.state.checked ? "line-through" : ""}}>{text}</span>
                </div>
                <div className="delete-icon" onClick={() => deleteListItem(id)}>
                    <DeleteOutlineIcon color='error'/>
                </div>
            </div>
        )
    }

    
}

export default ListItem