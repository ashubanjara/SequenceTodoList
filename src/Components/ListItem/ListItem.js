import React, {Component} from 'react';
import './ListItem.css'
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Draggable } from 'react-beautiful-dnd';
import { Tooltip } from '@mui/material';

class ListItem extends Component{

    constructor(){
        super()
        this.state = {
            checked: false,
            isEditMode: false,
            itemText: ""
        }

        this.handlePressEnter = this.handlePressEnter.bind(this)
    }

    componentDidMount(){
        this.setState({checked: this.props.checked})
        this.setState({itemText: this.props.text})
    }

    componentDidUpdate(prevProps){
        if (prevProps.checked !== this.props.checked){
            this.setState({checked: this.props.checked})
        }
        if (prevProps.text !== this.props.text){
            this.setState({itemText: this.props.text})
        }
    }

    handleChange(event) {
        this.setState({checked: event.target.checked},
            () => {this.props.updateChecked(this.props.id, this.state.checked)});
    };

    switchToEdit() {
        this.setState({isEditMode: true}, () => {this.props.setIsDropDisabled(true)})
    }

    handleTextChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handlePressEnter(event){
        const { itemText } = this.state
        if (event.key === "Enter" && itemText !== ""){
            this.props.editListItem(this.props.id, this.state.itemText)
            this.setState({isEditMode: false}, () => {this.props.setIsDropDisabled(false)})
        }
    }

    render(){
        const { checked, isEditMode, itemText } = this.state;
        const { id, deleteListItem, text } = this.props;
        return (
            <Draggable key={id} draggableId={`${id}`} index={id} isDragDisabled={isEditMode ? true : false}>
                {(provided, snapshot) => {
                    const style = snapshot.isDragging ? {
                        background: 'lightgoldenrodyellow',
                        ...provided.draggableProps.style,
                      } : {...provided.draggableProps.style}
                    return (
                    <div 
                    className="list-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={style}
                    ref={provided.innerRef}>
                        <div>
                            {!isEditMode ?
                            <div className="list-item-text-container"> 
                                <Checkbox size="small" checked={checked} onChange={this.handleChange.bind(this)}/> 
                                <span className="list-item-text" style={{textDecoration: this.state.checked ? "line-through" : ""}}>{text}</span>
                            </div> :
                            <div className="edit-container">
                                <div style={{marginLeft: '7px'}}>
                                <Tooltip title="Edit mode">
                                    <EditOutlinedIcon sx={{ color: '#696969' }}/>
                                </Tooltip>
                                </div>
                                <span className="edit-input-container">
                                    <input 
                                    className="edit-input" 
                                    name="itemText" 
                                    value={itemText} 
                                    type="text"
                                    onChange={this.handleTextChange.bind(this)}  
                                    onKeyDown={this.handlePressEnter}
                                    autoComplete="off"/>
                                </span>
                            </div>}
                        </div>
                        <div>
                        </div>
                        <div className="icon-container">
                            <Tooltip title="Edit" arrow>
                                <div className="edit-icon" onClick={() => {this.switchToEdit()}}>
                                    <EditOutlinedIcon sx={{ fontSize: 26.5 }} color="primary"/>
                                </div>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                                <div className="delete-icon" onClick={() => deleteListItem(id)}>
                                    <DeleteOutlineIcon color='error'/>
                                </div>
                            </Tooltip>
                        </div>
                    </div>)
                }}
            </Draggable>
        )
    }

    
}

export default ListItem