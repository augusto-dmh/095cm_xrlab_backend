#!/bin/bash

while true; do
    echo -e "\nPlease enter your MySQL hostname:"
    read hostname

    echo -e "\nPlease enter your MySQL username:"
    read username

    echo -e "\nPlease enter your MySQL password:"
    read -s password

    if mysql -h $hostname -u $username -p$password -e "quit" 2>/dev/null; then
        echo -e "\nSuccessfully connected to MySQL."
        break
    else
        echo -e "\nConnection failed. Please try again."
    fi
done

if mysql -h $hostname -u $username -p$password -e "USE conexao095_DEV" 2>/dev/null; then
    echo -e "\nDatabase 'conexao095_DEV' already exists."
    read -p "Do you want to drop the existing database? (yes/no): " drop_choice
    if [[ "$drop_choice" == "yes" ]]; then
        mysql -h $hostname -u $username -p$password -e "DROP DATABASE conexao095_DEV"
        if [ $? -eq 0 ]; then
            echo -e "\nSuccessfully dropped existing database 'conexao095_DEV'."
        else
            echo -e "\nFailed to drop database. Exiting the script."
            exit 1
        fi
    else
        echo -e "\nExiting the script."
        exit 0
    fi
fi

mysql -h $hostname -u $username -p$password <<EOF
CREATE DATABASE conexao095_DEV;
EOF

if [ $? -eq 0 ]; then
    echo -e "\nSuccessfully created database 'conexao095_DEV'."
else
    echo -e "\nFailed to create database 'conexao095_DEV'. Exiting the script."
    exit 1
fi

echo -e "\nCreating tables..."

cd ../../../

npx sequelize-cli db:migrate

echo "Inserting mock data..."
npx sequelize-cli db:seed:all
