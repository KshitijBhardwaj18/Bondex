use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

pub use constants::*;
pub use state::*;
pub use instructions::*;

declare_id!("xweEBdPhtPY7J2DpmPkjFYRw4dA6PNMXUgKy6BQcn3q");

#[program]
pub mod bondex {
    use super::*;
  

    pub fn initialize_marketplace(ctx: Context<InitializeMarketplace>) -> Result<()> {
        initialize_marketplace::initialize_market(ctx)
    }

    pub fn issue_bond(
        ctx: Context<IssueBond>,
        name: String,
        face_value: u64,
        maturity_time: u64,
        coupon: u64,
        interest_intervals: u64,
        total_supply: u64,
        master_nft_address: Pubkey,
    ) -> Result<()> {
        issuebond(
            ctx,
            name,
            face_value,
            maturity_time,
            coupon,
            interest_intervals,
            total_supply,
            master_nft_address,
        )
    }

    pub fn list_bond(ctx: Context<ListBond>) -> Result<()> {
        list_bond::listbond(ctx)
    }

    pub fn buy_bond(
        ctx: Context<BuyBond>,
        market_listing: Pubkey,
        issuer: Pubkey,
        amount: u64
    ) -> Result<()> {
        buybond(ctx, market_listing,issuer, amount)
    }
}