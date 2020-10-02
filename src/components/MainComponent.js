import React, {Component} from 'react';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes' ;

import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {

  constructor (props){
    super(props);

    this.state = {
      dishes:DISHES,
      selectedDishID:null
    };
  }

  onDishSelect(dishID){
    this.setState({selectedDishID : dishID});
      /*
      <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/>
      <DishDetail selectedDish={this.state.dishes.filter((dish) => this.state.selectedDishID === dish.id)[0]}/>
      */
  }

  render() {

    const HomePage = () =>{
      return (
          <Home />
        );
    }

    return(
        <div>
          <Header/> 
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)} /> } />
            <Redirect to="/home"/>
          </Switch>
          <Footer/>
        </div>);
  }
}

export default Main;