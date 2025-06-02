import { ToastContainer } from "react-toastify";

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      closeButton={true}
      autoClose={3000}
      limit={3}
    />
  );
}
