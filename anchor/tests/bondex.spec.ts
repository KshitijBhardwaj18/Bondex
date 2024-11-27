import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Bondex } from "../target/types/bondex";
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import fs from "fs";

import {
  createNft,
  fetchDigitalAsset,
  mplTokenMetadata,
  CreateMasterEditionV3InstructionAccounts,
  createMetadataAccountV3,
  createMasterEditionV3
} from "@metaplex-foundation/mpl-token-metadata";

// import {
//   airdropIfRequired,
//   getExplorerLink,
//   getKeypairFromFile,
// } from "@solana-developers/helpers";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import {
  generateSigner,
  keypairIdentity,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";

const IDL = require("../target/idl/bondex.json");
const bondexAddress = new PublicKey(
  "xweEBdPhtPY7J2DpmPkjFYRw4dA6PNMXUgKy6BQcn3q"
);

// Load the admin keypair from the file
const adminKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync("admin-keypair.json", "utf-8")))
);
const issuerKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync("issuer1.json", "utf-8")))
);
const buyerKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync("buyer.json", "utf-8")))
);

const marketRegistryAccount = new PublicKey(
  "FcwM9XH24FTUvincHDiVEVd3SJmg2L3Trt5r1ao5cuSR"
);

const marketListing = new PublicKey(
  "GgS6JHC6NyK61gtDPQszgnYDtRycVJ1wU1qXZZRuUKSo"
);

console.log("Admin Public Key:", adminKeypair.publicKey.toBase58());

