import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Item from './blocks/Item';
import '../assets/styles/components/Results.css';

const renderProductsList = (data, query) => {
    
    if (isEmpty(data)) {
        return null;
    }

    let { results: products } = data;

    return (
        <>
            <Container fluid>
                <Row className='category-tree' noGutters>
                    <Col className="text-md-center" md={{ span: 10, offset: 1 }}>
                        <span>Resultados encontrados</span> <span>&lt;{query}&gt;</span>
                    </Col>
                </Row>
                <Row className='products-list' noGutters>
                    <Col md={{ span: 10, offset: 1 }}>
                        {products.map(item => <Item key={item.id} item={item} />)}
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

const Results = ({ data, isFetching, query, error }) => {    
    let jsxStr = '';

    if (isFetching) {
        jsxStr = renderLoading();
    } else if (!isEmpty(error)) {
        jsxStr = renderError(error);
    } else if (isEmpty(data.results)) {
        jsxStr = renderError("No se encontraron resultados");
    } else {
        data.results = data.results.slice(0, 4);
        jsxStr = renderProductsList(data, query);
    }

    return (
        <div className="component results">
            {jsxStr}
        </div>
    )
}

const mapStateToProps = (state) => {
    let { data, isFetching, query, error } = state.products;

    return {
        data,
        isFetching,
        query,
        error
    }
}

export default connect(
    mapStateToProps,
    null
)(Results);