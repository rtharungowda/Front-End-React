import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';


function RenderDish ({dish}){
	if (dish!=null)
		return(
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name}/>
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
			);
	else 
		return(<div></div>);
}

function RenderComments({dish}){

	if(dish!=null){
		const cnts = dish.comments.map((cm)=> {
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
	                    </p><br/>
					</li>
				);
		});

		return(
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{cnts}
				</ul>
			</div>
		);
	}else
		return(<div></div>);
}


const DishDetail = (props) => {
	return(
		<div className="container">
			<div className="row">
					<RenderDish dish= {props.selectedDish}/>
					<RenderComments dish={props.selectedDish}/>
			</div>
		</div>
		);
}

export default DishDetail