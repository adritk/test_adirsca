import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Axios from 'axios';
import {Redirect} from 'react-router-dom'



class Login extends Component {
    state = {
        username: "",
        redirect: false
    }


    loginUser = () => {
        let username = this.username.value
        let password = this.password.value
        if(username === '' || password === '') {
            alert('isi semua kolom')
        } else {
            Axios.get(`http://localhost:5000/users?username=${username}&password=${password}`, {
                username,
                password
            })
            .then((res) => {
                if(res.data.length === 0) {
                    alert('username atau password salah')
                } else {
                    localStorage.setItem('user', res.data[0].nama)
                    alert('login sukses')
                    this.setState({username: res.data[0].nama, redirect: true})
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }
    render() { 
        console.log(this.state.username)
        if(this.state.username === 'user') {
            return <Redirect to="/dashboard" />
        }
        return ( 
            <div>
                 <div class="d-flex justify-content-center"     style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)', backgroundColor: 'skyblue'
            }}>

                <MDBCol md="12">
                    <p className="h4 text-center mb-4">Sign in</p>
                    <label htmlFor="defaultFormLoginEmailEx" className="black-text">
                        Username
        </label>
                    <input type="email" id="defaultFormLoginEmailEx" className="form-control" ref={(username) => this.username = username} />
                    <br />
                    <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                        Password
        </label>
                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control" ref={(password) => this.password = password} />
                    <div className="text-center mt-4">
                        <MDBBtn color="primary" onClick={this.loginUser}>Login</MDBBtn>
                    </div>
                </MDBCol>
            </div>
            </div>
         );
    }
}
 
export default Login;