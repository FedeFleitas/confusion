import React, { Component } from "react";
import { Col, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    };
    render() {

        return (
            <>
                <Button onClick={this.toggleModal} outline color="secondary"><span className='fa fa-pencil'></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Col className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col >
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="name" md={{ size: 3, offset: 0 }}>Your Name</Label>
                                <Col >
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="comment" md={{ size: 3, offset: 0 }}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Col >
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Col>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }

};

function RenderComments({ comments }) {
    if (comments !== null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments && comments.map(comment => {
                    return (
                        <CardBody>
                            <CardTitle>{comment.comment}</CardTitle>
                            <CardText>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</CardText>
                        </CardBody>
                    )
                })}
                <CommentForm />
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
};

export default DishDetail;