describe("bondex", () => {
  let provider: anchor.AnchorProvider;
  // let provider: BankrunProvider;
  let program: Program<Bondex>;
  let connection: Connection;

  beforeAll(async () => {
    // const context = await startAnchor(
    //   "",
    //   [{ name: "bondex", programId: bondexAddress }],
    //   []
    // );
    // provider = new BankrunProvider(context);
    // connection = new Connection("http://127.0.0.1:8899", "confirmed");
    // program = new Program<Bondex>(IDL, provider);

    connection = new Connection("http://127.0.0.1:8899", "confirmed");
    provider = new anchor.AnchorProvider(
      connection,
      new anchor.Wallet(adminKeypair),
      {
        preflightCommitment: "confirmed",
      }
    );
    anchor.setProvider(provider);
    program = anchor.workspace.Bondex as Program<Bondex>;
  });

  // it("Initialize Marketplace", async () => {
  //   const seeds = [Buffer.from("registrybondex")];

  //   // Check the initial balance of the admin account
  //   const initialBalance = await connection.getBalance(adminKeypair.publicKey);
  //   console.log(
  //     "Initial Admin Balance:",
  //     initialBalance / LAMPORTS_PER_SOL,
  //     "SOL"
  //   );

  //   // Airdrop SOL to the admin account if needed
  //   // if (initialBalance < 2 * LAMPORTS_PER_SOL) {
  //   //   const airdropSignature = await connection.requestAirdrop(
  //   //     adminKeypair.publicKey,
  //   //     2 * LAMPORTS_PER_SOL
  //   //   );
  //   //   const latestBlockhash = await connection.getLatestBlockhash();
  //   //   await connection.confirmTransaction({
  //   //     signature: airdropSignature,
  //   //     blockhash: latestBlockhash.blockhash,
  //   //     lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  //   //   });

  //   //   // Check the balance after airdrop
  //   //   const newBalance = await connection.getBalance(adminKeypair.publicKey);
  //   //   console.log("New Admin Balance:", newBalance / LAMPORTS_PER_SOL, "SOL");
  //   // }

  //   // Generate the PDA for market_registry
  //   const [marketRegistryAccount, marketRegistryBump] =
  //     PublicKey.findProgramAddressSync(seeds, bondexAddress);
  //   console.log(
  //     "Market Registry PDA:",
  //     marketRegistryAccount.toBase58(),
  //     "Bump:",
  //     marketRegistryBump
  //   );

  //   // async function getBalance(
  //   //   connection: anchor.web3.Connection,
  //   //   publicKey: anchor.web3.PublicKey
  //   // ): Promise<number> {
  //   //   return await connection.getBalance(publicKey);
  //   // }

  //   // async function airdropLamports(connection: anchor.web3.Connection, publicKey: anchor.web3.PublicKey, amount: number) {
  //   //   const signature = await connection.requestAirdrop(publicKey, amount);
  //   //   await connection.confirmTransaction(signature);
  //   // }

  //   // const adminBalance = await getBalance(connection, adminKeypair.publicKey);
  //   // const marketRegistryBalance = await getBalance(
  //   //   connection,
  //   //   marketRegistryAccount
  //   // );

  //   // console.log(
  //   //   "Admin Balance:",
  //   //   adminBalance / anchor.web3.LAMPORTS_PER_SOL,
  //   //   "SOL"
  //   // );
  //   // console.log(
  //   //   "Market Registry Balance:",
  //   //   marketRegistryBalance / anchor.web3.LAMPORTS_PER_SOL,
  //   //   "SOL"
  //   // );

  //   // console.log(
  //   //   "Admin Balance:",
  //   //   adminBalance / anchor.web3.LAMPORTS_PER_SOL,
  //   //   "SOL"
  //   // );
  //   // console.log(
  //   //   "Market Registry Balance:",
  //   //   marketRegistryBalance / anchor.web3.LAMPORTS_PER_SOL,
  //   //   "SOL"
  //   // );

  //    // Adjust space as needed
  //     // await airdropLamports(connection, marketRegistryAccount, 2*LAMPORTS_PER_SOL);
  //     // console.log("Airdropped rent-exemption amount to Market Registry Account");

  //   // Call the initialize instruction
  //   try {
  //     await program.methods
  //       .initializeMarketplace()
  //       .accountsStrict({
  //         admin: adminKeypair.publicKey,
  //         marketregistry: marketRegistryAccount,
  //         systemProgram: SystemProgram.programId,
  //       } )
  //       .signers([adminKeypair])
  //       .rpc();

  //     console.log("Initialize Marketplace transaction successful");
  //   } catch (error) {
  //     if (error instanceof anchor.web3.SendTransactionError) {
  //       console.error(
  //         "Error during Initialize Marketplace transaction:",
  //         error
  //       );
  //       console.error("Transaction logs:", error.logs);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //   }

  //   try {
  //     const account = await program.account.marketRegistry.fetch(
  //       marketRegistryAccount
  //     );
  //     console.log("Market Registry account data:", account);
  //   } catch (error) {
  //     if (error instanceof anchor.web3.SendTransactionError) {
  //       console.error(
  //         "Error during Initialize Marketplace transaction:",
  //         error
  //       );
  //       console.error("Transaction logs:", error.logs);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //   }
  // });

  //   it("Issues a bond", async () => {

  // try{
  //   await program.methods
  //       .issueBond(
  //         "testbond-1",
  //         new anchor.BN(100),
  //         new anchor.BN(1),
  //         new anchor.BN(2),
  //         new anchor.BN(4),
  //         new anchor.BN(50),
  //         new PublicKey("xweEBdPhtPY7J2DpmPkjFYRw4dA6PNMXUgKy6BQcn3q")
  //       )
  //       .accountsPartial({ issuer: issuerKeypair.publicKey })
  //       .signers([issuerKeypair])
  //       .rpc();
  // }catch(e){ console.log(`Error issuing the bond: ${e}`)}

  //     const seeds = [Buffer.from("bond"), issuerKeypair.publicKey.toBuffer()];

  //     const [bondAccount, bump] = PublicKey.findProgramAddressSync(
  //       seeds,
  //       bondexAddress
  //     );
  //     console.log("Bond Account:", bondAccount.toBase58(), "Bump:", bump);

  //     const account = await program.account.bond.fetch(bondAccount);
  //     console.log("Bond Account Data:", account);
  //   });
  // });

  // it("Issue and list the bond", async () => {
  //   // const issuerKeypair = Keypair.generate();
  //   // console.log("Issuer Public Key:", issuerKeypair.publicKey.toBase58());

  //   const issuerBanlance = await connection.getBalance(issuerKeypair.publicKey);
  //   console.log("Issuer Balance:", issuerBanlance / LAMPORTS_PER_SOL, "SOL");

  //   // if (issuerBanlance < 2 * LAMPORTS_PER_SOL) {
  //   //   const airdropSignature = await connection.requestAirdrop(
  //   //     issuerKeypair.publicKey,
  //   //     2 * LAMPORTS_PER_SOL
  //   //   );
  //   //   const latestBlockhash = await connection.getLatestBlockhash();
  //   //   await connection.confirmTransaction({
  //   //     signature: airdropSignature,
  //   //     blockhash: latestBlockhash.blockhash,
  //   //     lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  //   //   });
  //   //   const newBalance = await connection.getBalance(issuerKeypair.publicKey);
  //   //   console.log("New Issuer Balance:", newBalance / LAMPORTS_PER_SOL, "SOL");

  //   try {
  //     await program.methods
  //       .issueBond(
  //         "testbond-1",
  //         new anchor.BN(1),
  //         new anchor.BN(1),
  //         new anchor.BN(2),
  //         new anchor.BN(4),
  //         new anchor.BN(50),
  //         new PublicKey("xweEBdPhtPY7J2DpmPkjFYRw4dA6PNMXUgKy6BQcn3q")
  //       )
  //       .accountsPartial({ issuer: issuerKeypair.publicKey })
  //       .signers([issuerKeypair])
  //       .rpc();
  //   }catch (e) {
  //     console.error(`Error issuing the bond: ${e}`);
  //     if (e instanceof anchor.web3.SendTransactionError) {
  //       console.error("Transaction logs:", e.logs);
  //     }
  //   }

  //   const seeds = [Buffer.from("bond"), issuerKeypair.publicKey.toBuffer()];
  //   const [bondAccount, bump] = await PublicKey.findProgramAddressSync(
  //     seeds,
  //     bondexAddress
  //   );
  //   console.log("Bond Account:", bondAccount.toBase58(), "Bump:", bump);

  //   const account = await program.account.bond.fetch(bondAccount);
  //   console.log("Bond Account Data:", account);

  //   try {
  //     await program.methods
  //       .listBond()
  //       .accountsPartial({
  //         issuer: issuerKeypair.publicKey,
  //         marketRegistry: marketRegistryAccount,
  //       })
  //       .signers([issuerKeypair])
  //       .rpc();
  //   } catch (e) {
  //     console.log(`Error listing the bond: ${e}`);
  //     if (e instanceof anchor.web3.SendTransactionError) {
  //       console.error("Transaction logs:", e.logs);
  //     }
  //   }
  //   const listedBond = await program.account.marketRegistry.fetch(
  //     marketRegistryAccount
  //   );
  //   console.log("Market Registry Data:", listedBond);
  // });

  //   it("Buy the bond", async () => {
  //     // const buyer = Keypair.generate();
  //     // console.log("Buyer Public Key:", buyer.publicKey.toBase58());

  //     // const buyerBalance = await connection.getBalance(buyer.publicKey);
  //     // console.log("Buyer Balance:", buyerBalance / LAMPORTS_PER_SOL, "SOL");

  //     // if(buyerBalance < 2 * LAMPORTS_PER_SOL){
  //     //   const airdropSignature = await connection.requestAirdrop( buyer.publicKey,  2 * LAMPORTS_PER_SOL);
  //     //   const latestBlockhash = await connection.getLatestBlockhash();
  //     //   await connection.confirmTransaction({
  //     //     signature: airdropSignature,
  //     //     blockhash: latestBlockhash.blockhash,
  //     //     lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  //     //   });
  //     // }

  //     const listing = await program.account.marketListing.fetch(marketListing);
  //     const bond = listing.bond;
  //     console.log("Bond Data:", bond);

  //     const marketIssuer = listing.issuer;
  //     console.log("Market Issuer:", marketIssuer);

  //   console.log(issuerKeypair.publicKey)

  //     try {
  //       await program.methods
  //         .buyBond(
  //           new PublicKey(marketListing),
  //           new PublicKey(marketIssuer),
  //           new anchor.BN(1)
  //         )
  //         .accountsStrict({buyer: buyerKeypair.publicKey,issuer: new PublicKey(marketIssuer) ,marketListing: new PublicKey(marketListing), bond: new PublicKey(bond), systemProgram: SystemProgram.programId})
  //         .signers([buyerKeypair])
  //         .rpc();
  //     }  catch (e) {
  //       console.log(`Error buying the bond: ${e}`);
  //       if (e instanceof anchor.web3.SendTransactionError) {
  //         console.error("Transaction logs:", e.logs);
  //       }
  //     }

  //     const marketListin = await program.account.marketListing.fetch(marketListing);
  //     console.log("Market Listing Data:", marketListin);

  //     const marketRegistry = await program.account.marketRegistry.fetch(marketRegistryAccount);
  //     console.log("Market Registry Data:", marketRegistry);
  //   });

  it("issue the bond and a masternft and list the bond", async () => {
    // const issuerKeypair = Keypair.generate();
    // console.log("Issuer Public Key:", issuerKeypair.publicKey.toBase58());

    const issuerBanlance = await connection.getBalance(issuerKeypair.publicKey);
    console.log("Issuer Balance:", issuerBanlance / LAMPORTS_PER_SOL, "SOL");

    // if (issuerBanlance < 2 * LAMPORTS_PER_SOL) {
    //   const airdropSignature = await connection.requestAirdrop(
    //     issuerKeypair.publicKey,
    //     2 * LAMPORTS_PER_SOL
    //   );
    //   const latestBlockhash = await connection.getLatestBlockhash();
    //   await connection.confirmTransaction({
    //     signature: airdropSignature,
    //     blockhash: latestBlockhash.blockhash,
    //     lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    //   });
    //   const newBalance = await connection.getBalance(issuerKeypair.publicKey);
    //   console.log("New Issuer Balance:", newBalance / LAMPORTS_PER_SOL, "SOL");

    // issue a masternft

    const umi = createUmi(connection.rpcEndpoint);
    umi.use(mplTokenMetadata());

    const umiUser = umi.eddsa.createKeypairFromSecretKey(issuerKeypair.secretKey);
    umi.use(keypairIdentity(umiUser));

    

    try {
      await program.methods
        .issueBond(
          "testbond-1",
          new anchor.BN(1),
          new anchor.BN(1),
          new anchor.BN(2),
          new anchor.BN(4),
          new anchor.BN(50),
          new PublicKey("xweEBdPhtPY7J2DpmPkjFYRw4dA6PNMXUgKy6BQcn3q")
        )
        .accountsPartial({ issuer: issuerKeypair.publicKey })
        .signers([issuerKeypair])
        .rpc();
    } catch (e) {
      console.error(`Error issuing the bond: ${e}`);
      if (e instanceof anchor.web3.SendTransactionError) {
        console.error("Transaction logs:", e.logs);
      }
    }

    const seeds = [Buffer.from("bond"), issuerKeypair.publicKey.toBuffer()];
    const [bondAccount, bump] = await PublicKey.findProgramAddressSync(
      seeds,
      bondexAddress
    );
    console.log("Bond Account:", bondAccount.toBase58(), "Bump:", bump);

    const account = await program.account.bond.fetch(bondAccount);
    console.log("Bond Account Data:", account);

    try {
      await program.methods
        .listBond()
        .accountsPartial({
          issuer: issuerKeypair.publicKey,
          marketRegistry: marketRegistryAccount,
        })
        .signers([issuerKeypair])
        .rpc();
    } catch (e) {
      console.log(`Error listing the bond: ${e}`);
      if (e instanceof anchor.web3.SendTransactionError) {
        console.error("Transaction logs:", e.logs);
      }
    }
    const listedBond = await program.account.marketRegistry.fetch(
      marketRegistryAccount
    );
    console.log("Market Registry Data:", listedBond);
  });
});
