import React from "react";
import {
    HomeDiv,
    HomeTitleTag,
    HomeTitleContainer,
} from "./HomeComponents";
import {useAuth} from "../authorization/AuthProvider";

const HomePage = () => {
    const {logout} = useAuth();

    return (
        <HomeDiv>
            <HomeTitleContainer>
                <HomeTitleTag>Status:</HomeTitleTag>
                <button onClick={logout}>Logout</button>
            </HomeTitleContainer>
        </HomeDiv>
    );

}
export default HomePage;
