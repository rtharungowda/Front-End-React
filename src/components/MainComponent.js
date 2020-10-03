import React, {Component} from 'react';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ContactUs from './ContactComponent';
import About from './AboutusComponent';
import { DISHES } from '../shared/dishes' ;
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {

  constructor (props){
    super(props);

    this.state = {
      dishes:DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      selectedDishID:null
    };
  }

  // onDishSelect(dishID){
  //   this.setState({selectedDishID : dishID});
      
  //     <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/>
  //     <DishDetail selectedDish={this.state.dishes.filter((dish) => this.state.selectedDishID === dish.id)[0]}/>
      
  // }

  render() {

    const HomePage = () =>{
      return (
          <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}  
          leader={this.state.leaders.filter((leader) => leader.featured)[0]} 
          promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
          />
        );
    }

    const DishWithId = ({match}) =>{

      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
        );

    }

    return(
        <div>
          <Header/> 
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)} /> } />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} /> } />
            <Redirect to="/home"/>
          </Switch>
          <Footer/>
        </div>);
  }
}

export default Main;