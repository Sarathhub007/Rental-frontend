import { Link } from "react-router-dom";

function Hello(){
    return(
        <>
        <h1>Hello</h1>
        <Link to={"\login"}>Navigate to signin</Link>
        </>
    );
}
export default Hello
