import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.PNG";


class CreateAuction extends React.Component {

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
            
            userId: '',
            email: '',
            password: '',
            username: '',
            carName: '',
            brand: '',
            model: '',
            year: '',
            mileage: '',
            color: '',
            transmissionType: '',
            bodyStyle: '',
            carImages: [],
            auctionId: null,
          };

          
    }

  

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (event) => {
    const files = event.target.files;
    const carImages = [];
    for (let i = 0; i < files.length; i++) {
      carImages.push(files[i]);
    }
    this.setState({ carImages });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      userId,
      email,
      password,
      username,
      carName,
      brand,
      model,
      year,
      mileage,
      color,
      transmissionType,
      bodyStyle,
      carImages,
    } = this.state;

    const user = {
      id: userId,
      email,
      password,
      username,
    };

    const car = {
      carName,
      brand,
      model,
      year,
      mileage,
      color,
      transmissionType,
      bodyStyle,
    };

    const createAuctionUrl = 'http://localhost:8081/createAuction';

    const bearerToken = 'Bearer '+localStorage.getItem("authToken");
    fetch(createAuctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': bearerToken
      },
      body: JSON.stringify({ user, car }),
      // mode: 'no-cors',
      redirect: 'follow'
    }).then((response) => response.json())
    .then((data) => {
        //  const data =  response.json();
            console.log(data)
            const auctionIdtoImage = data.auctionId;
        // this.setState({ auctionId: data.auctionId });
        // ,bearerToken
        this.uploadCarImages(auctionIdtoImage);
      }).catch((error) => {
        console.error('Error creating auction:', error);
      });
  };

  // ,bearerToken
  uploadCarImages = (auctionId ) => {
    const { carImages } = this.state;
    const uploadImagesUrl = `http://localhost:8081/uploadMultipleFiles/${auctionId}`;
    const bearerToken = 'Bearer '+localStorage.getItem("authToken");

    const formData = new FormData();
    for (let i = 0; i < carImages.length; i++) {
      formData.append('files', carImages[i]);
    }

    fetch(uploadImagesUrl, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': bearerToken, 
      },
      body: formData,
      mode: 'no-cors',
      redirect: 'follow'
    }).then((response) => 
    response.text()
    ).then((data) => {
        // Handle the response, if needed
        console.log('Car images uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading car images:', error);
      });
  };

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






    return (
<div className="w3-container w3-padding w3-margin">
      <div>

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
                <input class="w3-bar-item w3-input w3-border w3-round" style={{marginTop: "1.7rem"}} type="text"></input>
                {loginController}
                {signupController}
                {logoutController}
                </div>
                </div>
            </div>
            {sendToLoginPage}
            {sendToSignUpPage}




           {/* <CenteredHeading>Create Auction</CenteredHeading>  */}

           {/* <div>
    <h2>Create Auction</h2>
</div> */}


        <form onSubmit={this.handleSubmit}>
          {/* Input fields for user data */}
          <label>

         
          <div class="w3-padding-16" style={{margin:"0 50rem"}}>
            User ID:
            <input className='w3-input w3-border w3-round' type="text" name="userId" onChange={this.handleChange} />
            </div>
      
          </label>
          <br />
          <label>
          <div class="w3-padding-16" style={{margin:"0 50rem"}}>
            Email:
            <input className='w3-input w3-border w3-round' type="text" name="email" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Password:
            <input className='w3-input w3-border w3-round' type="password" name="password" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Username:
            <input className='w3-input w3-border w3-round' type="text" name="username" onChange={this.handleChange} />
            </div>
          </label>
          <br />

          {/* Input fields for car data */}
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Car Name:
            <input className='w3-input w3-border w3-round' type="text" name="carName" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Brand:
            <input className='w3-input w3-border w3-round' type="text" name="brand" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Model:
            <input className='w3-input w3-border w3-round' type="text" name="model" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Year:
            <input className='w3-input w3-border w3-round' type="text" name="year" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Mileage:
            <input className='w3-input w3-border w3-round' type="text" name="mileage" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Color:
            <input className='w3-input w3-border w3-round' type="text" name="color" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Transmission Type:
            <input className='w3-input w3-border w3-round' type="text" name="transmissionType" onChange={this.handleChange} />
            </div>
          </label>
          <br />
          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Body Style:
            <input className='w3-input w3-border w3-round' type="text" name="bodyStyle" onChange={this.handleChange} />
            </div>
          </label>
          <br />

          {/* Input field for car images */}

          <label>
          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
            Car Images:
            <input className='w3-input w3-border w3-round' type="file" name="carImages" multiple onChange={this.handleFileChange} />
            </div>
          </label>
          <br />

          <div class="w3-padding-8" style={{margin:"0 50rem"}}>
          <button className='w3-button w3-round w3-green w3-padding-16' type="submit" onChange={this.handleSubmit}>Submit</button>
          </div>
        </form>

        {/* Display the submitted data */}
        {this.state.auctionId && (
          <div>
            <h3>Auction ID: {this.state.auctionId}</h3>
            <p>User ID: {this.state.userId}</p>
            <p>Email: {this.state.email}</p>
            <p>Password: {this.state.password}</p>
            <p>Username: {this.state.username}</p>
            <p>Car Name: {this.state.carName}</p>
            <p>Brand: {this.state.brand}</p>
            <p>Model: {this.state.model}</p>
            <p>Year: {this.state.year}</p>
            <p>Mileage: {this.state.mileage}</p>
            <p>Color: {this.state.color}</p>
            <p>Transmission Type: {this.state.transmissionType}</p>
            <p>Body Style: {this.state.bodyStyle}</p>
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default CreateAuction;
