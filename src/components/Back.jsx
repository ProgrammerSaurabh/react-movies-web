import { Link } from "react-router-dom";

const Back = (props) => {
  return (
    <Link to={props.to} className="btn btn-sm btn-secondary mb-2">
      {props.children}
    </Link>
  );
};

export default Back;
