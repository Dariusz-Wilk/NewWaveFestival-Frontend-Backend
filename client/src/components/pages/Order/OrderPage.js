import { Container } from 'reactstrap';
import OrderTicketForm from '../../features/OrderTicketForm/OrderTicketForm';

const Order = () => (
	<Container>
		<h1>Order a tickets</h1>
		<OrderTicketForm />
	</Container>
);

export default Order;
