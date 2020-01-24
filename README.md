Ionifits is a Zenefits-inspired, human resources app. It's a showcase of Ionic App Platform technologies, including Ionic Framework and Ionic Native solutions.

## Features

**"Vanilla" Ionic Framework:** Show off the power and performance of Ionic UI components by using them as-is (out-of-the-box as much as possible).

**Auth Connect and Identity Vault-powered Login page:** Log into Ionifits using Auth0 (username: user@test.com, password: ionic). Optionally, tap the "Skip" button to bypass login. Log out from the Settings page. After login, the Auth0 user access token is securely stored in the mobile device keychain using Ionic Identity Vault. When the app is placed into the background, the screen is obscured to protect Ionifits data.

**Employee Management page:**  Display a list of all "employees", demonstrating high performance infinite scrolling containing hundreds of items. Tap on an employee to see their details (note the built-in Ionic Framework native-feeling animations).

**Expense Management page:** Complete expense management implementation (similar to how Abacus works), featuring full CRUD (create-read-update-delete) for expenses. Add a new expense's merchant name, cost, date, and more, and capture a photo of the receipt using your device's camera. Once saved, tap on the expense to make changes. Slide an expense item in the list of Completed Expenses to the left to delete it.

**Settings page:** Simple page showing off other Ionic Framework UI components. Includes "Contact Us" CTA that opens up web browser to [https://ionicframework.com/sales](https://ionicframework.com/sales).

**Implementation Details buttons:** Tap the "i" icon in the upper-right hand corner to view details about the technologies used, including Ionic Framework UI components and Ionic Native features.

## Tech Details

- Native runtime: Cordova (will move to Capacitor eventually)
- Framework: Ionic Angular 4 (on Angular 7)
- Ionic Native plugins:
    - Camera, File, Storage
- Ionic Native solutions: Auth Connect and Identity Vault
    - Offline Storage coming soon