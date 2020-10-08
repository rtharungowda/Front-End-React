import React, {Component} from 'react';
import {Card, CardImg, CardBody,CardText, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Errors, Control} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseURL';

function RenderDish ({dish}){

	if (dish!=null)
		return(
				<Card>
					<CardImg width="100%" src={baseUrl.dish.image} alt={dish.name}/>
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			);
	else 
		return(<div></div>);
}

function RenderComments({comments, addComment, dishId}){

	if(comments!=null){
		const cnts = comments.map((cm)=> {
			return (
					<li key={cm.id}>
						<p>{cm.comment}</p>
						<p>--{cm.author} ,{"  "}  
							{new Intl.DateTimeFormat("en-US", 
							{
		                      year: "numeric",
		                      month: "short",
		                      day: "2-digit"
		                    }).format(new Date(Date.parse(cm.date)))}
	                    </p>
					</li>
				);
		});

		return(
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{cnts}
				</ul>
				<CommentForm addComment={addComment} dishId={dishId} />
			</div>
		);
	}else
		return(<div></div>);
}


const DishDetail = (props) => {

	if (props.isLoading){
		return (
			<div className="container">
				<div className="row">
					<div>
						<Loading/>
					</div>
				</div>
			</div>
			);
	}

	else if (props.errmss){
		return(
			<div className="container">
				<div className="row">
					<h4>{props.errmss}</h4>
				</div>
			</div>
			);
	}
	
	return(
		 <div className="container">
	        <div className="row">
	            <Breadcrumb>
	                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
	                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
	            </Breadcrumb>
	            <div className="col-12">
	                <h3>{props.dish.name}</h3>
	                <hr />
	            </div>                
	        </div>
	        <div className="row">
	            <div className="col-12 col-md-5 m-1">
	                <RenderDish dish={props.dish} />
	            </div>
	            <div className="col-12 col-md-5 m-1">
	                <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
	            </div>
	        </div>
        </div>
);
}

const minlength = (len) => (val) => val && val.length >= len ;
const maxlength = (len) => (val) => !(val) || (val.length <= len);
const required = (val) => val && val.length ;

class CommentForm extends Component{
	constructor(props){
		super(props);

		this.state ={
			isModalOpen: false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal(){
		this.setState({
			isModalOpen : !this.state.isModalOpen
		});
	}

	handleSubmit(values){
		this.toggleModal();
		alert('Current state is:' + JSON.stringify(values));
		this.props.addComment(this.props.dishId, values.rating, values.username, values.comment);
	}

	render(){
		return(
			<div>
				<Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>Add Comment</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Comments</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        	<Row className="form-group">
                                <Label md={12} htmlFor="password">Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" className="form-control" id="rating" name="rating">
                                	<option>5</option>
                                	<option>4</option>
                                	<option>3</option>
                                	<option>2</option>
                                	<option>1</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="username">Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".username" className="form-control" id="username" name="username" placeholder="Your name"
                                validators ={{ required ,maxLength: maxlength(15), minLength : minlength(3)}}/>
                                <Errors className="text-danger" model=".username" show="touched" 
                                messages= { {required:'Required', maxLength:'Name must be less than 15 characters, try giving your nick name or adding initials instead' ,minLength: ' Name must contain atleast 3 characters, try adding spaces at the end if your name is shorter than 3 characters',}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label  md={12} htmlFor="comment">Commet</Label>
                                <Col md={12}>
                                <Control.textarea row='12' model=".comment" className="form-control" id="comment" name="comment"/>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
			</div>

			);
	}
}

export default DishDetail