import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import Details from '../components/Details';
import '../assets/styles/containers/Product.css';

const Product = () => (
    <Container fluid>
        <Row noGutters>
            <Col>
                <SearchBox />
                <Details />
            </Col>
        </Row>
    </Container>
)

export default Product;