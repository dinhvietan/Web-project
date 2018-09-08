import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Product from './Product';
import DataUtils from '../../Utils/DataUtils';

const NUMBER_OF_ROW = 3;

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {ProductList: []};
        this.buildProductList = this.buildProductList.bind(this);
    }
    componentDidMount() {
        this.getProductList();
    }
    componentWillReceiveProps(props) {
        
        if(props.type != this.props.type) {console.log(3535)
            this.getProductList();
        }
    }
    getProductList() {
        let type = this.props.type || null;
        let filter = null;
        if(type)
            filter = {"catalog_id": type};
        DataUtils.getList("/api/inventory/list", filter)
        .then(this.buildProductList);
    }
    buildProductList(res) {
        let productListTemplate = [];
        let productData = [];
        if(res.Success && res.Data)
            productData = res.Data;

        let productList = [];
        for(let index in productData) {
            productList.push(
                <Col key={index} xs={12} md={3}>
                    <Product data = {productData[index]} />
                </Col>
            )
            if(productList.length == NUMBER_OF_ROW) {
                productListTemplate.push(
                    <Row key={"row-"+index}>
                        {productList}
                    </Row>
                )
                productList = [];
            }
           
        }
        if(productList.length && productList.length < NUMBER_OF_ROW) {
            productListTemplate.push(
                <Row key={"row-last"}>
                    {productList}
                </Row>
            )
        }
        this.setState({ProductList: productListTemplate});
    }
    render() {
        console.log(34534, this.props.type)
        return (
            <div style={{marginTop: '10px'}}>
                <Grid className="show-grid">                    
                    {this.state.ProductList}
                </Grid>
            </div>
        )
    }
}

export default ProductList;