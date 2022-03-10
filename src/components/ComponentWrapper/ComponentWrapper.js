import {useState, Fragment} from "react";
import SuccessMessage from "../ErrorContainers/SuccessMessage/SuccessMessage";

const ComponentWrapper = ({Component}) => {
    const [message, setMessage] = useState("");
    console.log(message);
    return (
        <Fragment>
            {message !== "" ? <SuccessMessage message={message}/> : ""}
            <Component setMessage={setMessage}/>
        </Fragment>
    )
}

export default ComponentWrapper;
