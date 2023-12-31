import styled from '@emotion/styled'
import WalletIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useState } from 'react'
import SafeInfo from 'src/components/safe-info/SafeInfo'
import { useAccountAbstraction } from 'src/store/accountAbstractionContext'

const FiatOnramp = () => {
  const {
    openStripeWidget,
    closeStripeWidget,
    safeSelected,
    chain,
    chainId,
    isAuthenticated,
    loginWeb3Auth
  } = useAccountAbstraction()

  const [showStripeWidget, setShowStripeWidget] = useState<boolean>(false)

  return (
    <>
      <Typography variant="h2" component="h1">
        Fiat Onramp
      </Typography>

      <Typography marginTop="16px">
        Allow users to buy cryptocurrencies using a credit card and other payment options directly
        within your app. Click on "Buy USDC" to on-ramp funds to your BlockTurbo Wallet using the Stripe widget!
      </Typography>

      <Divider style={{ margin: '32px 0 28px 0' }} />

      {/* OnRamp Demo */}
      <Typography variant="h4" component="h2" fontWeight="700" marginBottom="16px">
        Interactive demo
      </Typography>

      {!isAuthenticated ? (
        <ConnectedContainer
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <Typography variant="h4" component="h3" fontWeight="700">
            To use the Fiat Onramp feature you need to be authenticated
          </Typography>

          <Button variant="contained" onClick={loginWeb3Auth}>
            Connect
          </Button>
        </ConnectedContainer>
      ) : (
        <Box display="flex" gap={3} alignItems="flex-start">
          <ConnectedContainer>
            <Typography fontWeight="700">BlockTurbo Wallet</Typography>

            <Typography fontSize="14px" marginTop="8px" marginBottom="32px">
              Your BlockTurbo wallet (Smart Contract) holds and protects your assets.
            </Typography>

            {/* Safe Info */}
            {safeSelected && <SafeInfo safeAddress={safeSelected} chainId={chainId} />}
          </ConnectedContainer>

          {/* Stripe widget */}
          <ConnectedContainer>
            <Typography fontWeight="700">Stripe widget</Typography>

            <Typography fontSize="14px" marginTop="8px" marginBottom="32px">
              This widget is on testmode, you will need to use{' '}
              <Link
                href="https://docs.safe.global/learn/safe-core-account-abstraction-sdk/onramp-kit#considerations-and-limitations"
                target="_blank"
              >
                fake data
              </Link>{' '}
              in order to simulate the process. Available only in the United States.
            </Typography>

            {!showStripeWidget ? (
              <Tooltip title={'buy USDC to your BlockTurbo address using Stripe payment provider'}>
                {/* Buy USDC with our OnRamp kit */}
                <Button
                  startIcon={<WalletIcon />}
                  variant="contained"
                  onClick={async () => {
                    setShowStripeWidget(true)
                    await openStripeWidget()
                  }}
                  disabled={!chain?.isStripePaymentsEnabled}
                >
                  Buy USDC
                  {!chain?.isStripePaymentsEnabled ? ' (only in Mumbai chain)' : ''}
                </Button>
              </Tooltip>
            ) : (
              <Stack display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Tooltip title={'close Stripe Widget'}>
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={async () => {
                      setShowStripeWidget(false)
                      await closeStripeWidget()
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                {/* Stripe root widget */}
                <div id="stripe-root"></div>
              </Stack>
            )}
          </ConnectedContainer>
        </Box>
      )}
    </>
  )
}

export default FiatOnramp

const ConnectedContainer = styled(Box)<{
  theme?: Theme
}>(
  ({ theme }) => `
  
  border-radius: 10px;
  border: 1px solid ${theme.palette.border.light};
  padding: 40px 32px;

  min-height: 265px;
`
)