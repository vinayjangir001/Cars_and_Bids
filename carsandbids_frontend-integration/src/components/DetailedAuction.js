import { Component } from "react";
import "../css/w3.css";
import "../App.css";
import { Link } from "react-router-dom";
import Logo from "../images/logo.PNG";


class DetailedAuction extends Component{

    constructor(props){
        super(props);
        this.state = {
            carDetails : {},
            carImages: [],
            currentIndex: 0,
            comments:[],
            bids:[],
            car:{},
            SenderData:{
              header :"Doug's Take",
              description :"The 505-horsepower Alfa Romeo Giulia Quadrifoglio is an underrated alternative to the M3 and the C63, as it boasts a muscular and attractive exterior design, excellent performance, and impressive handling. This Giulia is a one-owner car with a clean, accident-free Carfax report, and it's pretty much unmodified – so it ticks a lot of the right boxes. It's also nicely optioned – the Active Assist 2 Package is a great bonus if you're planning on using this Giulia as a daily driver – and it's finished in an attractive color combination."
            },
            isPlaceBidModalOpen: false, // To track if bid modal is open
            bidAmount: 0, // To store bid amount
            newComment:'',
            curAuctionId:-1,
            shareModelFlag:false,
            sharerEmail:"",

        }
    }

    componentDidMount(){
        const id = window.location.pathname.split("/")[2];
        this.setState({curAuctionId:id})
        this.loadAuctionById(id);
        this.loadComments(id);
    }

    loadComments = async (id) => {
      try {
        const response = await fetch('http://localhost:8081/api/comments/auctions/'+id, {
          method: 'GET',
          headers: {
            'Authorization':'Bearer '+localStorage.getItem('authToken'),
            'Content-Type': 'application/json',
           'Accept': 'application/json',
             'Accept-Encoding': 'gzip, deflate, br', // Comma-separated list of supported encodings
             'Connection': 'keep-alive',
            //  mode: 'no-cors',
          },
        });
  
        const data = await response.json();
        this.setState({comments: data});
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    componentWillUnmount() {
        this.stopSlideshow();
      }
    
      startSlideshow() {
        this.interval = setInterval(() => {
          this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex + 1) % this.state.carImages.length,
          }));
        }, 3000);
      }

      prevImageShow(){

        var newState = 0;
        if(this.state.currentIndex==0){
            newState = this.state.carImages.length-1;
        } else{
          newState = this.state.currentIndex-1;
        }
        
        this.setState({currentIndex:newState})
      }

      nextImageShow(){

        var newState = (this.state.currentIndex+1)%this.state.carImages.length;
        this.setState({currentIndex:newState})
      }
    
      stopSlideshow() {
        clearInterval(this.interval);
      }
    

    loadAuctionById = async (id) => {
        try {
          const response = await fetch('http://localhost:8081/auctionByID/'+id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
             'Accept': 'application/json',
               'Accept-Encoding': 'gzip, deflate, br', // Comma-separated list of supported encodings
               'Connection': 'keep-alive',
            },
          });
    
          const data = await response.json();
          this.setState({carDetails: data});
          this.setState({car:data.car})

          if(data.carImages != null){
            const carDetailsArray = [];
            data.carImages.forEach( async (element) => {
                const CarModule = await import("C:/CarImage/"+element);
                carDetailsArray.push(CarModule.default);
                this.setState({ carImages: carDetailsArray }); 
            });
        }

        //this.startSlideshow();
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      
      // Function to handle placing a bid
    handlePlaceBid = () => {
      this.setState({ isPlaceBidModalOpen: !this.state.isPlaceBidModalOpen });
  };

  // Function to handle bid amount change
  handleBidAmountChange = (event) => {
      this.setState({ bidAmount: event.target.value });
  };

  // Function to close the bid modal
  handleCloseBidModal = () => {
      this.setState({ isPlaceBidModalOpen: false, bidAmount: 0 });
  };

  // Function to confirm the bid
  handleConfirmBid = () => {
      const { carDetails, bidAmount } = this.state;

      // Extract auctionId from carDetails
      const auctionId = carDetails.auctionId;

      // user id
      const userId = carDetails.user.id; 


      // Create the bid request object
      const bidRequest = {
          amount: bidAmount,
      };

      // Make the API call to place the bid
      fetch(`http://localhost:8081/auction/${auctionId}/user/${userId}/bid`, {
          method: "POST",
          headers: {
            'Authorization':'Bearer '+ localStorage.getItem('authToken'),
              "Content-Type": "application/json",
              // 'mode' :'no-cors',
          },
          body: JSON.stringify(bidRequest),
          // mode: 'no-cors'
          // redirect: 'follow'
      })
          .then((response) => response.json())
          .then((data) => {
              console.log("Bid placed successfully:", data);
              this.handleCloseBidModal(); // Close the bid modal
          })
          .catch((error) => {
              console.error("Error placing bid:", error);
              this.handleCloseBidModal(); // Close the bid modal in case of error
          });
  };


  commentChange(event){
      this.setState({newComment:event.target.value})
  }

  calculateRemainingHours(endTime) {
    const endTimeDate = new Date(endTime); // Convert the string to a Date object
    const currentTime = new Date(); // Get the current time
  
    const timeDifference = endTimeDate - currentTime; // Calculate the time difference in milliseconds
  
    const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
  
    return remainingHours;
  }

  openShareAuction(){
    this.setState({shareModelFlag: !this.state.shareModelFlag});
  }

  shareAuction(event){
    if(this.state.sharerEmail!="" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.sharerEmail)){
    const link = window.location.href;
    const content = "Please%20Check%20This%20Auction%20:%20"+link;
    window.location.href = "mailto:"+this.state.sharerEmail+"?subject=Auction%20Sharing&body="+content;
    } else{
      window.alert("Please enter a valid email.")
    }
  }

  postComment(){

    const { carDetails} = this.state;
      const auctionId = carDetails.auctionId;
      const userId = carDetails.user.id; 

      if(this.state.newComment!=''){
      const commentBody = {
        commentText : this.state.newComment
      }

    fetch(`http://localhost:8081/api/comments/auctions/${auctionId}/user/${userId}`, {
      method: "POST",
      headers: {
          'Authorization':'Bearer '+ localStorage.getItem('authToken'),
          'Content-Type': 'application/json',
          // 'mode' :'no-cors',
      },
      body: JSON.stringify(commentBody),
  })
      .then((response) => response.json())
      .then((data) => {
          console.log("Comment posted successfully:", data);
          const id = window.location.pathname.split("/")[2];
          this.loadComments(id);
          this.setState({newComment:''})
      })
      .catch((error) => {
          console.error("Error posting comment:", error);
      });
    }
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



      const { currentIndex, carImages, carDetails, car, SenderData, isPlaceBidModalOpen, bidAmount } = this.state;
      var modalWindow = <div></div>

        if(isPlaceBidModalOpen && localStorage.getItem('authToken')){
            modalWindow =  <div className="modal-overlay">
            <div className="modal w3-modal-content w3-card-4 w3-round-xlarge w3-padding" style={{position:"relative",zIndex:"4",top:"-40vw", textAlign:"center"}}>
                <h2>Place Bid</h2>
                <p>Enter bid amount:</p>
                <input className="w3-input" type="number" value={bidAmount} onChange={this.handleBidAmountChange} />
                <button className="w3-button w3-hover-green w3-round" onClick={this.handleConfirmBid}>Confirm Bid</button>
                <button className="w3-button w3-hover-red w3-round" onClick={this.handleCloseBidModal}>Cancel</button>
            </div>
        </div>
        } else if(isPlaceBidModalOpen && !localStorage.getItem('authToken')){
              modalWindow = <div className="modal-overlay">
               
              <div className="modal w3-modal-content w3-card-4 w3-round-xlarge w3-padding" style={{position:"relative",zIndex:"4",top:"-40vw", textAlign:"center"}}>
              <h3>Please Login or Sign Up</h3>
              <Link to={"/login/" + this.state.curAuctionId}>
              <button className="w3-button w3-hover-green w3-round w3-border w3-margin">Login</button>
                          </Link>

                          <Link to={"/sign-up/" + this.state.curAuctionId}>
                          <button className="w3-button w3-hover-green w3-round w3-border w3-margin" >SignUp</button>
                          </Link>
              </div>
          </div>
        }

        return(<>


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




            <div>
            <div class="w3-content w3-display-container w3-center w3-border w3-round-xxlarge">
            <img src={this.state.carImages[this.state.currentIndex]} style={{width:"50%"}} />
            </div>
            <div className="w3-center">
            <div className="w3-button" onClick={this.prevImageShow.bind(this)}>&lt;</div>
            <div className="w3-button" onClick={this.nextImageShow.bind(this)}>&gt;</div>
            </div>
            <div className="w3-center w3-centered" style={{width:"100%"}}>
            <div className="w3-bar w3-black w3-round w3-margin" style={{width:"50%"}}>
            {/* <div class="w3-bar-item w3-padding">Time Left {this.state.carDetails.endTime}</div> */}
            <div class="w3-bar-item w3-padding">Time Left {this.calculateRemainingHours(this.state.carDetails.endTime)} hours</div>

            <div class="w3-bar-item w3-padding">High Bid ₹{this.state.carDetails.lastBidAmount}</div>
            <div class="w3-bar-item w3-padding">Bids {this.state.carDetails.totalBids}</div>
            <div class="w3-bar-item w3-padding">Comments {this.state.comments.length}</div>
          
            <div className="w3-bar-item w3-padding w3-green w3-button" style={{ float: "right" }} onClick={this.handlePlaceBid}>
                        Place Bid
                    </div>

                    <div className="w3-bar-item w3-padding w3-gray w3-button" style={{ float: "right" }} onClick={this.openShareAuction.bind(this)}>
                        Share Auction
                    </div>
                    
            </div>
            </div>
            <div style={{width:"50%",margin:"auto"}}>
              <div>
            <table className="w3-table w3-striped w3-bordered">
              <tr>
                <td style={{fontWeight: "bold" , width:"25%"} }>Car Name</td>
                <td style={{ width:"25%"} }>{this.state.car.carName} </td>
                <td style={{fontWeight: "bold" , width:"25%"}}>Brand</td>
                <td style={{ width:"25%"} }>{this.state.car.brand}</td>
              </tr>
            </table>
            </div>

            <div>
            <table className="w3-table w3-striped w3-bordered">
              <tr>
                <td style={{fontWeight: "bold" , width:"25%"}}>Model</td>
                <td style={{ width:"25%"} }>{this.state.car.model}</td>
                <td style={{fontWeight: "bold" , width:"25%"}}>Year</td>
                <td style={{ width:"25%"} }>{this.state.car.year}</td>
              </tr>
            </table>
            </div>

            <div>
            <table className="w3-table w3-striped w3-bordered">
              <tr>
                <td style={{fontWeight: "bold" , width:"25%"}}>Color</td>
                <td style={{ width:"25%"} }>{this.state.car.color}</td>
                <td style={{fontWeight: "bold" , width:"25%"}}>Mileage</td>
                <td style={{ width:"25%"} }>{this.state.car.mileage}</td>
              </tr>
            </table>
            </div>

            <div>
            <table className="w3-table w3-striped w3-bordered">
              <tr>
                <td style={{fontWeight: "bold" , width:"25%"} }>Type</td>
                <td style={{ width:"25%"} }>{this.state.car.transmissionType}</td>
                <td style={{fontWeight: "bold" , width:"25%"}}>Style</td>
                <td style={{ width:"25%"} }>{this.state.car.bodyStyle}</td>
              </tr>
            </table>
            </div>

            </div>
            <div className="w3-border w3-gray w3-margin-top w3-padding w3-round-xlarge" style={{width:"50%",margin:"auto"}}>
              <h3>{this.state.SenderData.header}</h3>
              <p>{this.state.SenderData.description}</p>
            </div>

    
              {modalWindow}

                <div 
                className="w3-border w3-margin-top w3-padding w3-round-xlarge" style={{width:"50%",margin:"auto"}}>
                  <h5 className="w3-center w3-bold" > Comments </h5>
                { localStorage.getItem("authToken") &&<input type="text" className="w3-input" name="comment" value={this.state.newComment}  onChange={this.commentChange.bind(this)}></input>}  
                
 
 
                <div style={{ textAlign: "center" }}>
                { localStorage.getItem("authToken") && <div className="w3-button w3-margin-top w3-padding w3-green" onClick={this.postComment.bind(this)}>Submit</div>}
                </div>

                {
                  this.state.comments.map((item) => {
                     return(<div className="w3-grey w3-padding w3-margin w3-round">{item}</div>);
                  })
                }
        
                  
                </div>  

            </div>

                { this.state.shareModelFlag &&

<div className="modal-overlay">
               
<div className="modal w3-modal-content w3-card-4 w3-round-xlarge w3-padding" style={{position:"relative",zIndex:"4",top:"-40vw", textAlign:"center"}}>
<h3>Sharing</h3>
<input className="w3-input" type="email" placeholder="E-mail" value={this.state.sharerEmail} onChange={(e) => this.setState({sharerEmail:e.target.value})}></input>
<div className="w3-button w3-margin w3-green" onClick={this.shareAuction.bind(this)}>Submit</div>
<div className="w3-button w3-margin w3-red" onClick={this.openShareAuction.bind(this)}>Cancel</div>
</div>
</div>
                }

        </>)
    }
}

export default DetailedAuction;