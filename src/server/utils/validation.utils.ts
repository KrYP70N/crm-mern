export const isEmail = (email : string) : RegExpMatchArray | null  => 
String(email)
.toLowerCase()
.match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const isWeakPassword = (val : string) : {status: boolean, type: string} => {
  let strength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
  let medium = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
  if (strength.test(val)) {
    return {
      status: false,
      type: 'strong'
    }
  } else if (medium.test(val)) {
    return {
      status: false,
      type: 'medium'
    }
  } else {
    return {
      status: true,
      type: 'week'
    }
  }
}