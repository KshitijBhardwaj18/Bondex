use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct MarketRegistry{
    pub admin: Pubkey,
    #[max_len(100)]
    pub listings: Vec<Pubkey>,
    pub active: bool
}

