import { gql } from '@apollo/client';

// TODO: remove walletAddress, change JWT token to use accountId
export const UPDATE_USER_NAME = gql`
  mutation UpdateUserName(
    $walletAddress: String!
    $accountId: ObjectId!
    $name: String!
  ) {
    updateUserName(walletAddress: $walletAddress, accountId: $accountId, name: $name) {
      _id
      walletAddress
      name
    }
  }
`;
