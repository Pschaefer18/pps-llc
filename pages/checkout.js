import React, { useState, useEffect } from "react";
import Head from "next/head";
import {CheckoutPage} from "../components";
const checkout = () => {
  return (
  <>
    <Head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    </Head>
    <body className="checkout-body">
      <CheckoutPage />
    </body>
  </>
  )
}

export default checkout;