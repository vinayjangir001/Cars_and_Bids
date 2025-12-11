import { Component } from "react";
import Logo from "../images/logo.PNG";
import "../css/w3.css";

class CarBlock extends Component{

    constructor(props){
        super(props);
        this.state = {
            Car :"",
            CarInfo:"",
            badgeInfo:"",
            carData : this.props.carData
        }
    }

    componentDidUpdate(props){
        if(this.state.carData!=props.carData){
                this.setState({carData: this.props.carData});
        }
    }

    async componentDidMount() {
        try {
            const props = this.state;
            var imageString = "";
            if(this.state.carData.carImages != null){
                imageString = this.state.carData.carImages[0];
                const CarModule = await import("C:/CarImage/"+imageString);
                this.setState({ Car: CarModule.default });
            }

            var carInfo = this.state.carData.car.year + " "+ this.state.carData.car.carName + ", "+ this.state.carData.car.brand +", " + this.state.carData.car.model;
            this.setState({ CarInfo: carInfo });

            if(this.state.carData.endTime!=null){
            const currentDate = new Date();
            const futureDateTime = new Date(this.state.carData.endTime);
            const timeDiff = futureDateTime - currentDate;
            const hoursRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 ));

            if(hoursRemaining<0){
                var badgeString = "Bid"+"₹"+ "           "+this.state.carData.lastBidAmount+"  "+"   0 hour";
                this.setState({ badgeInfo : badgeString });
            } else{
                var badgeString = "₹"+ "        "+this.state.carData.lastBidAmount+ " "+hoursRemaining +"hours";
                this.setState({ badgeInfo : badgeString });
            }
            } else{
                var badgeString = "₹   "+ "        "+this.state.carData.lastBidAmount + " "+"   0 hour";
                this.setState({ badgeInfo : badgeString });
            }
        
        } catch (error) {
          console.error('Error loading Car module:', error);
        }
      }
    


    render(){
        return(<>
            <div>
                <img src={this.state.Car} style={{width:"75%", height:"15rem"}}></img>
                <h5>{this.state.CarInfo}</h5>
                <div class="w3-container w3-black w3-round" style={{margin:"0 5rem"}}>{this.state.badgeInfo}</div>
            </div>
        </>)
    }
}

export default CarBlock;