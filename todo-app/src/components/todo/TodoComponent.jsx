import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description : '',           
            targetDate : moment(new Date()).format('YYYY-MM-DD')       
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount TodoComponent');
    }    

    componentDidMount() {

        console.log('componentDidMount TodoComponent')
        let username = AuthenticationService.getLoggedInUserName()
        console.log(this.state.id)
        if (this.state.id==='-1') {

            
            /*TodoDataService.retrieveTodo(username, this.state.id)
                .then(response => this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                }))*/
            
            return
        } else {      

            TodoDataService.retrieveTodo(username, this.state.id)
                .then(response => this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                }))
        }
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a description'
        }else if(values.description.length < 5){
            errors.description = 'Enter atleast 5 characteres in Description'
        }       

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id===-1) {
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => {this.props.history.push('/todos')})
        } else { 
            TodoDataService.createTodo(username, todo).then(() => {this.props.history.push('/todos')})
        }
    }

    render() {

        console.log('TodoComponent - render()')
        let {description, targetDate} = this.state
        
        return  (<div>
                    <h1>Todo</h1>
                    <div className="container">
                        <Formik 
                            initialValues={{description,targetDate}}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}
                            >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description" />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>    
                                        <button className="btn btn-success" type="submit">Save</button>                                        
                                    </Form>
                                )
                            }
                        </Formik>

                    </div>                            
                </div>
                )
    }
}

export default TodoComponent