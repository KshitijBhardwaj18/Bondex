use anchor_lang::{ prelude::*, solana_program::system_instruction };

use crate::state::{ Bond, Vault };

#[derive(Accounts)]
pub struct IssueBond<'info> {
    #[account(mut)]
    issuer: Signer<'info>,

    #[account(
        init,
        payer = issuer,
        space = 8 + Vault::INIT_SPACE,
        seeds = [b"vault", issuer.key().as_ref()],
        bump
    )]
    vault: Account<'info, Vault>,

    #[account(
        init,
        payer = issuer,
        space = 8 + Bond::INIT_SPACE,
        seeds = [b"bond", issuer.key().as_ref()],
        bump
    )]
    bond: Account<'info, Bond>,

    system_program: Program<'info, System>,
}

pub fn issuebond(
    ctx: Context<IssueBond>,
    name: String,
    face_value: u64,
    maturity_time: u64,
    coupon: u64,
    interest_intervals: u64,
    total_supply: u64,
    master_nft_address: Pubkey
) -> Result<()> {
    let collateral = 2 * face_value * total_supply;

    let transfer_instruction = system_instruction::transfer(
        &ctx.accounts.issuer.key(),
        &ctx.accounts.vault.key(),
        collateral
    );

    anchor_lang::solana_program::program::invoke(
        &transfer_instruction,
        &[
            ctx.accounts.issuer.to_account_info(),
            ctx.accounts.vault.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ]
    )?;

    let bond = &mut ctx.accounts.bond;
    bond.name = name;
    bond.issuer = *ctx.accounts.issuer.key;
    bond.face_value = face_value;
    bond.maturity_time = maturity_time;
    bond.coupon = coupon;
    bond.interest_intervals = interest_intervals;
    bond.total_supply = total_supply;
    bond.sold = 0;
    bond.completed = 0;
    bond.master_nft_address = master_nft_address;

    Ok(())
}
