import React from 'react';

import {Jumbotron, Button, Thumbnail, Image} from 'react-bootstrap';

import CurrencyFormat from 'react-currency-format';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            
            }
        };
        
        if(props.data) {
            this.state.data = props.data;
        }
    }

    render() {
        let salesOffPrice = parseFloat(this.state.data.inventory_price) * (parseFloat(this.state.data.inventory_saleoff)*0.01);
        let salePrice = (<CurrencyFormat value={parseFloat(this.state.data.inventory_price) - salesOffPrice} decimalSeparator={'.'} displayType={'text'} thousandSeparator={','} suffix={'đ'} />);
        let realPrice = (<CurrencyFormat value={parseFloat(this.state.data.inventory_price)} decimalSeparator={'.'} displayType={'text'} thousandSeparator={','} suffix={'đ'} />);

        return (
            <div>
                <Thumbnail className="product-item" alt="171x180">
                    {this.state.data.inventory_name}
                    <p className="product-item-price">
                        <span className="sale-price">
                            {salePrice}
                        </span>
                        <span className="real-price">
                            {realPrice}
                        </span>
                        
                        <span className="saleoff-price">
                            -{parseFloat(this.state.data.inventory_saleoff)}%
                        </span>
                    </p>
      
                    <p>
                        <Button style={{opacity: 0, cursor: "default"}} disabled bsStyle="default">Button</Button>    
                        <Button className="pull-right">Xem</Button>
                    </p>
                </Thumbnail>
            </div>
        );
    }
}

export default Product;