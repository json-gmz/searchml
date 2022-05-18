import React from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import NumberFormat from 'react-number-format';
import '../assets/styles/components/Details.css';

import { getDetails } from '../actions/actions';

export const numberProps = {
    prefix: '$ ',
    displayType: 'text',
    thousandSeparator: '.',
    decimalScale: 0,
    decimalSeparator: ','
}

const renderDetails = (data, query) => {

    if (isEmpty(data)) {
        return null;
    }

    let {
        title,
        pictures,
        description_text,
        category_tree,
        price,
        attributes,
        sold_quantity
    } = data;

    var condition = attributes.map(function(obj){
        return (obj.id === "ITEM_CONDITION" ? obj.value_name : "");
    });

    var category_text = category_tree.map(function(category){
        return "<span>" + category.name + "</span>";
    }).join(" &gt; ");

    return (
        <>
            <Container fluid>
                <Row className='category-tree' noGutters>
                    <Col md={{ span: 10, offset: 1 }} dangerouslySetInnerHTML={{__html: category_text}} />
                </Row>
                <Row className='product-details' noGutters>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row className="block" noGutters>
                            <Col md={8}>
                                <div className='img'>
                                    {pictures
                                    ? <img
                                        src={pictures[0].url}
                                        alt={title}
                                        />
                                    : null
                                    }
                                </div>
                                <div className='title'>
                                    Descripción del producto
                                </div>
                                <div className="description">
                                    --- {description_text} ---
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="condition">
                                    {condition} - {sold_quantity} vendidos
                                </div>
                                <div className="name">
                                    {title}
                                </div>
                                <div className="price">
                                    <NumberFormat {...numberProps} value={price} />
                                </div>
                                <div className="buy">
                                    <Button variant="primary">Comprar</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const renderLoading = () => {
    return (
        <>
            <Container fluid>
                <Row className='loading'>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Spinner animation="border" variant="warning"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const renderError = (message) => {
    return (
        <>
            <Container fluid>
                <Row className='error'>
                    <Col md={{ span: 10, offset: 1 }}>
                        {message}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const Details = ({ data, isFetching, query, error, getDetails }) => {

    let jsxStr = '';

    if (isFetching) {
        jsxStr = renderLoading();
    } else if (!isEmpty(error)) {
        jsxStr = renderError("No se encontraron detalles");
    } else if (isEmpty(data)) {
        if ( window.location.hash.split("/")[2] !== undefined ) {
            getDetails(window.location.hash.split("/")[2]);
        } else {
            jsxStr = renderError("No se encontraron detalles");
        }
    } else {
        jsxStr = renderDetails(data, query);
    }

    return (
        <div className="component details">
            <Container fluid>
                <Row>
                    <Col>
                        {jsxStr}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    let { data, isFetching, error } = state.product;

    return {
        query: state.product.query,
        data,
        isFetching,
        error
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDetails
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);