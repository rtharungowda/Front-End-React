import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Label, Input, Col, Button, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Form, Errors, Control, actions} from 'react-redux-form';

const required = (val) => val && val.length;
// const minlength = (len) => (val) =>{
//     if (val.length>=len){
//         return true;
//     }

//     return false;
// }
const minlength = (len) => (val) => val && (val.length >= len) ;
const email = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const number = (val) => !isNaN(Number(val));

class ContactUs extends Component{

    constructor(props){
        super(props);

        // this.state ={
        //     firstname: '',
        //     lastname: '',
        //     email: '',
        //     telno: '',
        //     agree: false,
        //     contactType: 'Through Email',
        //     message: '',
        //     touched: {
        //         firstname: '',
        //         lastname: '',
        //         email: '',
        //         telno: ''
        //     }
        // }

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
    } 

    // handleInputChange(event){
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name] : value
    //     });

    // }

    handleSubmit(values){
        console.log('Current state is:' + JSON.stringify(values));
        alert('Current state is:' + JSON.stringify(values));
        this.props.resetFeedback();
    }

    render(){

        // const errors = this.validate(this.state.firstname, this.state.lastname, this.state.email, this.state.telno);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem ><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>ContactUs</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>ContactUs</h3>
                    <hr />
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model ='feedback' onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>Firstname</Label>
                                <Col md={{size:10}}>
                                <Control.text model=".firstname" className="form-control" id="firstname" name="firstname" placeholder="Enter your firstname"
                                validators ={{required, minLength : minlength(3)}} />
                                <Errors className="text-danger" model=".firstname" show="touched" messages= {{required: "Required", minLength: " Must be greater than 3 letters try adding space"}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Lastname</Label>
                                <Col md={{size:10}}>
                                <Control.text model=".lastname" className="form-control" id="lastname" name="lastname" placeholder="Enter your lastname" 
                                validators ={{required, minLength : minlength(3)}}/>
                                <Errors className="text-danger" model=".lastname" show="touched" messages= {{required: "Required", minLength: " Must be greater than 3 letters try adding space"}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={{size:10}}>
                                <Control.text model=".email" className="form-control" id="email" name="email" placeholder="Enter your email id" 
                                validators ={{required, email}}/>
                                <Errors className="text-danger" model=".email" show="touched" messages= {{required: "Required", email: " Enter a valid email"}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telno" md={2}>Tel No.</Label>
                                <Col md={{size:10}}>
                                <Control.text model=".telno" className="form-control" id="telno" name="telno" placeholder="Enter your Telelphone/ Mobile number" 
                                validators ={{required, number}}/>
                                <Errors className="text-danger" model=".telno" show="touched" messages= {{required: "Required", number: " Enter a valid number "}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6, offset:2}}>
                                <Label check>
                                <Control.checkbox model=".agree" className="form-check-input" id="agree" name="agree" /> {' '}<strong>Subscribe for coupon and offer notifications!!!</strong>
                                </Label>
                                </Col>
                                <Col md = {{size:3, offset:1}}>
                                    <Label check>
                                    <Control.select model=".contactType" className  ="form-control" id="contactType" name="contactType">
                                        <option>Through Sms</option>
                                        <option>Through Email</option>
                                    </Control.select>
                                    </Label>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" className="form-control" row="12" id="message" name="message" placeholder="What do you think?" /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" value="submit" color="primary">Send</Button>
                                </Col>
                            </Row>
                        </Form> 
                    </div>                   
                </div>
            </div>
            );
    }
}


export default ContactUs;