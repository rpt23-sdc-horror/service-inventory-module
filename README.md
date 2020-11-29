# Inventory Service

> This project re-creates and re-imagines parts of the Nike website by using a micro-serviced based architecture. Unlike websites that utilizes a monolithic architecture, this re-created Nike.com separates its services into four indepent parts. Each with their own database, server and react client. This individual service, the inventory service, is responsible for storing and displaying the current stock of a specific shoe. Clients are then able to see and select the available sizes on this service before they add an item to the shopping cart. The other services that work in conjunction with this service is the products service.

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Install dependencies with npm i
> Create schema according to database
> Run seeder script with npm run seed
> Build webpack with npm run build
> Run server with npm run start

## Seed Database

> Open package.json & modify seed-postgres script: Replace TO_DO with postgres username
> Run data generator with npm run generate-data
> Locate seed.sql in postgres_seeder & modify TO_DO filepath: Replace TO_DO with absolute path to mockData.csv in seed_data
> Run seeder with npm run seed-postgres
## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### CRUD
- Create: POST /inventory/product
- Read: GET /inventory/:productID/:styleID
- Update: PATCH /inventory/product
- Delete: DELETE /inventory/product

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
