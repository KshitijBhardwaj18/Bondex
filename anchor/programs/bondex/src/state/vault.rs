use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Vault {
    pub owner: Pubkey, // Owner is the issuer (can be different from the signer)
    pub balance: u64, // Track the amount of collateral in the vault
    pub is_initialized: bool
}