import React from "react";
import Header from "./Header";
import InfoSection from "./InfoSection";
import ModalWindow from "./InfoSectionComponents/TableComponents/ModalWindow/modalWindow"

class MainPage extends React.Component {

    render(){
        return(
            <div className="Window">
                <Header/>
                <div className="mainSection">
                    <InfoSection />
                </div>
                <div className="modalWindow">
                    <ModalWindow/>
                </div>
            </div>
        );
    }
}




export default MainPage;
