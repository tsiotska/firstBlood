import React, {Component} from 'react';
import {connect} from "react-redux";
import {toggleModal, changeCurrentId, fetchData, renderTable} from "../../../../../../redux/TableState/tableActions";
import axios from "axios";


import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const {level1: locateList} = require('../../koatuu');
const {professions: profList} = require('../../professions.json');
const {vnzList} = require('../../vnz.json');

const registrationStyles = theme => ({
    [theme.breakpoints.between("sm", "xl")]: {
        modalWindow: {
            display: 'flex',
            alignItems: 'center',
            height: '55vh',
            width: '70vw',
            zIndex: '5',
            position: 'relative',
            backgroundColor: '#f5f5f5',
            border: '3px solid #d6d6d6',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        },
        redactBlock: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '80%',
            width: '100%',
        },

        myRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '20px',
            color: '#256589',
            cursor: 'pointer'
        }
    },

    [theme.breakpoints.between("xs", "sm")]: {
        modalWindow: {
            zIndex: '5',
            display: 'flex',
            alignItems: 'center',
            top: 0,
            borderRadius: 0,
            backgroundColor: '#e8ecef',
            height: '100vh',
            width: '100vw',

            position: 'static',
        },
        redactBlock: {
            position: 'static',
            overflowY: "scroll",

            justifyContent: 'center',
            paddingBottom: '70px',
            height: '100vh',
            width: '100%',

            borderBottom: '1vh solid #d6d6d6',
            borderTop: '1vh solid #d6d6d6'
        },

        myRow: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    menu: {
        width: 200,
    },

    TextField: {
        width: 320,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        '&:hover': {
            backgroundColor: '#d9d9d9',
            borderColor: "black !important"
        },
    },
    myButton: {
        margin: theme.spacing.unit,
        '&:focus': {
            outline: 'none',
            backgroundColor: '#d9d9d9'
        }
    },

});

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                "region": "",
                "address": "",
                "tel": "",
                "email": "",
                "vnz": "",
                "prof": "",
                "name": "",
                "isJoined": false
            },

            regions: this.getList(locateList),
            professions: this.getList(profList),
            vnzes: this.getList(vnzList),
            currentRegion: "",
            currentVnz: "",
            currentProf: "",
        };

    }

    getList(list) {
        let array = [];
        list.map((el) =>
            array.push(el)
        )
        console.log("AAAA!!!" + array)
        return array
    }

    componentDidMount = () => {
        console.log('ID', this.props.studentId);
        this.getOne(this.props.studentId)
    };


    getOne = (id) => {
        axios.get('/students/' + id)
            .then(r => r.data)
            .then(r => {
                console.log(r);
                this.setState({student: r});
                console.log(this.state.student);
                return r;
            }).catch()
    };

    upd = (user, e) => {
        e.preventDefault()
        return axios.put('/students/' + user.id, user)
            .then(r => r.data)
            .then(r => {
                console.log(r);
                return r;
            }).catch((er) => {
                console.log(er)
            }).then(n => {
                this.updateTable()

            })
    };
    del = (user, e) => {
        axios.delete('/students/' + user.id)
            .then(r => r.data)
            .then(r => {
                console.log('DELETED', r);
                return r;
            }).catch().then(n => {
            this.updateTable()
        });
    };

    updateTable() {
        axios.get('/students/')
            .then(res => {
                const persons = res.data;
                this.props.fetchAxios(persons);
                console.log('FETCHAXIOS')
            })
            .then(m => {
                this.props.rerenderTable(true);
            });
    };

    onChangeEvent = (e) => {
        const id = e.target.id;
        const current = e.currentTarget.value;
        const obj = {...this.state.student};
        obj[id + ""] = current;
        this.setState({student: obj});
        console.log(this.state.student)
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.modalWindow}
                  onSubmit={(e) => {
                      this.upd(this.state.student, e);
                      this.props.closeWindow(null);
                  }}
                  onReset={(e) => {
                      this.del(this.state.student, e);
                      this.props.closeWindow(null);
                  }}>

                <Grid className={classes.redactBlock}>

                    <Grid className={classes.myRow}>
                        <TextField
                            value={this.state.student.name}
                            onChange={this.onChangeEvent}
                            id="name"
                            label="ПІБ"
                            className={classes.TextField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid className={classes.myRow}>
                        <FormControl margin="normal" variant="outlined" className={classes.TextField}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}>
                                Область
                            </InputLabel>

                            <Select
                                id={"region"}
                                name={"currentRegion"}
                                value={this.state.student.region}
                                onChange={(event) => {
                                    console.log(event)
                                    const s = {...this.state.student, region: event.target.value}
                                    console.log(s)
                                    this.setState(
                                        {
                                            student: s
                                        }
                                    )
                                }}
                                input={
                                    <OutlinedInput labelWidth={320}/>}>

                                {this.state.regions.map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )}

                            </Select>
                        </FormControl>

                        <TextField
                            value={this.state.student.address}
                            onChange={this.onChangeEvent}
                            id="address"
                            label="Введіть адресу..."
                            className={classes.TextField}
                            margin="normal"
                            variant="outlined"
                        />

                    </Grid>
                    <Grid className={classes.myRow}>
                        <FormControl margin="normal" variant="outlined" className={classes.TextField}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}>
                                Професія
                            </InputLabel>

                            <Select
                                id={"prof"}
                                name={"currentProf"}
                                value={this.state.student.prof}
                                onChange={(event) => {
                                    console.log(event)
                                    const s = {...this.state.student, prof: event.target.value}
                                    console.log(s)
                                    this.setState(
                                        {
                                            student: s
                                        }
                                    )
                                }}
                                input={
                                    <OutlinedInput
                                        labelWidth={320}/>}>

                                {this.state.professions.map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )}

                            </Select>
                        </FormControl>


                        <FormControl margin="normal" variant="outlined" className={classes.TextField}>

                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}>
                                ВНЗ
                            </InputLabel>

                            <Select
                                id={"vnz"}
                                name={"currentVnz"}
                                value={this.state.student.vnz}
                                onChange={(event) => {
                                    console.log(event)
                                    const s = {...this.state.student, region: event.target.value}
                                    console.log(s)
                                    this.setState(
                                        {
                                            student: s
                                        }
                                    )
                                }}

                                input={
                                    <OutlinedInput
                                        labelWidth={320}/>}>

                                {this.state.vnzes.map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid className={classes.myRow}>
                        <TextField
                            value={this.state.student.tel}
                            onChange={this.onChangeEvent}
                            id="tel"
                            label="Номер телефону..."
                            className={classes.TextField}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            value={this.state.student.email}
                            onChange={this.onChangeEvent}
                            id="email"
                            label="Електронна пошта..."
                            className={classes.TextField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>


                    <Grid className={classes.buttons}>
                        <Button variant="contained" type={"submit"} className={classNames(classes.myButton)}>
                            Зберегти
                        </Button>
                        <Button variant="contained" type={"reset"} className={classNames(classes.myButton)}>
                            Видалити
                        </Button>
                    </Grid>

                </Grid>
            </form>

        )
    }

}

Window.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    studentId: state.tableReducer.currentStudentId
});

const mapDispatchToProps = (dispatch) => ({
    closeWindow: (id) => {
        dispatch(toggleModal());
        dispatch(changeCurrentId(id));
    },
    fetchAxios: (persons) => dispatch(fetchData(persons)),
    rerenderTable: (flag) => dispatch(renderTable(flag))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(registrationStyles)(Window))

