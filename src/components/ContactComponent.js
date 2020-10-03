import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class ContactUs extends Component{

    constructor(props){
        super(props);

        this.state ={
            firstname: '',
            lastname: '',
            email: '',
            telno: '',
            agree: false,
            contactType: 'Through Email',
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    } 

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });

    }

    handleSubmit(event){
        console.log('Current state is:' + JSON.stringify(this.state));
        alert('Current state is:' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render(){
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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>Firstname</Label>
                                <Col md={{size:10}}>
                                <Input type="text" id="firstname" name="firstname" placeholder="Enter your firstname" value={this.state.firstname} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Lastname</Label>
                                <Col md={{size:10}}>
                                <Input type="text" id="lastname" name="lastname" placeholder="Enter your lastname" value={this.state.lastname} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={{size:10}}>
                                <Input type="text" id="email" name="email" placeholder="Enter your email id" value={this.state.email} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telno" md={2}>Tel No.</Label>
                                <Col md={{size:10}}>
                                <Input type="tel." id="telno" name="telno" placeholder="Enter your Telelphone/ Mobile number" value={this.state.telno} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6, offset:2}}>
                                <Label check>
                                <Input type="checkbox" id="agree" name="agree" checked={this.state.agree} onChange={this.handleInputChange}/> {' '}<strong>Subscribe for coupons and offers notifications!!!</strong>
                                </Label>
                                </Col>
                                <Col md = {{size:3, offset:1}}>
                                    <Label check>
                                    <Input type="select" id="contactType" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Through Sms</option>
                                        <option>Through Email</option>
                                    </Input>
                                    </Label>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" row="12" id="message" name="message" placeholder="What do you think?" value={this.state.message} onChange={this.handleInputChange}/> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="Submit" color="primary">Send</Button>
                                </Col>
                            </FormGroup>
                        </Form> 
                    </div>                   
                </div>
            </div>
            );
    }
}


export default ContactUs;