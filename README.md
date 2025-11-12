# Sports Stats Dashboard 🏀⚽🏈

A dynamic sports statistics dashboard built with JavaScript that fetches and displays real-time sports data. This project demonstrates web development skills including API integration, data visualization, and responsive UI design.

## 🎯 Features

- **Live Sports Data**: Fetches real-time sports statistics from public APIs
- **Interactive Visualizations**: Dynamic charts and graphs using Chart.js
- **Responsive Design**: Mobile-first design that works on all devices
- **Search & Filter**: Find specific teams, players, or games
- **Clean Code**: Modular JavaScript with clear separation of concerns
- **Error Handling**: Robust error handling and loading states

## 🛠️ Technologies Used

- **JavaScript (ES6+)**: Core application logic
- **HTML5/CSS3**: Modern semantic markup and styling
- **Chart.js**: Data visualization
- **Fetch API**: Asynchronous data fetching
- **Git/GitHub**: Version control

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git installed on your machine

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JoshuaSanders95/sports-stats-dashboard.git
cd sports-stats-dashboard
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
sports-stats-dashboard/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styling
├── js/
│   ├── app.js          # Main application logic
│   ├── api.js          # API integration
│   ├── ui.js           # UI updates and rendering
│   └── utils.js        # Helper functions
├── assets/
│   └── screenshots/    # Project screenshots
└── README.md           # Documentation
```

## 💡 Key Features Explained

### API Integration
Uses the free [Sports Data API] to fetch real-time statistics. Implements proper error handling and loading states.

### Data Visualization
Interactive charts built with Chart.js showing:
- Team performance over time
- Player statistics comparison
- Game scores and trends

### Responsive Design
Mobile-first approach ensures the dashboard works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🎓 Learning Outcomes

This project demonstrates:
- Asynchronous JavaScript (Promises, async/await)
- DOM manipulation and event handling
- Working with REST APIs
- Data processing and visualization
- Responsive web design principles
- Clean, maintainable code structure

## 🔮 Future Enhancements

- [ ] Add React version for component-based architecture
- [ ] Implement GraphQL with Apollo Client
- [ ] Add user authentication and favorites
- [ ] Include more sports and leagues
- [ ] Add real-time updates with WebSockets
- [ ] Deploy to AWS or Vercel

## 👨‍💻 Author

**Joshua Sanders**
- GitHub: [@JoshuaSanders95](https://github.com/JoshuaSanders95)
- Email: joshuasanders4477@gmail.com
- LinkedIn: [Your LinkedIn Profile](https://linktr.ee/jsanders44)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of my application to The Athletic's Engineering Internship Program
- Inspired by The Athletic's mission to bring comprehensive sports coverage to fans
- Thanks to the sports data API providers for making this possible
