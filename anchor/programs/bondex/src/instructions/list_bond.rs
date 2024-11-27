use anchor_lang::prelude::*;

use crate::state::{  Bond, MarketListing, MarketRegistry };

#[derive(Accounts)]
pub struct ListBond<'info> {
    #[account(mut)]
    pub issuer: Signer<'info>,

    #[account(seeds = [b"bond", issuer.key().as_ref()], bump)]
    pub bond: Account<'info, Bond>,

    #[account(
        init,
        payer = issuer,
        space = 8 + MarketListing::INIT_SPACE,
        seeds = [b"marketlisting", issuer.key().as_ref()],
        bump
    )]
    pub market_listing: Account<'info, MarketListing>,

    #[account(mut,seeds = [b"registrybondex"], bump)]
    pub market_registry: Account<'info, MarketRegistry>,

    system_program: Program<'info, System>,
}

pub fn listbond(ctx: Context<ListBond>) -> Result<()> {
    let market_listing_key = *ctx.accounts.market_listing.to_account_info().key;
    let bond_key = *ctx.accounts.bond.to_account_info().key;
    let master_nft_address = ctx.accounts.bond.master_nft_address;

    let market_listing = &mut ctx.accounts.market_listing;
    let market_registry = &mut ctx.accounts.market_registry;

    market_registry.listings.push(market_listing_key);

    market_listing.issuer = *ctx.accounts.issuer.key;
    market_listing.active = true;
    market_listing.maximum_supply = ctx.accounts.bond.total_supply;
    market_listing.bond = bond_key;
    market_listing.master_nft_address = master_nft_address;

    Ok(())
}
