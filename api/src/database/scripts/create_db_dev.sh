#!/bin/bash

while true; do
    echo -e "\nPlease enter your MySQL hostname:"
    read hostname

    echo -e "\nPlease enter your MySQL username:"
    read username

    echo -e "\nPlease enter your MySQL password:"
    read -s password

    # Try to connect to MySQL without doing anything
    if mysql -h $hostname -u $username -p$password -e "quit" 2>/dev/null; then
        echo -e "\nSuccessfully connected to MySQL."
        break
    else
        echo -e "\nConnection failed. Please try again."
    fi
done

# Try to create the database
mysql -h $hostname -u $username -p$password <<EOF
CREATE DATABASE conexao095_DEV;
EOF

if [ $? -eq 0 ]; then
    echo -e "\nSuccessfully created database 'conexao095'."
else
    echo "Failed to create database 'conexao095'. Exiting the script."
    exit 1
fi

echo -e "\nCreating tables..."

cd ../../../

npx sequelize-cli db:migrate

echo "Inserting mock data..."

npx sequelize-cli db:seed:all
