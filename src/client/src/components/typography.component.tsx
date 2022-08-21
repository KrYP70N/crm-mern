interface AppProps {
  children: any,
  as?: boolean,
  className?: string
}

const Text = ({children, as, className} : AppProps) : JSX.Element => {
  const As = as || 'p'
  return (
    <As className={className}>{children}</As>
  )
}

export default Text