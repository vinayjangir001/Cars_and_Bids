import React, { Component, useRef } from "react";
import "../css/w3.css";
import { Link } from "react-router-dom";


class SignupLoginModel extends Component{

    constructor(props){
        super(props);

        this.state = {
            userName : "",
            email : "",
            password : "",
            isSignUp : this.props.isSignUp,
            token : "",
            redirectPath:"",
        }
        this.linkRef = React.createRef();
        this.setState.bind(this);
    }

    componentDidMount(){
      const id = window.location.pathname.split("/")[2];
      this.setState({redirectPath:"/details/"+id})
    }

  

    handleLogin = async () => {
      if(this.props.isSignUp){
        try {
          const { userName, email, password } = this.state;
          const response = await fetch('http://localhost:8081/auth/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             'Accept': 'application/json',
               'Accept-Encoding': 'gzip, deflate, br', // Comma-separated list of supported encodings
               'Connection': 'keep-alive',
            },
            body: JSON.stringify({ userName,email, password }),
          });
    
          const data = await response.json();
          console.log(data);
          this.linkRef.current.click();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else{
        try {
          const { email, password } = this.state;
          const response = await fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             'Accept': 'application/json',
               'Accept-Encoding': 'gzip, deflate, br', // Comma-separated list of supported encodings
               'Connection': 'keep-alive',
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
          this.setState({ token: data.token });
          localStorage.setItem("authToken",data.token);
          this.linkRef.current.click();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      };

      updateState = (event) => {
        if(event.target.getAttribute("placeholder") === "User Name"){
        this.setState({userName : event.target.value});
        }
        else if(event.target.getAttribute("placeholder") === "Email"){
          this.setState({email : event.target.value});
        } else{
          this.setState({password : event.target.value});
        }
      }

    render(){
        let userName;
        if(this.state.isSignUp){
            userName = <div class="w3-padding-16" style={{margin:"0 50rem"}}><input class="w3-input w3-border w3-round"  type="text" value={this.state.userName} onChange={this.updateState} placeholder="User Name"></input></div>
        }


        return(<>
            <div>
                {userName}
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-input w3-border w3-round"  type="text" value={this.state.email} onChange={this.updateState} placeholder="Email"></input>
                </div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-input w3-border w3-round"  type="password" value={this.state.password} onChange={this.updateState} placeholder="Password"></input>
                </div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-button w3-round w3-green w3-padding-16" type="button" value="Submit" onClick={this.handleLogin}></input>
                </div>

                <Link to={this.state.redirectPath} ref={this.linkRef}></Link>
            </div>
        </>)
    }
}

export default SignupLoginModel;