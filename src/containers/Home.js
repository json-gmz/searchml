import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import Results from '../components/Results';
import '../assets/styles/containers/Home.css';

const Home = () => (
    <Container fluid>
        <Row noGutters>
            <Col>
                <SearchBox />
                <Results />
            </Col>
        </Row>
    </Container>
)

export default Home;