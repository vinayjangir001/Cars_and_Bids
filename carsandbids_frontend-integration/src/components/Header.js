import { Component } from "react";
import Logo from "../images/logo.PNG";
import "../css/w3.css";
import AuctionList from "./AuctionList";
import { Link } from "react-router-dom";

class Header extends Component{

    constructor(props){
        super(props);

        this.state = {
            AUCTION : "Auction",
            SELL : "Sell a Car",
            DOC : "What's Cars and Bids",
            // CREATE_AUCTION: 'Create-Auction', 
            LOGIN : "Login",
            SIGNUP : "Sign Up",
            LOGOUT:"Log Out",
            defaultLanding : true,
            sendToLoginSignUp : false,
            isSignUp : false,
            userName : "",
            email : "",
            password : "",
            isSignUp : this.props.isSignUp,
            showLoginAndSignUp :true,
            searchText:"",
            emailError: "",
            userNameError: "",
            passwordError: "",
        }
    }

    handleLogin = async () => {
        if(this.state.isSignUp){


          if (!this.state.userName || this.state.userName.length < 3 || !this.state.email || !this.state.password || this.state.password.length < 6) {
            if (!this.state.userName || this.state.userName.length < 3) {
                window.alert("User name must be at least 3 characters long.");
            }
            if (!this.state.email || !/^\S+@\S+\.\S+$/.test(this.state.email)) {
                window.alert("Please enter a valid email address.");
            }
            if (!this.state.password || this.state.password.length < 6) {
                window.alert("Password must be at least 6 characters long.");
            }
            return; // Prevent the API call if there are validation errors
        }

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
            console.log(data)
            this.afterSignUpLogin();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else{

          if (!this.state.email || !/^\S+@\S+\.\S+$/.test(this.state.email)) {
            window.alert("Please enter a valid email address.");
            return; // Prevent the API call if there are validation errors
        }
        if (!this.state.password || this.state.password.length < 6) {
            window.alert("Password must be at least 6 characters long.");
            return; // Prevent the API call if there are validation errors
        }




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

            if(localStorage.getItem("authToken")!=null){
                this.afterSignUpLogin();
            }

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        };

        // updateState = (event) => {
        //     if(event.target.getAttribute("placeholder") === "User Name"){
        //     this.setState({userName : event.target.value});
        //     }
        //     else if(event.target.getAttribute("placeholder") === "Email"){
        //       this.setState({email : event.target.value});
        //     } else{
        //       this.setState({password : event.target.value});
        //     }
        //   }

        updateState = (event) => {
          if (event.target.getAttribute("placeholder") === "User Name") {
              const userName = event.target.value;
              this.setState({ userName });
      
              if (userName.length < 3) {
                  this.setState({ userNameError: "User name must be at least 3 characters long" });
              } else {
                  this.setState({ userNameError: "" });
              }
          } else if (event.target.getAttribute("placeholder") === "Email") {
              const email = event.target.value;
              this.setState({ email });
      
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                  this.setState({ emailError: "Please enter a valid email address" });
              } else {
                  this.setState({ emailError: "" });
              }
          } else if (event.target.getAttribute("placeholder") === "Password") {
              const password = event.target.value;
              this.setState({ password });
      
              if (password.length < 6) {
                  this.setState({ passwordError: "Password must be at least 6 characters long" });
              } else {
                  this.setState({ passwordError: "" });
              }
          }
      };

    loginOrSignUp(event) {  
        if(event.target.innerHTML=== this.state.LOGIN){
            this.setState({sendToLoginSignUp : true,isSignUp : false})
        } else{
            this.setState({sendToLoginSignUp : true,isSignUp : true})
        }
    }  

    afterSignUpLogin(){
      if(this.state.isSignUp){
        this.setState({sendToLoginSignUp : false, isSignUp : false});
      } else{
        this.setState({sendToLoginSignUp : false, isSignUp : false});
        this.setState({showLoginAndSignUp:false});
      }
    }

    componentDidMount(){
      if(localStorage.getItem("authToken")){
        this.setState({showLoginAndSignUp:false});
      }
    }

    logout(){
        localStorage.removeItem("authToken");
        this.setState({sendToLoginSignUp : false, isSignUp : false});
        this.setState({showLoginAndSignUp:true});
    }
    
    search(event){
        this.setState({searchText:event.target.value})
        console.log(this.state.searchText)
    }

    render(){

        const defaultLanding = this.state.defaultLanding

        let loginController,signupController,sendToSignUpPage, sendToLoginPage,logoutController ;

        const sendToLoginSignUp = this.state.sendToLoginSignUp;

        if(defaultLanding){
            loginController = <a  href="#" style={{display: this.state.showLoginAndSignUp?"block":"none"}} class="w3-bar-item w3-button w3-mobile w3-padding-32" onClick={this.loginOrSignUp.bind(this)}>{this.state.LOGIN}</a>;
            signupController = <a href="#" style={{display: this.state.showLoginAndSignUp?"block":"none"}} class="w3-bar-item w3-button w3-mobile w3-padding-32" onClick={this.loginOrSignUp.bind(this)}>{this.state.SIGNUP}</a>;
            logoutController = <a href="#" style={{display: this.state.showLoginAndSignUp?"none":"block"}} class="w3-bar-item w3-button w3-mobile w3-padding-32" onClick={this.logout.bind(this)}>{this.state.LOGOUT}</a>;
        }

        if(sendToLoginSignUp){
            if(this.state.isSignUp){
                sendToSignUpPage = (
              <div>
         <div class="w3-padding-16" style={{margin:"0 50rem"}}><input class="w3-input w3-border w3-round"  type="text" value={this.state.userName} onChange={this.updateState} placeholder="User Name"></input></div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-input w3-border w3-round"  type="text" value={this.state.email} onChange={this.updateState} placeholder="Email"></input>
                </div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-input w3-border w3-round"  type="password" value={this.state.password} onChange={this.updateState} placeholder="Password"></input>
                </div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-button w3-round w3-green w3-padding-16" type="button" value="Submit" onClick={this.handleLogin}></input>
                </div>
            </div>)
            } else{
                sendToLoginPage = (<div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-input w3-border w3-round"  type="text" value={this.state.email} onChange={this.updateState} placeholder="Email"></input>
                </div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-input w3-border w3-round"  type="password" value={this.state.password} onChange={this.updateState} placeholder="Password"></input>
                </div>
                <div class="w3-padding-16" style={{margin:"0 50rem"}}>
                <input class="w3-button w3-round w3-green w3-padding-16" type="button" value="Submit" onClick={this.handleLogin}></input>
                </div>
            </div>)
            }
        }

        return(<>
            <div class="w3-bar">
                <div class="w3-bar-item w3-button w3-mobile" ><img src={Logo}/></div>
                {/* <a href="#" class="w3-bar-item w3-button w3-mobile w3-padding-32">{this.state.AUCTION}</a>
                <a href="#" class="w3-bar-item w3-button w3-mobile w3-padding-32">{this.state.SELL}</a> */}
                {/* <a href="#" class="w3-bar-item w3-button w3-mobile w3-padding-32">{this.state.DOC}</a> */}

                <Link to="/create-auction" className="w3-bar-item w3-button w3-mobile w3-padding-32">
          Auction {}
           </Link>


           <Link to="/past-auction" className="w3-bar-item w3-button w3-mobile w3-padding-32">
          Past - Auction {}
           </Link>

                <Link to="/about-us" className="w3-bar-item w3-button w3-mobile w3-padding-32">
          What's Cars and Bids {}
           </Link>

            

          
                <div class="w3-bar-item w3-mobile" style={{float: "right"}} >
                    <div class="w3-bar">
                {/* <input class="w3-bar-item w3-input w3-border w3-round" style={{marginTop: "1.7rem"}} type="text" onChange={this.search.bind(this)}></input> */}
                {loginController}
                {signupController}
                {logoutController}
                </div>
                </div>
            </div>
            {sendToLoginPage}
            {sendToSignUpPage}

            {this.state.sendToLoginSignUp ? (
                <p></p>
            ) : (
                <AuctionList searchText={this.state.searchText} />
            )}
        </>)
    }
}

export default Header;