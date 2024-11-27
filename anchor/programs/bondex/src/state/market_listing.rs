use anchor_lang::prelude::*;


#[account]
#[derive(InitSpace)]
pub struct MarketListing {
    pub issuer: Pubkey,
    pub active: bool,
    pub maximum_supply:u64,
    pub sold: u64,
    pub bond: Pubkey,
    pub master_nft_address: Pubkey
}