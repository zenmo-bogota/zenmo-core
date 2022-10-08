import { ethers } from 'ethers';
import { LENS_HUB_CONTRACT } from '../../config';
import { getSigner } from '../../services/ethers.service';
import lensHubABI from './abis/lens-hub-abi.json';

// lens contract info can all be found on the deployed
// contract address on polygon.
export const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, lensHubABI, getSigner());