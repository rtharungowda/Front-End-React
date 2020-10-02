import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes' ;

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
  }

  render() {

    return(
        <div>
          <Header/> 
          <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/>
          <DishDetail selectedDish={this.state.dishes.filter((dish) => this.state.selectedDishID === dish.id)[0]}/>
          <Footer/>
        </div>);
  }
}

export default Main;