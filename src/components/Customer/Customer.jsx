export default function Customer() {
    return (
        <>
            <h1>Step Two: Customer Information</h1>
        <form>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" placeholder="Address"/>
            <input type="text" name="city" placeholder="City"/>
            <input type="text" name="zip" placeholder="Zip"/>
            
            <input type="radio" id="pickup" name="order_type" value="Pickup"></input>
            {/* <label for="pickup">Pickup</label><br></br> */}
            <input type="radio" id="delivery" name="order_type" value="Delivery"></input>
            {/* <label for="delivery">Delivery</label><br></br> */}
        </form>

            
        

        </>
    );
}

