import React from 'react'
import {connect} from 'react-redux'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {FaAddressBook, FaTable, FaChartBar, FaLocationArrow} from 'react-icons/fa';
import './header.css';
import './userInfo.css';
import {changeSection} from '../../../redux/actions';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    onClickChange = (id) => {
        this.props.changeInfoSection(id);
    };

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-expand-md  navbar-expand-sm headerMenu fixed-top">

                <div className={"list"}>

                    <ul className="first">

                        <li className="nav-item nav-one ">

                            <Dropdown id="dropDown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>

                                <DropdownToggle id={this.state.dropdownOpen ? "roll" : "hamburger"}>
                                    <FaLocationArrow size={40}/>
                                </DropdownToggle>

                                <DropdownMenu id="menu">
                                    <DropdownItem id="dropdownItem"
                                                  onClick={() => {
                                                      this.onClickChange("Реєстрація")
                                                  }}>
                                        <FaAddressBook className="icon" size={46}/></DropdownItem>

                                    <DropdownItem divider/>

                                    <DropdownItem id="dropdownItem"
                                                  onClick={() => {
                                                      this.onClickChange("Списки студентів")
                                                  }}>
                                        <FaTable className="icon" size={46}/></DropdownItem>

                                    <DropdownItem divider/>

                                    <DropdownItem id="dropdownItem"
                                                  onClick={() => {
                                                      this.onClickChange("Статистика")
                                                  }}>
                                        <FaChartBar className="icon" size={46}/></DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                        </li>

                        <li className="nav-item nav-two">
                            <div className="currentPage">{this.props.currentInfoSection}</div>
                        </li>
                    </ul>


                    <ul className="second">

                        <li className="nav-item nav-three">
                            <div className={"userMenu"} onClick={this.props.onClickUserIcon}>

                                <Dropdown isOpen={this.props.isUserMenuOpened} >
                                    <DropdownToggle id="UserImg">
                                        <img alt={"User Icon"}
                                             className={"userIcon"}
                                             src={this.props.userInfo.imageUrl}/>

                                        <div>{this.props.userInfo.name}</div>
                                    </DropdownToggle>

                                    <DropdownMenu id="userInfo">
                                        <DropdownItem id="userBlock">
                                            <div className={"absBlock"}>
                                                    <div className={"userInfoSection"}>
                                                        <span>E-mail: {this.props.profileObj.email}</span>
                                                        <span>Name: {this.props.profileObj.name}</span>
                                                    </div>
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>



                            </div>
                        </li>

                        <li className="nav-item nav-four">

                            <div className={"logOut"} onClick={this.props.logOut}>
                                <div><i className={"fas fa-sign-out-alt fa-2x"}/></div>

                                <div>Log Out</div>

                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}


const mapStateToProps = (state) => ({
    isUserMenuOpened: state.mainReducer.isUserMenuOpened,
    userInfo: state.mainReducer.userInfo,
    currentInfoSection: state.mainReducer.currentInfoSection,
    profileObj: state.mainReducer.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    openPopupMenu: () => {
        dispatch({type: "OPEN_POPUP_MENU"})
    },
    onClickUserIcon: () => {
        dispatch({type: "OPEN_USER_MENU"})
    },
    logOut: () => {
        dispatch({type: "LOG_OUT"})
    },
    changeInfoSection: (id) => dispatch(changeSection(id))

});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
