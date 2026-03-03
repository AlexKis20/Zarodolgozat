import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { HiArrowCircleLeft } from "react-icons/hi";

const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #15171c;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;

    @media screen and (max-width: 768px) {
        width: 40%;
        max-width: 250px
    }
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Overlay = styled.div`
    display: ${({ sidebar }) => (sidebar && window.innerWidth <= 768 ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 1; /* Ensure content stays below the sidebar */
`;

const Sidebar = ({ sidebar, setSidebar }) => {
    const showSidebar = () => setSidebar(!sidebar);
    const smallClick = () => {
        if (window.innerWidth <= 768) {
            setSidebar(false);
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <h1
                        style={{
                            textAlign: "center",
                            marginLeft: "200px",
                            color: "green",
                        }}
                    >
                        Nextify Admin
                    </h1>
                    <Link
                        style={{ marginLeft: "auto", fontSize: "50px" }}
                        to="/"
                    >
                        <HiArrowCircleLeft />
                    </Link>
                </Nav>
                <Overlay sidebar={sidebar} onClick={showSidebar} />
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu 
                                    item={item} 
                                    key={index} 
                                    onClick={smallClick}
                                />
                            );
                        })}
                  </SidebarWrap>
                </SidebarNav>
                <ContentWrapper>
                    {/* Existing content of the page */}
                </ContentWrapper>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;