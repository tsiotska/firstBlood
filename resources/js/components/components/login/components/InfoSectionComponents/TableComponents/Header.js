import React from 'react';
import {Button} from 'reactstrap'
import {connect} from "react-redux"
import {sortClickData, twiceClickData, renderTable} from "../../../../../redux/TableState/tableActions"

const mapStateToProps = state => ({
    info: state.tableReducer.info,
    direction: state.tableReducer.direction,
    checking: state.tableReducer.checking
});

const mapDispatchToProps = dispatch => ({
    activateSortData: (temp, type) => dispatch(sortClickData(temp, type)),
    activateTwiceClickData: (temp) => dispatch(twiceClickData(temp)),
    updateTable: (flag) => dispatch(renderTable(flag)),

});

class Header extends React.Component {
    state = {
        labels: ["name", "region", "address", "tel", "email", "vnz", "prof"]
    }


    sortDate = (type) => {   //сортування дати
        let temp = this.props.info;
        if (this.props.checking !== type) {
            temp.sort((a, b) => a.updated_at < b.updated_at ? -this.props.direction : this.props.direction);
            this.props.activateSortData(temp, type)
        } else {
            temp.sort((a, b) => a.updated_at < b.updated_at ? -this.props.direction : this.props.direction);

            this.props.activateTwiceClickData(temp);
        }

        this.props.updateTable(true);
    };

    setSortedData = (type) => {    //(СОРТУВАННЯ ЗА ІНШИМИ ВСІМА)
        let temp = this.props.info;
        if (type !== this.props.checking) {
            console.log(type);
            temp.sort((a, b) => a[type] !== b[type] ? a[type] < b[type] ? -this.props.direction : this.props.direction : 0);
            this.props.activateSortData(temp, type);
        } else if (type === this.props.checking) { //Якшо повторний клік
            temp.sort((a, b) => a[type] !== b[type] ? a[type] < b[type] ? -this.props.direction : this.props.direction : 0);
            this.props.activateTwiceClickData(temp);
        }

        this.props.updateTable(true);

    };

    render() {
        return (
            <tr>
                <th id="Editor"/>
                {this.state.labels.map((item, index) => <th key={index}>
                    <Button onClick={() => {this.setSortedData(item)}} id="sort">{item}</Button>
                </th>)}
                <th><Button onClick={()=> {this.sortDate("date")}} id="sort">Date</Button></th>
            </tr>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
