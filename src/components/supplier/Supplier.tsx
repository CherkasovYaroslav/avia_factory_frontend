import { useNavigate } from "react-router-dom";

export const Supplier = ({id,name,phone_number,email,details}) => {

    const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/suppliers/${id}`);
  };
    return (
        <tr onClick={
            () => {
                handleClick(id)
            }
        }>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phone_number}</td>
            <td>{email}</td>
            <td>{details}</td>
        </tr>
    );
    
}; 