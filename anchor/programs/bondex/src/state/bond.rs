use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Bond{
    #[max_len(12)]
    pub name: String,
    pub issuer:  Pubkey,
    pub face_value: u64,
    pub maturity_time: u64,
    pub coupon: u64,
    pub interest_intervals: u64,
    pub total_supply: u64,
    pub sold: u64,
    pub completed: u64,
    pub master_nft_address: Pubkey    
}
