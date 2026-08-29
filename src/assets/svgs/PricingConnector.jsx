const PricingConnector = ({ isMid }) => {
  return isMid ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="190" height="487" viewBox="0 0 190 487" fill="none">
      <path d="M129.504 1.5H158.504V30.25M131.504 59H158.504V30.25M158.504 30.25H188.504V306L32.5039 453M32.5039 453H11.0039L1.00391 462M32.5039 453L35.0039 473L24.0039 485.5" stroke="#FF0033" stroke-width="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="191" height="449" viewBox="0 0 191 449" fill="none">
      <path d="M129.806 1.5H158.806V30.25M131.806 59H158.806V30.25M158.806 30.25H188.806V284L32.8057 417.446M32.8057 417.446H10.3057L0.805664 423.5M32.8057 417.446V440L24.8057 447" stroke="#FF0033" stroke-width="3" />
    </svg>

  )
}

export default PricingConnector