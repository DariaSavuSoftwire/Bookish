import React from  "react";
import {
    HomeDiv,
    HomeTitleTag,
    HomeTitleContainer,
} from "./HomeComponents";
import {useAuth} from "../authorization/AuthProvider";

const HomePage = () => {
    const authentication = useAuth();

    return (
        <HomeDiv>
            <HomeTitleContainer>
                <HomeTitleTag>Status:</HomeTitleTag>
                <button onClick={authentication.logout}>Logout</button>
            </HomeTitleContainer>
        </HomeDiv>
    );

}
export default HomePage;
