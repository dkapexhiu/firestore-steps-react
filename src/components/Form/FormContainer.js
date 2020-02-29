import { connect } from 'react-redux'
import { saveFormData, changeStateProps } from '../../actions'
import Form from './Form'

const mapStateToProps = (state, ownProps) => {
  return {
    formData: state.form.formData,
    isEditing: true,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        // For save form data
    saveFormData: function (prop, value, reducer) {
      saveFormData(prop, value, reducer)(dispatch)
      return null
    },
        // For change state
    changeStateProps: function (prop, value, reducer) {
      changeStateProps(prop, value, reducer)(dispatch)
      return null
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)
