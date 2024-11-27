'use client'

import {getBondexProgram, getBondexProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'



export function useBondexProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getBondexProgramId(cluster.network as Cluster), [cluster])
  const program = getBondexProgram(provider)

  const accounts = useQuery({
    queryKey: ['bondex', 'all', { cluster }],
    queryFn: () => program.account.bondex.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['bondex', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ bondex: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useBondexProgramAccount({ account, marketRegistry }: { account: PublicKey, marketRegistry: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useBondexProgram()

  const getListingsQuery = useQuery({
    queryKey: ['bondex', 'bonds', ],
    queryFn: () => program.account.marketRegistry.fetch(marketRegistry)
  })


  const accountQuery = useQuery({
    queryKey: ['bondex', 'fetch', { cluster, account }],
    queryFn: () => program.account.bondex.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['bondex', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ bondex: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['bondex', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ bondex: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['bondex', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ bondex: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['bondex', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ bondex: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })




  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
