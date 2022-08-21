import fs from 'fs'
import os from 'os'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { isEmail, isWeakPassword } from '../utils/validation.utils'
import Customer from '../model/customer.model'

/*
  info : create new user
  method : POST
  access : private (currently public : fix it back later)
*/

export const createCustomer = asyncHandler(async (req: Request, res: Response) : Promise<void> => {
  
  let requireFields : string[] = ['email', 'password', 'name', 'phoneNumber', 'birthday', 'NRCPrefix', 'NRCRegion', 'NRCType', 'NRCNo', 'gender']
  let requiredFields : string[] = []

  const findCustomer = await Customer.findOne({email: req.body.email})

  if(findCustomer) {
    res.status(400).json({
      message: `customer name "${findCustomer.name}" already exist `,
      error: {
        type: 'user name',
        field: 'name'
      }
    })
  }

  // validate require fields
  for(let i=0; i<requireFields.length; i++) 
  {
    let key : string = requireFields[i]
    if(!req.body[key]) requiredFields.push(key)
  }

  // check image upload
  if(!req.file) {
    res.status(400).json({
      message: 'customer photo required',
      error: {
        type: 'photo error',
        field: 'photo'
      }
    })
  }

  // feedback require field
  if (requiredFields.length > 0)
  {
    res.status(400).json({
      message: `${requiredFields.toString()} ${requiredFields.length > 1 ? 'are' : 'is'} required.`,
      error: {
        type: 'required',
        fields: requiredFields
      }
    })
  }

  // validate email
  if(!isEmail(req.body.email)) {
    res.status(400).json({
      message: 'invalid email format.',
      error: {
        type: 'email error',
        field: 'email'
      }
    })
  }

  // check weak password
  if(isWeakPassword(req.body.password).status) {
    res.status(400).json({
      message: 'password is not strong enough.',
      error: {
        type: 'password error',
        field: 'password'
      }
    })
  }

  // register data
  let data = {
    ...req.body,
    photo: req.file?.path
  }

  const createCustomer = await Customer.create(data)

  res.status(200).json(createCustomer)

})


const dateParser = (date : any) : Date => date ? new Date(date) : new Date()


interface customerQuery {
  name?: string,
  email?: string,
  phone?: string,
  createdAt?: {$lt: Date, $gt: Date}
}

/*
  info : get user/s
  method : GET
  access : private (currently public : fix it back later)
*/

export const getCustomer = asyncHandler(async (req: Request, res: Response) : Promise<void> => {

  const limit = Number(req.query.limit || 10)
  const page : number = Number(req.query.page) || 1


  const query : customerQuery = {
    ...req.query,
    createdAt: {$gt: dateParser(req.query.startDate || '1995-12-17T03:24:00'), $lt: dateParser(req.query.endDate)},
  }

  const customerResult : any = await Customer
  .find(query)
  .skip(page > 0 ? ((page - 1) * limit) : 0)
  .limit(limit)
  res.status(200).json(customerResult)
})

/*
  info : delete customer
  method : DELETE
  access : private (currently public : fix it back later)
*/

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) : Promise<void> => {
  const find = await Customer.findOne({_id: req.params.id})

  // search with id 
  if(!find) {
    res.status(404).json({
      message: 'user not found'
    })
  }

  // is admin : temporary only need to replace with user control
  if(find?.name === 'admin') {
    res.status(400).json({
      message: 'you are not authorize',

    })
  }

  await find?.remove()

  res.status(200).send({
    message: `successfully deleted`
  })
  
})

/*
  info : update customer
  method : update
  access : private (currently public : fix it back later)
*/

export const updateCustomer = asyncHandler(async (req: Request, res: Response) : Promise<void> => {
  let requireFields : string[] = ['email', 'password', 'name', 'phoneNumber', 'birthday', 'NRCPrefix', 'NRCRegion', 'NRCType', 'NRCNo', 'gender']
  let requiredFields : string[] = []

  const findCustomer = await Customer.findOne({_id: req.params.id})

  if(!findCustomer) {
    res.status(404).json({
      message: `customer not found`,
      error: {
        type: 'customer name',
        field: 'name'
      }
    })
  }

  // validate email
  if(req.body.email && !isEmail(req.body.email)) {
    res.status(400).json({
      message: 'invalid email format.',
      error: {
        type: 'email error',
        field: 'email'
      }
    })
  }

  // check weak password
  if(req.body.password && isWeakPassword(req.body.password).status) {
    res.status(400).json({
      message: 'password is not strong enough.',
      error: {
        type: 'password error',
        field: 'password'
      }
    })
  }

  // register data
  let data = {
    ...req.body,
    photo: req.file?.path
  }

  const createCustomer = await Customer.findByIdAndUpdate(req.params.id, data, {new: true})

  res.status(200).json(createCustomer)
})

/*
  info : get customer image
  method : get customer image
  access : private (currently public : fix it back later)
  note: image api is not convenience to use : can fix it back later
*/

export const getImage = asyncHandler(async (req: Request, res: Response) : Promise<void> => {
  await fs.readFile(
    (__dirname.slice(0, __dirname.indexOf('mernt')) + 'mernt/' + req.url).replace('/public', 'private')
    , 'base64', (err, data) => {
    if(err) {
      console.log(err)
      res.status(400).json({'message': 'error'})
    }
    res.status(200).send(data)
  })
})