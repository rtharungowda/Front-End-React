import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes' ;
import DishDetail from './DishDetailComponent';

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
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
            </div>
          </Navbar> 
          <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/>
          <DishDetail selectedDish={this.state.dishes.filter((dish) => this.state.selectedDishID === dish.id)[0]}/>
        </div>);
  }
}

export default Main;