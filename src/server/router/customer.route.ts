import {Router} from 'express'
import multer from 'multer'
import { createCustomer, deleteCustomer, getCustomer, updateCustomer, getImage } from '../controller/customer.controller'

const upload = multer({ dest : 'private/customerImg' })

const router = Router()

router.route('/')
.post(upload.single('photo'), createCustomer)
.get(getCustomer)

router.route('/:id')
.delete(deleteCustomer)
.put(upload.single('photo'), updateCustomer)

router.route('/public/customerImg/:id')
.get(getImage)

export default router
