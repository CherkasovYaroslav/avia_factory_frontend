export const Client = ({id,name,phone_number,email,address}) => {

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phone_number}</td>
            <td>{email}</td>
            <td>{address}</td>
        </tr>
    );
    
}; 