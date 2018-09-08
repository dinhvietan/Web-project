import React from 'react';
import {Table, Panel, Button} from 'react-bootstrap';

import DataUtils from '../../Utils/DataUtils';

let $  = require('jquery');

class CatalogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CatalogList: []
        };
        this.buildCatalogList = this.buildCatalogList.bind(this);
        this.getCatalogList();
    }
    onDetail(event) {
        let ele = $(event.target);
        if(ele[0].tagName == 'TD')
            ele = ele.parent();
        let id = ele.attr('id');
        window.location.href = "/catalog?id="+id;
    }
    getCatalogList() {
        DataUtils.getList("/api/catalog/list")
        .then(this.buildCatalogList);
    }
    buildCatalogList(data) {
        let catalogList = [];
        if(data.Success && data.Data)
            catalogList = data.Data;

        let _catalogList = [];

        for(let i in catalogList) {console.log(223, i, catalogList[i])
            _catalogList.push(
                <tr key={i} onDoubleClick={this.onDetail} id={catalogList[i].catalog_id}>
                    <td>{i + 1}</td>
                    <td>{catalogList[i].catalog_name}</td>
                    <td>{catalogList[i].catalog_description}</td>
                </tr>
            )
        }
        console.log(_catalogList)
        this.setState({CatalogList: _catalogList});
    }
    onCreateNew() {
        window.location.href = "/catalog?id=0";
    }
    render() {
        return (
            <div>
                <Panel className="page-panel">
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">Danh Mục Sản Phẩm</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Button onClick={this.onCreateNew.bind(this)}  className="btn">Tạo Mới</Button>
                        <Table className="catalog-list" hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Danh Mục</th>
                                    <th>Mô Tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.CatalogList}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default CatalogList;