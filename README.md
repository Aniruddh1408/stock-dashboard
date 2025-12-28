This project is a Stock Broker Client Web Dashboard built using JavaScript.
It simulates a real-time stock trading dashboard where multiple users can log in independently, subscribe to different stocks, and see live price updates without refreshing the page.

The application demonstrates:
1. User-specific state handling.
2. Asynchronous updates.
3. Real-time UI behavior.
4. Clean frontend logic.

Project Structure: 
'''
stock-dashboard/
│
├── index.html      // Main UI structure
├── style.css       // Styling and layout
├── app.js          // Core logic (login, subscriptions, async updates)
└── README.md       // Project documentation
'''
Steps to run the project:
1. Clone the repository
2. Navigate into the project folder
3. Open index.html in any modern browser (open with live server).

Testing the functionality:
* Login as User 1 and subscribe to a few stocks
* Login as User 2 with a different email and subscribe to different stocks
* Observe:
A) Both dashboards updating simultaneously.
B) Prices updating every second.
C) One user logging out does not affect the other.

Tech stack:
1. HTML
2. CSS
3. JavaScript
