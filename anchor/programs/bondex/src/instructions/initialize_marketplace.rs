use anchor_lang::prelude::*;

use crate::state::MarketRegistry;


#[derive(Accounts)]
pub struct InitializeMarketplace<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(init,space=8+MarketRegistry::INIT_SPACE, payer = admin,  seeds = [b"registrybondex"], bump )]
    pub marketregistry: Account<'info, MarketRegistry>,

    system_program: Program<'info,System>
}

pub fn initialize_market(ctx: Context<InitializeMarketplace>) -> Result<()> {
    let marketregistry = &mut ctx.accounts.marketregistry;
    marketregistry.admin = *ctx.accounts.admin.key;
    marketregistry.active = true;

    Ok(())
    
}