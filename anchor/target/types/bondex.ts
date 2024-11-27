/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/bondex.json`.
 */
export type Bondex = {
  "address": "xweEBdPhtPY7J2DpmPkjFYRw4dA6PNMXUgKy6BQcn3q",
  "metadata": {
    "name": "bondex",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buyBond",
      "discriminator": [
        213,
        80,
        222,
        237,
        246,
        145,
        5,
        94
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketListing",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  108,
                  105,
                  115,
                  116,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "arg",
                "path": "market_listing.issuer"
              }
            ]
          }
        },
        {
          "name": "bond",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "arg",
                "path": "market_listing.issuer"
              }
            ]
          }
        },
        {
          "name": "issuer",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "marketListing",
          "type": "pubkey"
        },
        {
          "name": "issuer",
          "type": "pubkey"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeMarketplace",
      "discriminator": [
        47,
        81,
        64,
        0,
        96,
        56,
        105,
        7
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketregistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121,
                  98,
                  111,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "issueBond",
      "discriminator": [
        89,
        175,
        93,
        128,
        140,
        237,
        182,
        162
      ],
      "accounts": [
        {
          "name": "issuer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              }
            ]
          }
        },
        {
          "name": "bond",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "faceValue",
          "type": "u64"
        },
        {
          "name": "maturityTime",
          "type": "u64"
        },
        {
          "name": "coupon",
          "type": "u64"
        },
        {
          "name": "interestIntervals",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u64"
        },
        {
          "name": "masterNftAddress",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "listBond",
      "discriminator": [
        208,
        58,
        173,
        49,
        241,
        139,
        102,
        133
      ],
      "accounts": [
        {
          "name": "issuer",
          "writable": true,
          "signer": true
        },
        {
          "name": "bond",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              }
            ]
          }
        },
        {
          "name": "marketListing",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  108,
                  105,
                  115,
                  116,
                  105,
                  110,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              }
            ]
          }
        },
        {
          "name": "marketRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121,
                  98,
                  111,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bond",
      "discriminator": [
        224,
        128,
        48,
        251,
        182,
        246,
        111,
        196
      ]
    },
    {
      "name": "marketListing",
      "discriminator": [
        175,
        123,
        31,
        97,
        53,
        211,
        229,
        16
      ]
    },
    {
      "name": "marketRegistry",
      "discriminator": [
        200,
        118,
        217,
        126,
        179,
        169,
        172,
        104
      ]
    },
    {
      "name": "vault",
      "discriminator": [
        211,
        8,
        232,
        43,
        2,
        152,
        117,
        119
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "insufficientFunds",
      "msg": "The buyer does not have sufficient funds."
    },
    {
      "code": 6001,
      "name": "invalidAmount",
      "msg": "The required amount is invalid."
    }
  ],
  "types": [
    {
      "name": "bond",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "issuer",
            "type": "pubkey"
          },
          {
            "name": "faceValue",
            "type": "u64"
          },
          {
            "name": "maturityTime",
            "type": "u64"
          },
          {
            "name": "coupon",
            "type": "u64"
          },
          {
            "name": "interestIntervals",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "sold",
            "type": "u64"
          },
          {
            "name": "completed",
            "type": "u64"
          },
          {
            "name": "masterNftAddress",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "marketListing",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "issuer",
            "type": "pubkey"
          },
          {
            "name": "active",
            "type": "bool"
          },
          {
            "name": "maximumSupply",
            "type": "u64"
          },
          {
            "name": "sold",
            "type": "u64"
          },
          {
            "name": "bond",
            "type": "pubkey"
          },
          {
            "name": "masterNftAddress",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "marketRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "listings",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};
