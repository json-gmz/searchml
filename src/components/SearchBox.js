import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../actions/actions';
import imgLogo from '../assets/img/Logo_ML.png';
import imgSearch from '../assets/img/ic_Search.png';
import '../assets/styles/components/SearchBox.css';

const SearchBox = ({ getProducts }) => {

    const handleSubmit = e => {
        e.preventDefault();
        getProducts(e.target.searchbox.value);
        document.getElementById("home-logo").click();
    }

    return (
        <div className="component search-box">
            <Container fluid>
                <Row>
                    <Col md={{ span: 1, offset: 1 }}>
                        <Link id="home-logo" to={'/'}>
                            <img src={imgLogo} alt="Mercado Libre" title="Mercado Libre" />
                        </Link>
                    </Col>
                    <Col md={{ span: 9 }}>
                        <Form className="search-box-form" onSubmit={handleSubmit}>
                            <Form.Control id="searchbox" type="text" placeholder="Nunca dejes de buscar" />
                            <Button variant="light" type="submit" title="Buscar"><img src={imgSearch} alt="Buscar" /></Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        query: state.products.query
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProducts
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox);