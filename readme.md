### backend project script
- **npm run dev:server** dev server start
- **npm run build:server** build for production
- **npmr run start:server** start production server

### frontend project script
- **npm run install:client** install react dep
- **npm run start:client** run react project with dev mode
- **npm run build:client** build react for production (use dist folder under src/client)


### api endpoints

## create customer 
***localhost:8081/api/customer***
- method : POST
- create customer
- body(form-data) : ['photo', 'name', 'email', 'password', 'phoneNumber', 'birthday', 'NRCPrefix', 'NRCRegion', 'NRCType', 'NRCNo', 'gender']

## get customer
***localhost:8081/api/customer***
- method : GET
- create customer
- you can do querying by url-query with `create customer body (from-data)`
- new url query are [limit, page]
- eg : localhost:8081/api/customer?name=John&limit=4&page=2

## delete customer
***localhost:8081/api/customer/:id***
- method : DELETE
- delete customer by customer _id
- eg : localhost:8081/api/customer/aus123r

## update customer
***localhost:8081/api/customer/:id***
- method : PUT
- delete customer by customer _id
- eg : localhost:8081/api/customer/aus123r

## update customer
***localhost:8081/api/customer/:id***
- method : PUT
- delete customer by customer _id
- eg : localhost:8081/api/customer/aus123r


## get customer image
***localhost:8081/api/customer/public/customerImg/id***
- method : GET
- get customer image 
- eg : localhost:8081/api/customer/public/customerImg/1195bc61d8e48ece71edf692ed7b42be