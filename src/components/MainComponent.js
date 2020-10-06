import React, {Component} from 'react';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ContactUs from './ContactComponent';
import About from './AboutusComponent';
import {actions} from 'react-redux-form';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import  {addComment, fetchDishes} from '../redux/ActionCreators';

const mapStateToProps = (state) =>{
  return {
    dishes:state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
    };
}

const mapDispatchToProps = dispatch =>{
    return({
            addComment : (dishId, rating, name, comment) => dispatch(addComment(dishId, rating, name, comment)),
            fetchDishes : () => {dispatch(fetchDishes())},
            resetFeedback : () => {dispatch(actions.reset('feedback'))}
          });
}

class Main extends Component {

  constructor (props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () =>{
      return (
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errmss}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]} 
          promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
          />
        );
    }

    const DishWithId = ({match}) =>{

      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errmss = {this.props.dishes.errmss}
          comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
          />
        );

    }

    return(
        <div>
          <Header/> 
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} onClick={(dishID) => this.onDishSelect(dishID)} /> } />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={() => <ContactUs resetFeedback={this.props.resetFeedback}/>} />
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
            <Redirect to="/home"/>
          </Switch>
          <Footer/>
        </div>);
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));