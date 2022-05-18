import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import imgShipping from '../../assets/img/ic_shipping.png';
import { getDetails } from '../../actions/actions';
import '../../assets/styles/components/blocks/Item.css';

export const numberProps = {
    prefix: '$ ',
    displayType: 'text',
    thousandSeparator: '.',
    decimalScale: 0,
    decimalSeparator: ','
}

const Item = ({ item, getDetails }) => {
    
    let {
        id,
        title,
        thumbnail,
        address,
        shipping,
        price
    } = item;

    const handleClick = (e, id) => {
        e.stopPropagation();
        getDetails(id);
    }

    return (
        <Link className="link-item" to={`/items/${id}`} onClick={ e => handleClick(e, id) }>
            <Row className='item' >
                <Col md="auto" className='img'>
                    {thumbnail
                        ? <img src={thumbnail} alt={title} title={title} />
                        : null
                    }
                </Col>
                <Col md={7} className='detail'>
                    <div className='price'>
                        <NumberFormat {...numberProps} value={price} />
                        {shipping.free_shipping
                            ? <img className='free_shipping' src={imgShipping} alt="Envío gratis" title="Envío gratis" />
                            : null
                        }
                    </div>
                    <div className='name'>{title}</div>
                </Col>
                <Col md={2} className='location'>
                    <p className='city'>{address.state_name}, {address.city_name}</p>
                </Col>
            </Row>
        </Link>
    )
}

const mapStateToProps = (state) => {
    return {
        query: state.product.query
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
)(Item);