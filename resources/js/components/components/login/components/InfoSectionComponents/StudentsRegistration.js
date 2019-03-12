import React from 'react';
import axios from "axios";
import Select from 'react-select';
import "./StudentsRegistration.css";
import './Animation.css';

const {level1: locateList} = require('./koatuu.json');
const {professions: profList} = require('./professions.json');
const {vnzList} = require('./vnz.json');

class StudentsRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                "address": "",
                "region": "",
                "tel": "",
                "email": "",
                "vnz": "",
                "prof": "",
                "name": "",
                "isJoined": false
            },
            addresses: this.getRegionList(),
            professions: this.getProfList(),
            vnzes: this.getVnzList()
        };
    }

    /*  onChangeSelect = (event) => {
          console.log(event)
          const s = {...this.state.student,
              address: event.value[0],
              region: event.value[1]}
              // console.log(s)
          this.setState(
              {
                  student: s
              }
          )
      };*/

    onChangeEvent = (e) => {
        const id = e.target.id;
        const current = e.currentTarget.value;
        //  console.log(id, current)
        let obj = {...this.state.student};
        obj[id] = current;
        this.setState({student: obj});
        setTimeout(() => console.log(this.state), 500);

        // console.log(this.state.student)
    };

    add(e) {
        e.preventDefault();
        console.log('STATE OF STUD', this.state.student);
        return axios.post('/students', this.state.student)
            .then(r => r.data)
            .then(r => {
                console.log('start adding', r);
                return r;
            }).catch(error => {
                console.log(error.response)
            }).then(s => alert("ТУТ БУДЕ АНІМАЦІЯ ЗЕЛЕНОЇ ГАЛОЧКИ"))


    };

    getRegionList() {
        return locateList.map((el) => ({
            value: el,
            label: el
        }))
    }

    getProfList() {
        return profList.map((el) => ({
            value: el,
            label: el
        }))
    }

    getVnzList() {
        return vnzList.map((el) => ({
            value: el,
            label: el
        }))
    }

    toggleCheckBox = (e) => {
        const id = e.target.id;
        const current = !this.state.student.isJoined;
        //  console.log(id, current)
        let obj = {...this.state.student};
        obj[id] = current;
        this.setState({student: obj});
        setTimeout(() => console.log(this.state), 500);
    };
    clearArray = () => {
        this.setState({student: []})
    };

    render() {
        return (
            <div className={"registrWrapper"}>

                <form id={"registrationForm"} onSubmit={this.add.bind(this)}>


                    <div className={"inputsSection"}>
                        <input id={"name"} className={"input"} placeholder={"ПІБ"}
                               onChange={this.onChangeEvent}/>
                    </div>


                    <div className={"doubleInputs"}>
                        <div className={"inputsSection"}>
                            <Select className={"input mr"} id={"region"}
                                    placeholder={"Виберіть область..."}
                                    options={this.state.addresses}
                                    onChange={(event) => {
                                        console.log(event)
                                        const s = {...this.state.student, region: event.value}
                                        console.log(s)
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}/>
                        </div>
                        <div className={"inputsSection"}>
                            <input id={"address"} className={"input ml"} placeholder={"Введіть адресу..."}
                                   onChange={this.onChangeEvent}/>
                        </div>
                    </div>


                    <div className={"doubleInputs"}>
                        <div className={"inputsSection"}>
                            <Select className={"input mr"} id={"prof"}
                                    placeholder={"Виберіть професію..."}
                                    options={this.state.professions}
                                    onChange={(event) => {
                                        console.log(event)
                                        const s = {...this.state.student, prof: event.value}
                                        console.log(s)
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}
                            />
                        </div>
                        <div className={"inputsSection"}>
                            <Select className={"input ml"} id={"vnz"}
                                    placeholder={"Виберіть ВНЗ..."}
                                    options={this.state.vnzes}
                                    onChange={(event) => {
                                        console.log(event)
                                        const s = {...this.state.student, vnz: event.value}
                                        console.log(s)
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}
                            />
                        </div>
                    </div>


                    <div className={"doubleInputs"}>
                        <input id={"tel"} className={"input mr"} placeholder={"Номер телефону"}
                               onChange={this.onChangeEvent}/>
                        <input id={"email"} className={"input ml"} placeholder={"Електронна пошта"}
                               onChange={this.onChangeEvent}/>
                    </div>


                    <div className={"inputsSection inputButtons"}>
                        <span>У майбутньому: вступив чи ні в НУВГП?</span>
                        <input id={"isJoined"} className={"inputData mt-1 ml-4"} type={"checkbox"}
                               onChange={this.toggleCheckBox}/>
                    </div>


                    <div className={"inputsSection inputButtons"}>
                        <button className="mr-lg-5 mr-md-3 mr-2" type={"submit"}>Відправити</button>
                        <button className="ml-lg-5 ml-md-3 ml-2" type={"reset"} onClick={this.clearArray}>Очистити
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}

export default StudentsRegistration;
