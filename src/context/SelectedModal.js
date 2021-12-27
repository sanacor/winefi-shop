import { createContext } from "react";

const ModalContext = createContext({
    view: false,
    setView: () => {}
  });
export default ModalContext;
