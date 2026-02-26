export const Supplier = ({id,name,phone_number,email,details}) => {

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phone_number}</td>
            <td>{email}</td>
            <td>{details}</td>
        </tr>
    );
    
}; 