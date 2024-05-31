import React from 'react'
import styled from 'styled-components'
import myImage from '../../images/mak1.jpg';


const Header = () => {
    return <MainContainer><h1>Welcome To Movie Library </h1></MainContainer>;
    
};



export default Header;

//main container
const MainContainer =styled.header`
background-image: url(${myImage});
background-repeat: no-repeat;
background-size: cover;
background-position: center;
    height:30rem;
    
    
    h1{
        transform:translate(-50%,-50%);
        color:#f4a460;
        font-weight:800;
        position:absolute;
        top:45%;
        left:50%
    }
`;
