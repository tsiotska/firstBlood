import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {
  clickFirstButton, clickLastButton, changeButtons,
  changeMover,renderTable
} from '../../../../../redux/TableState/tableActions'
import {connect} from "react-redux";
import './Buttons.css'

const mapStateToProps = state => ({
  last: state.tableReducer.last,
  maxCount: state.tableReducer.maxCount,
  startCount: state.tableReducer.startCount,
  current: state.tableReducer.current
});

const styles = theme => ({
  fab: {
    marginRight: theme.spacing.unit,
  },
});

const mapDispatchToProps = dispatch => ({
  activateFirstButton: () => dispatch(clickFirstButton()),
  activateLastButton: () => dispatch(clickLastButton()),
  changeAllButtons: (i) => dispatch(changeButtons(i)),
  anotherMover: (i) => dispatch(changeMover(i)),
  updateTable:(flag)=>dispatch(renderTable(flag))
});


class Buttons extends React.Component {

  firstBtn = () => {                    //зброс на першу кнопку
    this.props.activateFirstButton();

  };

  lastBtn = () => {                      //перехід на останню
    this.props.activateLastButton();

  };

  changeBut = (i) => {                    //переписує номера кнопок
    this.props.changeAllButtons(i);

  };
  changeMover = (number) => {           //міняє показ рядів в списку по нажатію кнопочки
    this.props.anotherMover(number);
    this.props.updateTable(true);
  };

  render() {
    const {classes} = this.props;
    const {last, maxCount, startCount, current} = this.props;
    let buttons = [];

    buttons.push(<Fab className={classes.fab} id={current === 1 ? "buttonClick" : "buttons"}
                         onClick={() => {this.changeMover(0);
                         this.firstBtn()}}>{1}</Fab>);

    if (last <= maxCount && last !== 0 && last !== 1) {         //Якщо порядок останньої кнопочки меньший за
                                                                //кількість проміжних кнопочок
      for (let i = startCount; i <= last; i++)                  //то рендеримо стільки скільки маємо
        buttons.push(<Fab className={classes.fab} id={current === i ? "buttonClick" : "buttons"}
                             onClick={() => {
                               this.changeMover(i - 1);
                               this.changeBut(i)}}>{i}
          </Fab>);
    }

    if (last > maxCount) {      //Якшо кнопок більше чим в мене є
      if (startCount > 2) {//Коли починається рендер від 3 кпопки, то між першою і рядом проміжних лежить три крапки
        buttons.push(
          <Fab className={classes.fab} id="Disabled" disabled>...</Fab>)
      }

      for (let i = startCount; i <= maxCount; i++) {  //Рендерим проміжні кнопки
        buttons.push(<Fab className={classes.fab} id={current === i ? "buttonClick" : "buttons"} onClick={() => {
          this.changeMover(i - 1);
          this.changeBut(i)}}>
          {i}
          </Fab>);
      }

      if (maxCount + 1 < last) { //Єслі не дошли до кінця кнопок, то рендер трьох крапок
        buttons.push(<Fab className={classes.fab} disabled id="Disabled">...</Fab>)
      }
        //просто остання кнопка
      buttons.push(<Fab className={classes.fab} id={current === last ? "buttonClick" : "buttons"} onClick={() => {
        this.changeMover(last - 1);
        this.lastBtn(); this.changeBut(last)}}>
        {last}</Fab>)
    }
    return (
      <ButtonGroup className="ButtonsBlock">
        {buttons}
      </ButtonGroup>
    )
  }
}

Buttons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Buttons));





