import { Schema, model } from 'mongoose'

const isRequire = (name : string) : string => `${name} is require.`

const customerSchema = new Schema({
  photo : {
    type: String,
    require: [true, isRequire('photo')]
  },
  email: {
    type: String,
    require: [true, isRequire('email')]
  },
  password: {
    type: String,
    require: [true, isRequire('password')]
  },
  name: {
    type: String,
    require: [true, isRequire('name')]
  },
  phoneNumber: {
    type: String,
    require: [true, isRequire('phone number')]
  },
  birthday: {
    type: Date,
    require: [true, isRequire('birthday')]
  },
  NRCPrefix: {
    type: Number,
    require: [true, isRequire('NRC prefix')]
  },
  NRCRegion: {
    type: String,
    require: [true, isRequire('NRC region')]
  },
  NRCType: {
    type: String,
    require: [true, isRequire('NRC type')]
  },
  NRCNo: {
    type: String,
    require: [true, isRequire('NRC no')]
  },
  gender: {
    type: String,
    require: [true, isRequire('Gender')]
  }
}, {
  timestamps: true
})

export default model('Customer', customerSchema)
