import { createBrowserHistory } from "history";
import { clearMessage } from "../actions/message";
import { useDispatch } from "react-redux";

const history = createBrowserHistory();

// Get the current location.
const location = history.location

// Listen for changes to the current location.
//TODO 이슈해결
/*
const unlisten = history.listen((location, action) => {
    //Do your logic here and dispatch if needed
    const dispatch = useDispatch();
    dispatch(clearMessage()); // clear message when changing location
})
*/


export default history;
