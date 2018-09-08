import React from 'react';
import {Panel, Table, ButtonToolbar, Button} from 'react-bootstrap';
import DataUtils from '../Utils/DataUtils';

import $ from 'jquery';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {DataList: []};
        this.onDetail = this.onDetail.bind(this);
        this.buildProductList = this.buildProductList.bind(this);
    }

    componentDidMount() {
        this.loadProductList();
    }

    onCreateNew(event) {
        window.location.href = "/productdetail?id=0";
    }

    onDetail(event) {
        let Id = $(event.target).parent().attr("id");
        window.location.href = "/productdetail?id="+Id;
        //event.preventDefault();
    }

    loadProductList() {
        DataUtils.getList("/api/inventory/list", "")
        .then(this.buildProductList);
    }

    buildProductList(res) {
        if(res.Success == false)
            return [];
        let ProductList = res.Data;//DataUtils.getProductList();
        let _productList = [];

        for(let i in ProductList) {
            _productList.push(
                <tr key={i} id={ProductList[i].inventory_id} onDoubleClick={this.onDetail}>
                    <td>{parseInt(i) + 1}</td>
                    <td>{ProductList[i].inventory_name}</td>
                    <td>{ProductList[i].inventory_catalog}</td>
                    <td>{ProductList[i].inventory_price}</td>
                    <td>{ProductList[i].inventory_saleoff}</td>
                </tr>
            )
        }

        this.setState({DataList: _productList});
        //return _productList;
    }

    render() {
        //let _productList = this.buildProductList();
        return (
            <div>
                <Panel className="page-panel" >
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">Danh Sách Sản Phẩm</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <ButtonToolbar>
                            <Button type="button" onClick={this.onCreateNew.bind(this)}>Tạo Mới</Button>
                        </ButtonToolbar>
                        <Table className="product-list" hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Danh Mục Sản Phẩm</th>
                                <th>Giá Sản Phẩm</th>
                                <th>Giảm Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.DataList}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default Product;