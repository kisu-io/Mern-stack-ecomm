import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/1.png";

const options = {
  burgerColor: "rgba(255, 255, 255,1)",
  burgerColorHover: "#66806A",
  logo,
  logoWidth: "20vmax",
  navColor1: "black",
  logoHoverSize: "10px",
  logoHoverColor: "#B4C6A6",
  link1Text: "HOME",
  link2Text: "PRODUCTS",
  link3Text: "CONTACT",
  link4Text: "ABOUT",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(255, 255, 255,1)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#B4C6A6",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(255, 255, 255,1)",
  searchIconColor: "rgba(255, 255, 255,1)",
  cartIconColor: "rgba(255, 255, 255,1)",
  profileIconColorHover: "#B4C6A6",
  searchIconColorHover: "#B4C6A6",
  cartIconColorHover: "#B4C6A6",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
