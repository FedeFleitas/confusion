import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

function RenderComments({ comments }) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <CardBody>
                            <CardTitle>{comment.comment}</CardTitle>
                            <CardText>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</CardText>
                        </CardBody>
                    )
                })}
            </div>)
    } else {
        return (
            <>
            </>
        );
    }
};

function DishDetail(props) {
    if (props.dish) {

        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />

                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
};

export default DishDetail;