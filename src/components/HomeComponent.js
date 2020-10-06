import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';

function RenderCard({item, isLoading, errmss}){
	if (isLoading) {
		return(
				<Loading />
		);
	}
	else if (errmss) {
		return(
				<h4>{errmss}</h4>
		);
	}
	return(
		<Card>
			<CardImg src={item.image} alt={item.name} />
			<CardBody>
				<CardTitle>{item.name}</CardTitle>
				{item.designation ? <CardSubtitle> {item.designation} </CardSubtitle> : null }
				<CardText>{item.description}</CardText>
			</CardBody>
		</Card>
		);
}

function Home(props){
	return(
			<div className="container">
				<div className="row align-items-start">
					<div className="col-12 col-md m-1">
						<RenderCard item={props.dish} 
						isLoading={props.dishesLoading}
						errmss={props.dishesErrMess}/>
					</div>
					<div className="col-12 col-md m-1">
						<RenderCard item={props.promotion}/>
					</div>
					<div className="col-12 col-md m-1">
						<RenderCard item={props.leader}/>
					</div>
				</div>
			</div>
		);
}

export default Home;