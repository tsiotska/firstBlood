import React from 'react';
import axios from "axios";

import './Animation.css';

import Switch from '@material-ui/core/Switch';
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

const {level1: locateList} = require('./koatuu.json');
const {professions: profList} = require('./professions.json');
const {vnzList} = require('./vnz.json');

const styles = theme => ({
    [theme.breakpoints.between("sm", "xl")]: {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexGrow: 1,
            width: '100%',
            height: '80%',
            backgroundColor: '#e8ecef',
        },

        inputButtons: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        },

        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
    },

    [theme.breakpoints.between("xs", "sm")]: {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: 'auto',
            width: '100%',

        },

        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflowY: 'hidden',
            width: '100%',
            height: 'auto',
            backgroundColor: '#e8ecef',


        },


        inputButtons: {
            display: 'flex',
            justifyContent: 'space-around',
            paddingLeft: '7vw',
            paddingRight: '7vw',
        },

        row: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'normal'
        },
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
    },

    menu: {
        width: 200,
    },

    textField: {
        width: 320,
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        '&:hover': {
            backgroundColor: '#d9d9d9',
            borderColor: "black !important"
        },
    },
    button: {
        margin: theme.spacing.unit,
        '&:focus': {
            outline: 'none',
            backgroundColor: '#d9d9d9'
        }
    },
    menuList: {
        maxHeight: 250,
        border: 'none',
        outline: 'none',
        backgroundColor: 'white'
    }
});

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

            regions: this.getList(locateList),
            professions: this.getList(profList),
            vnzes: this.getList(vnzList),
            currentRegion: "",
            currentVnz: "",
            currentProf: "",

            name: '',
            animation: false
        };
    }


    onChangeEvent = (e) => {
        const id = e.target.id;
        const current = e.currentTarget.value;
        let obj = {...this.state.student};
        obj[id] = current;
        this.setState({student: obj});
    };

    add(e) {
        e.preventDefault()
       var flag = true;
        for (var key in  this.state.student) {
            if(this.state.student[key] === ""){
                console.log("k " + this.state.student[key])
                alert('Одне або декілька полів не заповнені!')
                flag = false;
                break;
            }
        }
        if(flag) {
            return axios.post('/students', this.state.student)
                .then(r => r.data)
                .then(r => {
                    return r;
                }).catch(error => {
                    console.log(error.response)
                }).then(s => {this.showAnimation()})

        }
    };

    showAnimation = () => {
        this.setState({animation: true})
        setTimeout(this.closeAnimation, 1500)
    }

    closeAnimation = () => {
        this.setState({animation: false})
    }

    getList(list) {
        let array = [];
        list.map((el) =>
            array.push(el)
        );
        return array
    }

    toggleCheckBox = (e) => {
        const id = e.target.id;
        const current = !this.state.student.isJoined;
        let obj = {...this.state.student};
        obj[id] = current;
        this.setState({student: obj});
        setTimeout(() => console.log(this.state), 500);
    };

    clearArray = () => {
        this.setState({
            student: [],
            currentRegion: "",
            currentVnz: "",
            currentProf: "",
        })
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (

            <div className={classes.wrapper}>
                <form className={classes.root} autoComplete="off"
                      onSubmit={()=>{this.add.bind(this)}}
                      onReset={() => {
                          this.clearArray()
                      }}>

                    {this.state.animation ? <div className="animation">
                        <div className="galka"/>
                    </div> : null}

                    <Grid className={classes.row}>
                        <TextField
                            onChange={this.onChangeEvent}
                            id="name"
                            label="ПІБ"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid className={classes.row}>
                        <FormControl margin="normal" variant="outlined" className={classes.textField}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}>
                                Область
                            </InputLabel>

                            <Select
                                id={"region"}
                                name={"currentRegion"}
                                value={this.state.currentRegion}
                                onChange={(event) => {
                                    this.handleChange(event);
                                    const s = {...this.state.student, region: event.target.value}
                                    this.setState(
                                        {
                                            student: s
                                        })
                                }}

                                input={
                                    <OutlinedInput labelWidth={320}/>}>

                                {this.state.regions.map((item, index) =>
                                    <MenuItem key={index} style={{whiteSpace: 'normal'}} value={item}>{item}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <TextField
                            onChange={this.onChangeEvent}
                            id="address"
                            label="Введіть адресу..."
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />

                    </Grid>


                    <Grid className={classes.row}>
                        <FormControl  margin="normal" variant="outlined" className={classes.textField}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}>
                                Професія
                            </InputLabel>

                            <Select
                                id={"prof"}
                                name={"currentProf"}
                                value={this.state.currentProf}
                                onChange={(event) => {
                                    this.handleChange(event);
                                    const s = {...this.state.student, prof: event.target.value}
                                    this.setState(
                                        {
                                            student: s
                                        })
                                }}
                                input={
                                    <OutlinedInput
                                        labelWidth={320}/>}>

                                {this.state.professions.map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )}

                            </Select>
                        </FormControl>


                        <FormControl  margin="normal" variant="outlined" className={classes.textField}>

                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}>
                                ВНЗ
                            </InputLabel>

                            <Select
                                id={"vnz"}
                                name={"currentVnz"}
                                value={this.state.currentVnz}
                                onChange={(event) => {
                                    this.handleChange(event);
                                    const s = {...this.state.student, vnz: event.target.value}
                                    this.setState(
                                        {
                                            student: s
                                        })
                                }}

                                input={
                                    <OutlinedInput
                                        labelWidth={320}/>}>

                                {this.state.vnzes.map((item,index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                    </Grid>


                    <Grid className={classes.row}>
                        <TextField
                            onChange={this.onChangeEvent}
                            id="tel"
                            type="telephone"
                            label="Номер телефону..."
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            onChange={this.onChangeEvent}
                            id="email"
                            type="email"
                            label="Електронна пошта..."
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>


                    <Grid className={classes.inputButtons}>
                        <span>У майбутньому: вступив чи ні в НУВГП?</span>
                        <Switch
                            margin="normal"
                            className={classes.switch}
                            id={"isJoined"}
                            checked={this.state.student.isJoined}
                            onChange={(event) => {
                                this.toggleCheckBox(event)
                            }}
                            color="primary"/>
                    </Grid>


                    <Grid className={classes.inputButtons}>
                        <Button variant="contained" type={"submit"} className={classNames(classes.button)}>
                            Відправити
                        </Button>
                        <Button variant="contained" type={"reset"} className={classNames(classes.button)}>
                            Очистити
                        </Button>
                    </Grid>

                </form>


            </div>
        )
    }
}

StudentsRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StudentsRegistration);


