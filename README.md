# Villain Headquarters

## What is Villain Headquarters?

Villain Headquarters is the culmination of an ASP.NET Core and Angular web application and accompanying microservices. It's a web application that allows fictional villains to plan and plot evil deeds shared with other villains using a fake cryptocurrency. There is also a marketplace that consumes the cryptocurrency.

## About the Infrastructure

### Architectural Design

The main server that users will interface with is the VillainHeadquarters server. This server is responsible for authenticating users by creating and returning JavaScript Web Tokens. This JWT can be used at the other microservices. Additionally, this is the server where users are served the Angular application.

The VillainBanker server is responsible for storing each user's current store of the fake cryptocurrency. It's also responsible for fluctuating the worth of each individual piece of the cryptocurrency depending on various parameters such as the frequency of items being bought in the marketplace and login durations of all users.

The VillainMarketplace server is responsible for holding a list of items that users can buy using the fake cryptocurrency, along with the prices of each item stored as a base value (since the crpytocurrency fluctuates in value). When a user attempts to buy an item, the VillainMarketplace sends a request to the VillainBanker to handle the transaction.

## Installation using Visual Studio

Before installing the project, you must have [Visual Studio 2015+](https://visualstudio.microsoft.com/downloads/) with the .NET Core package and [Node](https://nodejs.org/en/download/) installed.

1. Clone or download the source files above. Extract the files if necessary.

2. Open the VillainHeadquarters.sln file in Visual Studio.

3. In the Quick Launch panel (shortcut Ctrl + Q), type in Package Manager Console and open it.

4. In the Package Manager Console, make sure the Default Project is VillainHeadquarters.

5. Type into the Package Manager Console and execute:
```bash
Update-Database
```

6. After your database is successfully created, open Node and navigate to the root of the project (where VillainHeadquarters.sln is).

7. Type the following into Node to navigate to the client-side code:
```bash
cd VillainHeadquarters/ClientApp
```

8. Type the following into Node to install all the required npm packages:
```bash
npm install
```

9. If there were no issues, you should now have a working installation of the VillainHeadquarters project.

## Installation using Visual Studio Code

Before installing the project, you must have [Visual Studio Code](https://visualstudio.microsoft.com/downloads/), [.NET Core SDK 2.2+](https://dotnet.microsoft.com/download), and [Node](https://nodejs.org/en/download/) installed.

1. Clone or download the source files above. Extract the files if necessary.

2. Open the root folder of the project using Visual Studio Code (you should see VillainHeadquarters.sln).

3. Open a new terminal window within Visual Studio Code (shortcut Ctrl+Shift+`).

4. In the terminal window, type in the following and execute:
```bash
dotnet ef database update
```

5. After your database is successfully created, type in the following in the terminal to navigate to the client-side code:
```bash
cd VillainHeadquarters/ClientApp
```

6. Type the following into the terminal to install all the required npm packages:
```bash
npm install
```

7. If there were no issues, you should now have a working installation of the VillainHeadquarters project.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)