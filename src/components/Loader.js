import { SpinnerDiamond } from "spinners-react";

function Loader() {
    return (
    <SpinnerDiamond 
        size={63}
        thickness={159}
        speed={100}
        color="rgba(181, 89, 206, 1)"
        secondaryColor="rgba(181, 89, 206, 0.19)"
        />
    );
}

export default Loader;