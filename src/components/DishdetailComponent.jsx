import { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {

    renderDish(dish) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }
    renderComments(comments) {
        if (comments != null) {
            return (
                <>
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return (
                            <CardBody>
                                <CardTitle>{comment.comment}</CardTitle>
                                <CardText>--{comment.author}, {comment.date}</CardText>
                            </CardBody>
                        )
                    })}
                </>)
        } else {
            return (
                <>
                </>
            );
        }
    };
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.props.selectedDish&&this.renderComments(this.props.selectedDish.comments)}
                </div>

            </div>
        )
    };
}
export default DishDetail;