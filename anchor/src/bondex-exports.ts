// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import BondexIDL from '../target/idl/bondex.json'
import type { Bondex } from '../target/types/bondex'

// Re-export the generated IDL and type
export { Bondex, BondexIDL }

// The programId is imported from the program IDL.
export const BONDEX_PROGRAM_ID = new PublicKey(BondexIDL.address)

// This is a helper function to get the Bondex Anchor program.
export function getBondexProgram(provider: AnchorProvider) {
  return new Program(BondexIDL as Bondex, provider)
}

// This is a helper function to get the program ID for the Bondex program depending on the cluster.
export function getBondexProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Bondex program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return BONDEX_PROGRAM_ID
  }
}
