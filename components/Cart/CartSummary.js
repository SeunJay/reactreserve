import React, { useState, useEffect } from "react";
import { Divider, Segment, Button } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

function CartSummary({ products }) {
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setIsCartEmpty(products.length === 0);
  }, [products]);

  let total = calculateCartTotal(products);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub Total:</strong> ${cartAmount}
        <Button
          disabled={isCartEmpty}
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
        />
      </Segment>
    </>
  );
}

export default CartSummary;
