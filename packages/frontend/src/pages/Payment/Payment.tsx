import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';
import { gql } from "apollo-boost";
import {  useMutation } from '@apollo/react-hooks';
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "../../schemaTypes";


const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscriptionMutation($source: String!, $id: String!) {
    createSubcription(source: $source, id: $id) {
      id
      email
    }
  }
`;

function Payment() {

  const [pay] = useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CREATE_SUBSCRIPTION);

  const history = useHistory();

  function handleToken(accessToken: any) {
    pay({variables: {source:"", id:"5ec0c48abba2e8914e1c35ab"}});
    history.push('/login');
  }

  return (
    <StripeCheckout
      stripeKey="pk_test_uAMIN59vqRuzrMicoGTAyacQ00EKaAXDAl"
      token={handleToken}
      billingAddress
      shippingAddress
      amount={100 * 100}
      name="product.name"
    />
  );
}

export default Payment;