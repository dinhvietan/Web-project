import React from 'react';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import './Styles/Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            userinfo: {
                email: "",
                name: ""
            }
        };

        let session = this.getSession();
        if(session !== null) {
            this.state.userinfo.email = session.email;
            this.state.userinfo.name = session.name;
            this.state.logged = true;
        }
    }

    componentDidMount() {
        if(this.state.logged === false) {
            if(window.location.pathname != "/login") {
                window.location.href = "/login";
            }
        }
    }

    getSession() {
        let session = window.localStorage.getItem("session");
        if(session != null) {
            return JSON.parse(session);
        }
        return null;
    }

    buildMenus() {
        let menus = [];
        menus.push((
            <Nav key={1}>
                <NavDropdown eventKey={2} title="Quản Lý" id="nav-account">
                    <MenuItem href="/account" eventKey={2.1}>Người Dùng</MenuItem>
                    <NavItem eventKey={2.2} href="/brandlist">
                        Thương Hiệu
                    </NavItem>   
                    <NavItem eventKey={2.3} href="/cataloglist">
                        Danh Mục Sản Phẩm
                    </NavItem>   
                </NavDropdown>
                <NavItem eventKey={2} href="/product">
                    Quản Lý Sản Phẩm
                </NavItem>
            </Nav>
        ));

        menus.push((
            <Nav key={1.1}>
                <NavDropdown eventKey={2} title="Sản Phẩm" id="nav-sanpham">
                    <MenuItem href="/may-anh-dslr" eventKey={2.1}>Máy ảnh DSLR</MenuItem>
                    <NavItem eventKey={2.2} href="/may-anh-mirror-less">
                        Máy ảnh Mirrorless
                    </NavItem>  
                    <NavItem eventKey={2.3} href="/may-anh-du-lich">
                        Máy ảnh du lich
                    </NavItem>    
                </NavDropdown>
            </Nav>
        ));

        menus.push((
            <Nav pullRight key={2}>
                <NavDropdown eventKey={3} title={this.state.userinfo.name} id="nav-profile">
                    <MenuItem onClick={this.onLogout.bind(this)} eventKey={3.1}>Đăng Xuất</MenuItem>
                    <MenuItem eventKey={3.2} href="/profile">Profile</MenuItem>
                </NavDropdown>
            </Nav>
        ));
        return menus;
    }

    onLogout(event) {
        window.localStorage.removeItem("session");
        window.location.href = "/login";
        event.preventDefault();
    }

    render() {
        let menus = [];
        let headerTemplate = [];
        if(this.state.logged === true && window.location.pathname != "/login") {
            menus = this.buildMenus();
            headerTemplate.push((
                <Navbar key={1} fluid={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">
                                REX
                            </a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    { menus }
                </Navbar>
            ));
        }
        return (
            <div>
                { headerTemplate }
            </div>
        );
    }
}

export default Header;