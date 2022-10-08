import { gql } from '@apollo/client/core';
import { apolloClient } from '../apolloClient';
import { getAddressFromSigner } from '../ethers.service';
import { prettyJSON } from '../helpers';

const GET_FOLLOWING = `
  query($request: FollowingRequest!) {
    following(request: $request) { 
			    items {
            profile {
              id
              name
              bio
              attributes {
                displayType
                traitType
                key
                value
              }
              followNftAddress
              metadata
              isDefault
              handle
              picture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
                  }
                  medium {
                    url
                    width
                    height
                    mimeType
                  }
                  small {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
              ownedBy
              stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
              }
              followModule {
                ... on FeeFollowModuleSettings {
                  type
                  recipient
                }
            }
          }
        }
       pageInfo {
          prev
          next
          totalCount
       }
		}
  }
`;

const followingRequest = (walletAddress) => {
  return apolloClient.query({
    query: gql(GET_FOLLOWING),
    variables: {
      request: {
        address: walletAddress,
        limit: 20,
      },
    },
  });
};

export const getContacts = async (address) => {
  if (!address) {
    address = await getAddressFromSigner();
  }
  console.log('following: address', address);

  const result = await followingRequest(address);
  prettyJSON('following: result', result.data);

  return result.data;
};