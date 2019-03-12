import React, {Component} from 'react';
import "../../StudentsRegistration.css";
import {connect} from "react-redux";
import {toggleModal, changeCurrentId, fetchData, renderTable} from "../../../../../../redux/TableState/tableActions";
import axios from "axios";
import './ModalWindow.css';

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "region": "",
            "address": "",
            "tel": "",
            "email": "",
            "vnz": "",
            "prof": "",
            "name": "",
            "isJoined": false
        };
    }
    componentWillMount() {
        this.getOne(this.props.studentId)
    }

    getOne=(id)=> {
        return axios.get('students/' + id)
            .then(r => r.data)
            .then(r => {
                console.log('get one');
                console.log(r);
                this.setState(r);
                return r;
            }).catch()
    };

    upd=(user)=> {
        return axios.put('students/' + user.id, user)
            .then(r => r.data)
            .then(r => {
                console.log('PUT');
                console.log(r);
                return r;

            }).then(n=>this.updateTable())
                .catch((er) => {
                console.log(er)
            });

    };

    del=(user)=> {
        return axios.delete('students/' + user.id)
            .then(r => r.data)
            .then(r => {
                return r;
            }).catch();
    };

    updateTable=()=> {
        axios.get('/students')
            .then(res => {
                const persons = res.data;
                this.props.fetchAxios(persons);
console.log('FETCHAXIOS')
            }).then( m=>{this.props.rerenderTable(true);
        console.log('RerenderTable!;')});

    };

    onChangeEvent = (e) => {
        const id = e.target.id;
        const current = e.currentTarget.value;
        const obj = {};
        obj[id + ""] = current;
        this.setState(obj);
        console.log(this.state)
    };

    render() {
        return(
            <div className={"modalBlock"}>
                <form className={"redactForm modalWindow"}
                      onSubmit={(e) => {
                          //e.preventDefault();
                          this.upd(this.state);

                          this.props.closeWindow(null);
                      }}>

                    <div className={"aloneSection"}>
                        <div className={"hAlign"}>ПІБ</div>
                        <input id={"name"}  className={"inputItem"} placeholder={"ПІБ"}
                               onChange={this.onChangeEvent}
                               defaultValue={this.state.name}
                        />
                    </div>

                    <div className={"doubleSection"}>
                        <div>
                            <div className={"hAlign"}>Область</div>
                            <input  id={"region"} className={"inputItem"} placeholder={"Область"}
                                    onChange={this.onChangeEvent}
                                    defaultValue={this.state.region}
                            />
                        </div>
                        <div>
                            <div className={"hAlign"}>Адреса</div>
                            <input id={"address"}  className={"inputItem"} placeholder={"Адреса"}
                                   onChange={this.onChangeEvent}
                                   defaultValue={this.state.address}
                            />
                        </div>
                    </div>


                    <div className={"doubleSection"}>
                        <div>
                            <div className={"hAlign"}>Номер телефону</div>
                            <input  id={"tel"} className={"inputItem"} placeholder={"Номер телефону"}
                                    onChange={this.onChangeEvent}
                                    defaultValue={this.state.tel}
                            />
                        </div>

                        <div>
                            <div className={"hAlign"}>Електронна пошта</div>
                            <input  id={"email"} className={"inputItem"} placeholder={"Електронна пошта"}
                                    onChange={this.onChangeEvent}
                                    defaultValue={this.state.email}
                            />
                        </div>
                    </div>


                    <div className={"doubleSection"}>
                        <div>
                            <div className={"hAlign"}>Бажаний вуз</div>
                            <input id={"vnz"} className={"inputItem"} placeholder={"Бажаний вуз"}
                                   onChange={this.onChangeEvent}
                                   defaultValue={this.state.vnz}
                            />
                        </div>
                        <div>
                            <div className={"hAlign"}>Бажана професія</div>
                            <input  id={"prof"} className={"inputItem"} placeholder={"Бажана професія"}
                                    onChange={this.onChangeEvent}
                                    defaultValue={this.state.prof}
                            />
                        </div>

                    </div>

                    <div className={"checkBoxSection"}>
                        <span>У майбутньому: вступив чи ні в НУВГП?</span>
                        <input id={"isJoined"} className={"checkbox"} type={"checkbox"}
                               onChange={this.onChangeEvent}
                               defaultValue={this.state.isJoined}
                        />
                    </div>

                    <div className={"buttonsSection"}>
                        <button className="submit" type={"submit"}>Зберегти</button>
                        <button className="reset" type={"button"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.del(this.state);
                                    this.updateTable();
                                    this.props.closeWindow(null);
                                }}
                        >Видалити</button>
                    </div>


                    <div className = "closeButton" onClick={() => {this.props.closeWindow(null)}}>
                        Close
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateTopProps = (state) => ({
    studentId: state.tableReducer.currentStudentId
})

const mapDispatchToProps = (dispatch) => ({
    closeWindow: (id) => {
        dispatch(toggleModal());
        dispatch(changeCurrentId(id));
    },
    fetchAxios: (persons) => dispatch(fetchData(persons)),
    rerenderTable:(flag) => dispatch(renderTable(flag))
})

export default connect(mapStateTopProps, mapDispatchToProps)(Window)

