import './Checkout.css';


function Checkout () {
    return (
    <>
        <h1>Step Three: Checkout</h1>
        <p>PUT CUSTOMER ADDRESS HERE</p>
        <p className="DOM-right">PUT PICKUP OR DELIVERY STATUS HERE, RIGHT SIDE OF DOM</p>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>PIZZA 1 NAME HERE</td>
                <td>PIZZA 1 COST HERE</td>
            </tr>
            <tr>
                <td>PIZZA 2 NAME HERE</td>
                <td>PIZZA 2 COST HERE</td>
            </tr>
        </tbody>
        </table>
        <p className="DOM-right">PUT TOTAL COST OF ORDER HERE, RIGHT SIDE OF DOM</p>
        <br/><br/><br/>
        <button className="DOM-right">CHECKOUT</button>
    </>
    )
}

export default Checkout;