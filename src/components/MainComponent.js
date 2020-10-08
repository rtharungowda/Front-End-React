import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ContactUs from './ContactComponent';
import About from './AboutusComponent';
import { actions } from 'react-redux-form';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
            postComment : (dishId, rating, name, comment) => dispatch(postComment(dishId, rating, name, comment)),
            fetchDishes : () => {dispatch(fetchDishes())},
            resetFeedback : () => {dispatch(actions.reset('feedback'))},
            fetchComments: () => {dispatch(fetchComments())},
            fetchPromos: () => {dispatch(fetchPromos())},
            fetchLeaders : () => {dispatch(fetchLeaders())},
            postFeedback : (feedback) => dispatch(postFeedback(feedback))
          });
}

class Main extends Component {

  // constructor (props){
  //   super(props);
  // }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () =>{
      return (
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMss = {this.props.dishes.errmss}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading = {this.props.leaders.isLoading}
          leaderErrMss = {this.props.leaders.errmss} 
          promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promosLoading={this.props.promotions.isLoading} 
          promoErrmss={this.props.promotions.errmss} 
          />
        );
    }

    const DishWithId = ({match}) =>{

      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = {this.props.dishes.isLoading} 
          errmss = {this.props.dishes.errmss}
          comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrmss = {this.props.comments.errmss}
          postComment = {this.props.postComment}
          />
        );

    }

    return(
        <div>
          <Header/> 
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/contactus" component={() => <ContactUs resetFeedback={this.props.resetFeedback} postFeedback={this.props.postFeedback}/>} />
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
                <Redirect to="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer/>
        </div>);
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));