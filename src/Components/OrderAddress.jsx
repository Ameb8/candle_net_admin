export default function OrderAddress({ address }) {
    return (
        <div>
            <p><strong>{address.full_name}</strong></p>
            <p>{address.street_address}{address.apartment_address ? `, ${address.apartment_address}` : ''}</p>
            <p>{address.city}, {address.state}, {address.postal_code}</p>
            <p>{address.country}</p>
            {address.phone_number && <p>Phone: {address.phone_number}</p>}
        </div>
    );
}
