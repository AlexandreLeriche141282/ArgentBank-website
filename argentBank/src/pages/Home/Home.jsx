import React from "react"
import './home.css'
import Banner from "../../components/banner/Banner";
import Card from "../../components/card/Card";

import img_chat from "../../assets/img/icon-chat.webp"
import img_money from "../../assets/img/icon-money.webp"
import img_security from "../../assets/img/icon-security.webp"


export default function Home  ()  {
    return (
        <div>
            <main>
                <Banner />
                <section className="features">
            <Card
               img={img_chat}
               alt="icône de bulles de conversation"
               title="You are our #1 priority"
               content="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
            />

            <Card img={img_money} alt="icône de billet" title="More savings means higher rates" content="The more you save with us, the higher your interest rate will be!" />

            <Card img={img_security} alt="icône d'un bouclier" title="Security you can trust" content="We use top of the line encryption to make sure your data and money is always safe." />
         </section>

            </main>
        </div>  
        
   );
}

