import React from 'react';
import {connect} from 'react-redux'
import StudentsRegistration from './InfoSectionComponents/StudentsRegistration'
import TableStudentsInfo from './InfoSectionComponents/TableStudentsInfo'
import DiagramStudentsInfo from './InfoSectionComponents/DiagramStudentsInfo'


class InfoSection extends React.Component {
    changeInfoSection = (idOfSection) => {
        switch(idOfSection) {
            case "Реєстрація":
                return <StudentsRegistration/>
            case "Списки студентів":
                return <TableStudentsInfo/>
            case "Статистика":
                return <DiagramStudentsInfo/>
            default:
                return "Error"
        }
    };

    render() {

        const currentSection = this.changeInfoSection(this.props.currentInfoSection);
        return(
            <section>
                {currentSection}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    currentInfoSection: state.mainReducer.currentInfoSection,

});
export default connect(mapStateToProps, null)(InfoSection);

