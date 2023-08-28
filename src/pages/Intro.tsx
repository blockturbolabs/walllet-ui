import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import styled from '@emotion/styled'
import { Theme } from '@mui/material'

// import blockTurboLogo from 'src/assets/BT-logo-light.png'
import ChainSelector from 'src/components/chain-selector/ChainSelector'

type IntroProps = {
  setStep: (newStep: number) => void
}

const Intro = ({ setStep }: IntroProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      paddingTop="5px"
      paddingLeft="100px"
    >
      {/* <img src={blockTurboLogo} alt="blockturbo logo" height="100px" /> */}

      <Typography variant="h1" fontSize="64px" lineHeight="76px">
        BlockTurbo Smart Contract Wallet
      </Typography>

      <Typography variant="body1">
      We're excited to bring you BlockTurbo Wallet, a cutting-edge venture focused on developing a crypto wallet powered by Account Abstraction technology. 
      Account Abstraction is a game-changing concept in the blockchain world, set to enhance the flexibility and efficiency of smart contracts and transactions.
      </Typography>

      {/* Kit list */}
      <Box display="flex" gap={2} marginTop="36px">
        <Box display="flex" gap={1}>
          <OrderLabel fontSize="10px" fontWeight="700">
            01
          </OrderLabel>
          <Typography fontWeight="700" fontSize="20px">
            Social Login
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <OrderLabel fontSize="10px" fontWeight="700">
            02
          </OrderLabel>
          <Typography fontWeight="700" fontSize="20px">
            Fiat Onramp
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <OrderLabel fontSize="10px" fontWeight="700">
            03
          </OrderLabel>
          <Typography fontWeight="700" fontSize="20px">
            Fee Abstraction
          </Typography>
        </Box>
      </Box>

      <Divider style={{ alignSelf: 'stretch', margin: '42px 0' }} />

      <Typography variant="h2" fontWeight="700" fontSize="20px">
        Select a network:
      </Typography>

      <Typography>
        Consider that the fiat onramp function will only work on Polygon-Mumbai test chain and US based connection.
      </Typography>

      <Box display="flex" gap={2} marginTop="32px" alignItems="center">
        <ChainSelector />

        <Button variant="contained" onClick={() => setStep(1)}>
          Start Demo
        </Button>
      </Box>
    </Box>
  )
}

export default Intro

const OrderLabel = styled(Typography)<{
  theme?: Theme
}>(
  ({ theme }) => `
  border: 1px solid ${theme.palette.text.primary};
  border-radius: 4px;
  padding: 4px 6px;
  line-height: 12px;
`
)
