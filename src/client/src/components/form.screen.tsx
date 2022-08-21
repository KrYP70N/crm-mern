import Text from "./typography.component"

interface ComponentProps {
  label: string,
  name: string,
  type?: string,
  info?: string,
  infoType?: string,
  className?: string,
  placeholder?: string
}

const Input = ({type, name, label, info, className, placeholder} : ComponentProps) : JSX.Element => {
  
  return (
    <div className='form-group'>
      {label && <label>{label}</label>}
      <input placeholder={placeholder} type={type || 'text'} id={name}/>
      {info && <Text as="small" className={"info " + className}>{info}</Text>}
    </div>
  )
}


export default Input