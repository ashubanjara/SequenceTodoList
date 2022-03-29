import React, {Component} from 'react';
import ListItem from './Components/ListItem/ListItem';
import InputTextbox from './Components/InputTextbox/InputTextbox';
import { getCurrentDate } from './Utils/utils';
import './App.css';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import UserNameInput from './Components/UserNameInput/UserNameInput';

class App extends Component {

    constructor(){

        super();
        this.state = {
            dialogIsOpen: false,
            listItems: [],
            isSetup: false,
            userName: ""
        }

        this.addListItem = this.addListItem.bind(this);
        this.deleteListItem = this.deleteListItem.bind(this);
        this.updateChecked = this.updateChecked.bind(this);
        this.clearItems = this.clearItems.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.setUserName = this.setUserName.bind(this);
    }

    componentDidMount(){
        const userName = localStorage.getItem("userName") || ""
        if (userName !== "") {
            this.setState({isSetup: true})
            this.setState({userName: userName})
        }
        

        const savedData = (localStorage.getItem("ListItems") && JSON.parse(localStorage.getItem("ListItems"))) || []
        this.setState({listItems: savedData})
    }

    updateLocalStorage(){
        localStorage.setItem("ListItems", JSON.stringify(this.state.listItems))
    }

    addListItem(item){
        this.setState(prevState => {
            return {listItems: [...prevState.listItems, {text: item.text, checked: item.checked}]}
        },
        () => {
            this.scrollToBottom()
            this.updateLocalStorage()
        }
        )
    }

    setUserName(userName){
        this.setState({
            userName: userName,
            isSetup: true
        },
        () => {
            localStorage.setItem("userName", this.state.userName)
        }
        )
    }
    
    deleteListItem(id){
        let newList = [...this.state.listItems];
        newList.splice(id, 1)
        this.setState({listItems: newList},
            () => {
                this.updateLocalStorage()
            })
    }

    updateChecked(id, checked){
        let newList = [...this.state.listItems];
        newList[id].checked = checked;
        this.setState({listItems: newList},
            () => {
                this.updateLocalStorage()
            })
    }

    clearItems(){
        this.setState({listItems: []},
            () => {
                localStorage.setItem("ListItems", [])
                this.setState({dialogIsOpen: false})
            })
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    // Drag and drop functions

    onDragEnd(result){
        if (!result) {
            return
        }
        const updatedListItems = [...this.state.listItems];
        const [reorderedItem] = updatedListItems.splice(result.source.index, 1);
        updatedListItems.splice(result.destination.index, 0, reorderedItem)
        this.setState({listItems: updatedListItems},
            () => {
                this.updateLocalStorage()
            })
    }

    render(){
        const { listItems, dialogIsOpen, isSetup, userName } = this.state

        return (
            <React.Fragment>
                <div className="greeting">
                </div>
    
                <div className='main-container'>
                    <div className="header-container">
                        <div className="date">
                            {!isSetup ? 
                            <div style={{display: 'flex'}}>
                                What should we call you? 
                                <UserNameInput setUserName={this.setUserName}/>
                            </div>
                             : 
                            <div>Hi, {userName}, Today is <span className="date-decoration">{getCurrentDate()}</span></div>}
                        </div>
                        <button 
                        className="clear-btn"
                        style={listItems.length <= 0 ? {color: '#6F7E8C', border: '1px solid #6F7E8C', cursor: 'default'} : {}}
                        onClick={listItems.length <= 0 ? null : () => {this.setState({dialogIsOpen: true})}}>
                            CLEAR ALL
                        </button>
                    </div>
                    
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId='listItems'>
                                {(provided) => (
                                    <div 
                                    className="list-item-container" 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef} 
                                    >
                                        {listItems.map((item, index) => 
                                            <ListItem
                                            key={index} 
                                            deleteListItem={this.deleteListItem}
                                            updateChecked={this.updateChecked} 
                                            id={index} 
                                            text={item.text} 
                                            checked={item.checked}
                                            />
                                        )}
                                        <div className='dummy-div' ref={(el) => { this.messagesEnd = el; }}></div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                </div>
                <InputTextbox addListItem={this.addListItem} />
                <Dialog
                open={dialogIsOpen}
                PaperProps={{
                    style: {
                      backgroundColor: '#fafad2',
                      boxShadow: 'none',
                    },
                }}>
                    <DialogTitle>
                        <div style={{fontSize: '20px'}}>Are you sure you want to clear the to-do list? <br/>(<span style={{color: '#d32f'}}>Warning</span>: you will permanently lose all your items)</div>
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.setState({dialogIsOpen: false})}> Back </Button>
                        <Button onClick={this.clearItems} color="error" autoFocus>
                                Clear All
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default App;
