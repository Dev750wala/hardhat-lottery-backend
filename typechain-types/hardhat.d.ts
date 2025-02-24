/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AutomationCompatibleInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomationCompatibleInterface__factory>;
    getContractFactory(
      name: "ConfirmedOwner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConfirmedOwner__factory>;
    getContractFactory(
      name: "ConfirmedOwnerWithProposal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "IERC677Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC677Receiver__factory>;
    getContractFactory(
      name: "IOwnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOwnable__factory>;
    getContractFactory(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkTokenInterface__factory>;
    getContractFactory(
      name: "IVRFCoordinatorV2Plus",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVRFCoordinatorV2Plus__factory>;
    getContractFactory(
      name: "IVRFMigratableConsumerV2Plus",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVRFMigratableConsumerV2Plus__factory>;
    getContractFactory(
      name: "IVRFSubscriptionV2Plus",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVRFSubscriptionV2Plus__factory>;
    getContractFactory(
      name: "VRFV2PlusClient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFV2PlusClient__factory>;
    getContractFactory(
      name: "SubscriptionAPI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SubscriptionAPI__factory>;
    getContractFactory(
      name: "VRFConsumerBaseV2Plus",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFConsumerBaseV2Plus__factory>;
    getContractFactory(
      name: "VRFCoordinatorV2_5Mock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFCoordinatorV2_5Mock__factory>;
    getContractFactory(
      name: "Raffle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Raffle__factory>;

    getContractAt(
      name: "AutomationCompatibleInterface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomationCompatibleInterface>;
    getContractAt(
      name: "ConfirmedOwner",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ConfirmedOwner>;
    getContractAt(
      name: "ConfirmedOwnerWithProposal",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "IERC677Receiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC677Receiver>;
    getContractAt(
      name: "IOwnable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOwnable>;
    getContractAt(
      name: "LinkTokenInterface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkTokenInterface>;
    getContractAt(
      name: "IVRFCoordinatorV2Plus",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVRFCoordinatorV2Plus>;
    getContractAt(
      name: "IVRFMigratableConsumerV2Plus",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVRFMigratableConsumerV2Plus>;
    getContractAt(
      name: "IVRFSubscriptionV2Plus",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVRFSubscriptionV2Plus>;
    getContractAt(
      name: "VRFV2PlusClient",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFV2PlusClient>;
    getContractAt(
      name: "SubscriptionAPI",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SubscriptionAPI>;
    getContractAt(
      name: "VRFConsumerBaseV2Plus",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFConsumerBaseV2Plus>;
    getContractAt(
      name: "VRFCoordinatorV2_5Mock",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFCoordinatorV2_5Mock>;
    getContractAt(
      name: "Raffle",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Raffle>;

    deployContract(
      name: "AutomationCompatibleInterface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AutomationCompatibleInterface>;
    deployContract(
      name: "ConfirmedOwner",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwner>;
    deployContract(
      name: "ConfirmedOwnerWithProposal",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    deployContract(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AggregatorV3Interface>;
    deployContract(
      name: "IERC677Receiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC677Receiver>;
    deployContract(
      name: "IOwnable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnable>;
    deployContract(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LinkTokenInterface>;
    deployContract(
      name: "IVRFCoordinatorV2Plus",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVRFCoordinatorV2Plus>;
    deployContract(
      name: "IVRFMigratableConsumerV2Plus",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVRFMigratableConsumerV2Plus>;
    deployContract(
      name: "IVRFSubscriptionV2Plus",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVRFSubscriptionV2Plus>;
    deployContract(
      name: "VRFV2PlusClient",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VRFV2PlusClient>;
    deployContract(
      name: "SubscriptionAPI",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SubscriptionAPI>;
    deployContract(
      name: "VRFConsumerBaseV2Plus",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VRFConsumerBaseV2Plus>;
    deployContract(
      name: "VRFCoordinatorV2_5Mock",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VRFCoordinatorV2_5Mock>;
    deployContract(
      name: "Raffle",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Raffle>;

    deployContract(
      name: "AutomationCompatibleInterface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AutomationCompatibleInterface>;
    deployContract(
      name: "ConfirmedOwner",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwner>;
    deployContract(
      name: "ConfirmedOwnerWithProposal",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    deployContract(
      name: "AggregatorV3Interface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AggregatorV3Interface>;
    deployContract(
      name: "IERC677Receiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC677Receiver>;
    deployContract(
      name: "IOwnable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnable>;
    deployContract(
      name: "LinkTokenInterface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LinkTokenInterface>;
    deployContract(
      name: "IVRFCoordinatorV2Plus",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVRFCoordinatorV2Plus>;
    deployContract(
      name: "IVRFMigratableConsumerV2Plus",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVRFMigratableConsumerV2Plus>;
    deployContract(
      name: "IVRFSubscriptionV2Plus",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVRFSubscriptionV2Plus>;
    deployContract(
      name: "VRFV2PlusClient",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VRFV2PlusClient>;
    deployContract(
      name: "SubscriptionAPI",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SubscriptionAPI>;
    deployContract(
      name: "VRFConsumerBaseV2Plus",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VRFConsumerBaseV2Plus>;
    deployContract(
      name: "VRFCoordinatorV2_5Mock",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VRFCoordinatorV2_5Mock>;
    deployContract(
      name: "Raffle",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Raffle>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
