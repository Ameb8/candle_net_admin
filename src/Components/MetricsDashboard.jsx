import { Container, Card } from 'react-bootstrap';
import OrdersOverTime from './OrdersOverTime';
import OrdersByCategory from './OrdersByCategory';

export default function MetricsDashboard() {
    return (
        <Container className="my-4">
            <Card className="mb-4">
                <Card.Body>
                    <OrdersOverTime />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <OrdersByCategory />
                </Card.Body>
            </Card>
        </Container>
    );
}