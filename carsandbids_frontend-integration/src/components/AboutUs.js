import React from "react";
import { Component } from "react";


class AboutUs extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            SenderData:{
                header :"What's Cars & Bids?",
                description :
                <div>

                "The 505-horsepower Alfa Romeo Giulia Quadrifoglio
                 is an underrated alternative to the M3 and the C63, as it boasts a muscular and attractive 
                 exterior design, excellent performance, and impressive handling. This Giulia is 
                 a one-owner car with a clean, accident-free Carfax report, and it's pretty much 
                 unmodified – so it ticks a lot of the right boxes. It's also nicely optioned – the Active Assist 2 Package is a great bonus if you're planning on using this Giulia as a daily driver – and it's finished in an attractive color combination.",
              
                </div>,

                // header: {
                //     title: "What's Cars & Bids?",
                //     // other header content
                //   },
                
                about: "About US",
                  aboutcontent: 
                "Over the last few years, many car enthusiasts have started turning their attention to recent vehicles – cars from the 1980s, 1990s, and beyond. Automotive reviewer Doug DeMuro realized there isn’t yet a specific place that’s focused solely on buying and selling these modern enthusiast cars, but there should be – so he and a team created Cars & Bids, with its simple name modeled after Doug’s famous pursuit of “quirks and features.” Cars & Bids is the best online auction marketplace to buy and sell modern enthusiast cars – and that means pretty much anything that’s cool from the 1980s, 1990s, 2000s, 2010s, or 2020s. To us, “cool” ranges from the obvious (a Ferrari F355 or a Lamborghini Gallardo) to the esoteric (a pristine Dodge Dakota Convertible or a Mercury Capri XR2) to the traditional fun cars that enthusiasts love (a Mazda MX-5 Miata or a Porsche 911). Basically everything that’s exciting, fun, interesting, or quirky is welcome here – as long as it comes from the modern era.",
                  
                howItWorks : "How it works",
                  howItWorksContent: 
                   "Buying a Car Once you’ve found a car you’re interested in, here are the steps you should take to bid confidently and, with any luck, win the auction! 1. Register to Bid To contact the seller directly and place bids, you must first  with a valid credit card and phone number. Winning bidders pay Cars & Bids a 4.5% buyer’s fee on top of the winning bid amount (minimum of $225, maximum of $4,500). 2. Perform Due Diligence While we’ve tried to make buying a car online as safe and easy as possible, it’s ultimately your responsibility to perform your own due diligence and make sure that the car you’re considering is right for you – prior to placing a bid. Review the listing thoroughly, including known flaws, the vehicle history report, the vehicle inspection report (if applicable), recent maintenance, photos, etc. Ask the seller – via comments, Seller Q&A, or the “Contact” feature – any questions that you may have about the vehicle. Arrange to inspect the vehicle in person, or work with the seller to schedule a detailed pre-purchase inspection (“PPI”) at a reputable shop in their area (at your cost). 3. Arrange Financing and Logistics To ensure a smooth transaction, you should have the following organized prior to placing a bid. To facilitate your purchase, we’ve teamed up with LightStream to make financing easy and fast for users with good to excellent credit. You can check out rates and payments - and apply for a loan - directly from each auction! LightStream financing is not tied to a specific vehicle, and you can get your loan funded - and money deposited into your account - as soon as the same day you apply.** As a reminder, if you plan to finance this purchase, work with your lender to get your financing approved ahead of time - and keep in mind that some lenders may require specific vehicle information and may have year and mileage restrictions. Discuss transportation and storage timelines (if applicable) with the seller, and if you’ll be shipping the vehicle, get a quick and easy shipping quote directly on the auction page before bidding. 4. Bid We’ve made bidding easy, and we’ve explained it in a short video tutorial: Buying a car When you bid, we place a hold on your credit card for the buyer's fee – if you win, your card will be charged and you will pay the seller directly for the vehicle, otherwise, the hold will be released at the auction’s end. Bids are binding, so only bid if you fully intend to purchase the car and you have performed the requisite due diligence, because you might end up as the high bidder and there are no refunds. To ensure the bidding process is fair for everyone, bids placed within the final minute of the auction will reset the auction’s time remaining back to 1 minute – giving others the opportunity to bid. 5. Win the Auction To buy a car on Cars & Bids, you must win the auction by ultimately being the highest bidder – and, if the auction has a “Reserve,” by placing a bid that meets or exceeds the seller’s hidden “Reserve” price. If the auction has “No Reserve,” then the highest bidder wins it regardless of the amount they bid. After the auction closes, we’ll provide you with a step-by-step checklist to complete your purchase. You’ll also receive the seller’s contact information (and vice-versa) in order to finalize the details and logistics of the transaction. Buyers are expected to pay for the vehicle in-full within a week of the auction closing. Learn more about Finalizing the Sale.",
                
                  buyCar: {
                    // "Buying a Car" content
                  },
                  sellCar: {
                    // "Selling a Car" content
                  }
            }
           
        };
    }


render()
    {
  return (
    <div >
       {
        <div>
        <div className="w3-border w3-gray w3-margin-top w3-padding w3-round-xlarge" style={{width:"50%",margin:"auto"}}>
        <div>
        <h3>{this.state.SenderData.header}</h3>
        <p>{this.state.SenderData.description}</p>
        </div>

       </div>
       
       <div className="w3-border w3-gray w3-margin-top w3-padding w3-round-xlarge" style={{width:"50%",margin:"auto"}}>
       <div >
 <h3>{this.state.SenderData.about}</h3>
 <p>{this.state.SenderData.aboutcontent}</p>
 </div>
 </div>


 <div className="w3-border w3-gray w3-margin-top w3-padding w3-round-xlarge" style={{width:"50%",margin:"auto"}}>  
 <div >
 <h3>{this.state.SenderData.howItWorks}</h3>
 <p>{this.state.SenderData.howItWorksContent}</p>
 </div>

 </div>
</div>
     

     



       }
    </div>
  );
    }
};

export default AboutUs;
