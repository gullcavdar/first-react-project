import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios';

class UpdateUser extends Component {
    state ={
        name: "",
        department: "",
        salary:""
    }

    changeInput = (e) => {
        this.setState({
            // name : name
            [e.target.name] : e.target.value
        })
    }
    componentDidMount = async () => {
        const {id} = this.props.match.params;

        const response = await axios.get(`http://localhost:3000/users/${id}`);

        const {name,salary,department} = response.data;

        this.setState({
            name,
            salary,
            department,
            error : false
        });

    }
    validateForm = () =>{
        const {name, department,salary} = this.state;

        if(name === "" || department === "" || salary === ""){
            return false;
        }
        return true;

    }
    updateUser = async (dispatch,e) =>{
        e.preventDefault();

        // UpdateUser
        const{name,salary,department} = this.state;
        const {id} = this.props.match.params;

        const updatedUser ={
            name,
            salary,
            department
        };

        if(!this.validateForm()){
            this.setState({
                error: true
            })
            return;
        }
        const response = await axios.put(`http://localhost:3000/users/${id}`,updatedUser);

        dispatch({type:"UPDATE_USER", payload: response.data});
        
        // Redirect
        this.props.history.push("/");
    }
    render() {
        const {name,salary,department,error} = this.state;

        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update User Form</h4>
                                </div>
                                <div className="card-body">
                                {
                                    error ? 
                                    <div className="alert alert-danger">Lütfen bilgilerinizi kontrol edin.</div>
                                    :null
                                }   
                                <form onSubmit={this.updateUser.bind(this,dispatch)}>
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
                                    <button type="submit" className="btn btn-danger btn-block">Update User</button>
                                </form>
                                </div>
                            </div>    
                            
                            </div>
                    )
                }
            }
        </UserConsumer>

        
    }
}
export default UpdateUser;