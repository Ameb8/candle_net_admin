export default function OrderDetails({ order }) {
    return (
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <strong>Order Code:</strong> {order.order_code}
            </li>
            <li className="list-group-item">
                <strong>Email:</strong> {order.email || 'None'}
            </li>
            <li className="list-group-item">
                <strong>Total:</strong> ${(order.total_amount / 100).toFixed(2)}
            </li>
        </ul>
    );
}
