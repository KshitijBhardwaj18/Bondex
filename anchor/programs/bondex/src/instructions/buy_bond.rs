use anchor_lang::{
    prelude::*,
    solana_program::{ native_token::LAMPORTS_PER_SOL, program::invoke, system_instruction },
};

use crate::state::{ Bond, MarketListing };

#[error_code]
pub enum CustomError {
    #[msg("The buyer does not have sufficient funds.")]
    InsufficientFunds,
    #[msg("The required amount is invalid.")]
    InvalidAmount,
}



#[derive(Accounts)]
#[instruction(market_listing: Pubkey)]
pub struct BuyBond<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut, seeds = [b"marketlisting", market_listing.issuer.as_ref()], bump)]
    pub market_listing: Account<'info, MarketListing>,

    #[account(mut, seeds = [b"bond", market_listing.issuer.as_ref()], bump)]
    pub bond: Account<'info, Bond>,
    /// CHECK: This account is safe because it is derived from the market_listing account
    #[account(mut,address = market_listing.issuer)]
    pub issuer: AccountInfo<'info>,

    system_program: Program<'info, System>,
}

pub fn buybond(ctx: Context<BuyBond>, _market_listing: Pubkey,_issuer: Pubkey, amount: u64) -> Result<()> {
    // let issuer = market_listing.issuer;
    let bond: &Account<'_, Bond> = &ctx.accounts.bond;

    // if ctx.accounts.buyer.key() == issuer.key() {
    //     return Err(ProgramError::InvalidArgument.into());
    // }

    let market_listing = &mut ctx.accounts.market_listing;

    let required_amount = bond.face_value * amount * LAMPORTS_PER_SOL;

    msg!("Issuer: {:?}", ctx.accounts.issuer.key());

    let transfer_instruction = system_instruction::transfer(
        &ctx.accounts.buyer.key(),
        
        &ctx.accounts.issuer.key(),
        required_amount
    );
    msg!("Issuer: {:?}", ctx.accounts.issuer.key());
    invoke(
        &transfer_instruction,
        &[ctx.accounts.buyer.to_account_info(),ctx.accounts.issuer.to_account_info(), ctx.accounts.system_program.to_account_info()]
    )?;


    market_listing.sold += 1;
   

    Ok(())
}
