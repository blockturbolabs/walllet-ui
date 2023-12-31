import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import '@safe-global/safe-react-components/dist/fonts.css'
import { useCallback, useState } from 'react'

import Header from 'src/components/header/Header'
import Providers from 'src/components/providers/Providers'
import SocialLogin from 'src/pages/SocialLogin'
import Intro from 'src/pages/Intro'
import FiatOnramp from 'src/pages/FiatOnramp'
import FeeAbstraction from 'src/pages/FeeAbstraction'
import NavMenu from './components/nav-menu/NavMenu'
import SafeCoreInfo from './components/safe-core-info/SafeCoreInfo'

function App() {
  const [activeStep, setActiveStep] = useState(0)

  const nextStep = useCallback(() => {
    setActiveStep((activeStep) => activeStep + 1)
  }, [])

  const previousStep = useCallback(() => {
    setActiveStep((activeStep) => activeStep - 1)
  }, [])

  const setStep = useCallback((newStep: number) => {
    setActiveStep(newStep)
  }, [])

  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === steps.length - 1

  const showSafeCoreVideo = isFirstStep

  const ActiveStepComponent = steps[activeStep].component
  const nextLabel = steps[activeStep].nextLabel

  return (
    <Providers>
      <>
        <CssBaseline />

        {/* App header */}
        <Header setStep={setStep} />

        <Box
          display="flex"
          gap={3}
          alignItems="flex-start"
          maxWidth="1200px"
          margin="50px auto 30px auto"
        >
          {showSafeCoreVideo ? (
            <SafeCoreInfo />
          ) : (
            <NavMenu setStep={setStep} activeStep={activeStep} />
          )}

          <main style={{ flexGrow: 1 }}>
            {/* Active Step Component */}
            <ActiveStepComponent setStep={setStep} />

            {/* next & back Buttons */}
            {!isFirstStep && (
              <Stack direction="row" alignItems="center" spacing={2} marginTop="32px">
                <Button onClick={previousStep} variant="outlined">
                  Back
                </Button>

                {!isLastStep && (
                  <>
                    {nextLabel && (
                      <Typography
                        variant="h3"
                        component="h2"
                        fontWeight="700"
                        flexGrow="1"
                        textAlign="right"
                        fontSize="20px"
                      >
                        {nextLabel}
                      </Typography>
                    )}

                    <Button onClick={nextStep} variant="contained">
                      Next
                    </Button>
                  </>
                )}
              </Stack>
            )}
          </main>
        </Box>
      </>
    </Providers>
  )
}

export default App

const steps = [
  {
    // Intro step
    component: Intro
  },
  {
    // Social Login step
    component: SocialLogin,
    nextLabel: 'to Fiat Onramp'
  },
  {
    // Fiat Onramp step
    component: FiatOnramp,
    nextLabel: 'to Fee Abstraction'
  },
  {
    // Fee Abstraction step
    component: FeeAbstraction
  }
]
