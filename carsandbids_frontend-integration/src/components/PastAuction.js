import { Component } from "react";
import Logo from "../images/logo.PNG";
import "../css/w3.css";
import SignupLoginModel from "./SignupLoginModel";
import CarBlock from "./CarBlock";
import DetailedAuction from "./DetailedAuction";
import { Link } from "react-router-dom";


class PastAuction extends Component{

    constructor(props){
        super(props);

        this.state = {
            carDetails : [],
            goToDetailedPage : false,
            detailedAuctionDetails: null,
            selectedYear: "",             // Selected year filter value
            selectedTransmissionType: "All", // Selected transmission type filter value
            selectedBodyStyle: "All"         // Selected body style filter value
        }

    }

    componentDidMount(){
        this.handleLogin();
    }

    // componentDidUpdate(prevProps){
    //   if(this.props.searchText!=null && this.props.searchText!="" && prevProps.searchText!=this.props.searchText){
    //     const data = this.state.carDetails.filter(a => a.car.carName.startsWith(this.props.searchText))
    //     this.setState({carDetails:null})
    //     this.setState({ carDetails: data});
    // }
    // }

    handleLogin = async () => {
        try {
          const { email, password } = this.state;
          const response = await fetch('http://localhost:8081/auction/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
               'Accept-Encoding': 'gzip, deflate, br', // Comma-separated list of supported encodings
               'Connection': 'keep-alive'
            }
          });
    
          const data = await response.json();

       
                    console.log(data);
                    const closedAuctions = data.filter(item => item.auctionStatus === 'ENDED');


                    this.setState({ carDetails: closedAuctions});

        //   this.setState({ carDetails: data});

          console.log(this.state.carDetails.car);


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      moveToDetailPage = (item) => {
          this.setState({detailedAuctionDetails: item,goToDetailedPage:true })
      }

      render() {

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

        
        const transmissionTypes = ["All", "Automatic", "Manual"];
        const bodyStyles = ["All", "Coupe", "Convertible", "Hatchback", "Sedan", "SUV", "Truck", "Van", "Wagon"];

        return (


            
            <>

<>
        <div class="w3-bar">
                <div class="w3-bar-item w3-button w3-mobile" ><img src={Logo}/></div>
                <a href="#" class="w3-bar-item w3-button w3-mobile w3-padding-32">{this.state.AUCTION}</a>
                <a href="#" class="w3-bar-item w3-button w3-mobile w3-padding-32">{this.state.SELL}</a>
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
                {/* <input class="w3-bar-item w3-input w3-border w3-round" style={{marginTop: "1.7rem"}} type="text"></input> */}
                {loginController}
                {signupController}
                {logoutController}
                </div>
                </div>
            </div>
            {sendToLoginPage}
            {sendToSignUpPage}
        </>
                {/* Add the dropdown menus for filter search here */}
                <div class="w3-bar "> 
                <div class="w3-bar-item" >
                    <label>Year:</label>
                    <select value={this.state.selectedYear} onChange={(e) => this.setState({ selectedYear: e.target.value })}>
                        <option value="">All Years</option>
                        {Array.from({ length: 2023 - 1980 }, (_, i) => 2023 - i).map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div class="w3-bar-item" >
                    <label>Transmission Type:</label>
                    <select value={this.state.selectedTransmissionType} onChange={(e) => this.setState({ selectedTransmissionType: e.target.value })}>
                        {transmissionTypes.map((transmissionType, index) => (
                            <option key={index} value={transmissionType}>{transmissionType}</option>
                        ))}
                    </select>
                </div>
                <div class="w3-bar-item" >
                    <label>Body Style:</label>
                    <select value={this.state.selectedBodyStyle} onChange={(e) => this.setState({ selectedBodyStyle: e.target.value })}>
                        {bodyStyles.map((bodyStyle, index) => (
                            <option key={index} value={bodyStyle}>{bodyStyle}</option>
                        ))}
                    </select>
                </div>
                </div>

                {/* Your car listing section */}
                {/* <div className="w3-row" style={{ width: "100vw" }}>
                    <div className="w3-col l9">
                        {this.state.carDetails
                            .filter(item => (!this.state.selectedMake || item.make === this.state.selectedMake) &&
                                (!this.state.selectedModel || item.model === this.state.selectedModel) &&
                                (!this.state.selectedYear || item.year === this.state.selectedYear))
                            .map((item) => (
                                <Link to={"/details/" + item.auctionId}>
                                    <div className="w3-card-4 w3-round-xlarge" style={{ width: "30%", height: "20rem", float: "left", margin: "1rem" }} onClick={() => this.moveToDetailPage(item)}>
                                        <CarBlock carData={item} />
                                    </div>
                                </Link>
                            ))}
                    </div> */}



        {<div className="w3-row" style={{width:"100vw"}}>
      <div className="w3-col l9">
      {/* {this.state.carDetails.map((item) => (
        <Link  to={"/details/"+item.auctionId}>
        <div className="w3-card-4 w3-round-xlarge" style={{width:"30%", height:"20rem", float:"left", margin:"1rem"}} onClick={() => this.moveToDetailPage(item)}>
            <CarBlock  carData={item} />
        </div>
        </Link>
      ))}
      </div> */}

{this.state.carDetails
                            .filter(item => (!this.state.selectedYear || item.car.year === parseInt(this.state.selectedYear)) &&
                                (this.state.selectedTransmissionType === "All" || item.car.transmissionType === this.state.selectedTransmissionType) &&
                                (this.state.selectedBodyStyle === "All" || item.car.bodyStyle === this.state.selectedBodyStyle))
                            .map((item) => (
                                <Link to={"/details/" + item.auctionId}>
                                    <div className="w3-card-4 w3-round-xlarge" style={{ width: "30%", height: "20rem", float: "left", margin: "1rem" }} onClick={() => this.moveToDetailPage(item)}>
                                        <CarBlock carData={new Object(item)} />
                                    </div>
                                </Link>
                            ))}
                    </div>
      <div className="w3-col l3" style={{height:"100%", overflow:"hidden",marginTop:"1rem"}}>
      <div style={{width:"90%",height:"100%"}}>
          <div style={{width:"100%",height:"20rem"}}>
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/rZZNEBMGvg4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <h5>Cars & Bids is the best marketplace for modern enthusiast cars.</h5>
      </div>
      </div>
        </div>}</>
        )
    }
}


export default PastAuction;