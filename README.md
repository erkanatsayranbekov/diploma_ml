# Frontend Assessment

This assessment should take no more than 2 hours. We’re looking to get an understanding of how you code. We are not looking for a fully polished application that has no bugs.

## Assessment

Please build a web app using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) which should have 2 pages:

- **Transactions**
    - Should be a dynamic route based on an address hash. Please support Ethereum and Polygon addresses. You can use Etherscan or Polygonscan to find sample address(es).
        - Should default to a sample address hash for this demo.
    - Should list all the transactions of the address to show the `amount`, `timestamp` (formatted to human readable), `a link to see more details`, and any other details that you find relevant. If there are hundreds of transactions feel free to limit it to less than 100.
    - Should show the address’ `current balance`.
    - Should allow for the user to `sort the data` by amount or timestamp.
- **Transaction details**
    - Should be a dynamic route based on a transaction hash. Please support Ethereum and Polygon transactions. You can use Etherscan or Polygonscan to find sample hash(es).
    - Should show the `transaction hash with a link` to a block explorer (Etherscan, Polygonscan, or others).
    - Should show the `amount`, `timestamp` (formatted to human readable), `confirmation status` of the transaction (loading, successful, failed), the `transaction fee` if/when the transaction is successful, and any other details that you find relevant.

## **Requirements:**

- Please host the project on Github or another code sharing tool and deploy the app to Vercel, Netlify, or any other hosting solution of your choice.
- Please style your application. It should be responsive and work on small and large screens (mobile and 4k).