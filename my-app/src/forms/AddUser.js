import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios';


const Animation = posed.div({
    visible: { 
        opacity: 1,
        applyAtStart : {
            display : "block"
        }
    },
    hidden: { 
        opacity: 0,
        applyAtEnd: {
            display : "none"
        }
    }
  });

class AddUser extends Component {
    state ={
        visible: false,
        name: "",
        department: "",
        salary:"",
        error: false
    }

    changeVisibility = () =>{
        this.setState({
            visible: !this.state.visible
        })
    }
    validateForm = () =>{
        const {name, department,salary} = this.state;

        if(name === "" || department === "" || salary === ""){
            return false;
        }
        return true;

    }
    changeInput = (e) => {
        this.setState({
            // name : name
            [e.target.name] : e.target.value
        })
    }
    addUser = async (dispatch,e) =>{
        e.preventDefault();
        const {name, department,salary} = this.state;

        const newUser ={
            name,
            salary,
            department
        }

        if(!this.validateForm()){
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.post("http://localhost:3000/users",newUser);

        dispatch({type: "ADD_USER", payload:response.data});

        // Redirect
        this.props.history.push("/");
    }
    render() {
        const {visible,name,salary,department,error} = this.state;

        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-8 mb-4">
                            <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form" }</button>
                            <Animation pose={visible ? "visible" : "hidden"}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add User Form</h4>
                                </div>

                                <div className="card-body">
                                {
                                    error ? 
                                    <div className="alert alert-danger">Lütfen bilgilerinizi kontrol edin.</div>
                                    :null
                                }
                                <form onSubmit={this.addUser.bind(this,dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input 
                                        className="form-control" 
                                        type="text" 
                                        name="name" 
                                        id="id" 
                                        placeholder="Enter Name" 
                                        value={name}
                                        onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="department">Department</label>
                                        <input 
                                        className="form-control" 
                                        type="text" 
                                        name="department" 
                                        id="department" 
                                        placeholder="Enter Department" 
                                        value={department}
                                        onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="salary">Salary</label>
                                        <input 
                                        className="form-control" 
                                        type="text" 
                                        name="salary" 
                                        id="salary" 
                                        placeholder="Enter Salary" 
                                        value={salary}
                                        onChange={this.changeInput}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger btn-block">Add User</button>
                                </form>
                                </div>
                            </div>    
                            </Animation>
                            </div>
                    )
                }
            }
        </UserConsumer>

        
    }
}
export default AddUser;