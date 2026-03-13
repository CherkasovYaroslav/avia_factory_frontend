interface ClientProps {
    id: number | string;
    name: string;
    phone_number: string;
    email: string;
    address: string;
}

export const Client = ({ id, name, phone_number, email, address }: ClientProps) => {

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