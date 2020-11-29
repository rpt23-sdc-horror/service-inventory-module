#!/bin/bash

###################################################
# Bash script to create database and seed
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="inventory"
USER="martinsung"
PASSWORD=""

### Import Our Database ###
# Dont specify a database since CREATE DATABASE is in schema.sql
SCHEMA="$DIR/src/gateways/schema/schema.sql"
psql -U $USER < $SCHEMA

### Run Our Generator Script ###
node $DIR/seeder/postgres_seeder/data_generator/index.js

### Import Our posts.csv file to seed Database ###
psql -U $USER -d $DATABASE -c "COPY $DATABASE FROM '/Users/martinsung/Desktop/service-inventory-module/seeder/postgres_seeder/data_generator/seed_data/mockData.csv' CSV HEADER;